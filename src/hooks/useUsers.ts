import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { DatabaseContext } from "../context/database-context";
import type { User } from "../lib/validations/user";

export const useUsers = () => {
  const { performSQLAction, initialized } = useContext(DatabaseContext);

  const users = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const data: User[] | undefined = (await performSQLAction(async (db) => {
        const command = "SELECT * FROM users";
        const result = await db?.query(command);
        const users: User[] | undefined = result?.values;
        return users;
      })) as User[] | undefined;
      return data;
    },
    enabled: initialized,
  });

  return {
    users,
  };
};
