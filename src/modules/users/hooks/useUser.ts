import { useContext } from "react";
import { DatabaseContext } from "../../../context/database-context";
import { useQuery } from "@tanstack/react-query";
import type { User } from "../../../lib/validations/user";

export const useUser = () => {
  const { initialized, performSQLAction } = useContext(DatabaseContext);

  const user = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const result = (await performSQLAction(async (db) => {
        const command = "SELECT * FROM users LIMIT 1";
        const result = await db?.query(command);
        const user: User = (result?.values?.at(0) as User) || null;
        return user;
      })) as User;
      return result;
    },
    enabled: initialized,
  });

  return {
    user,
  };
};
