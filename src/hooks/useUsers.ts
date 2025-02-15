import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { DatabaseContext } from "../context/database-context";

export const useUsers = () => {
  const { performSQLAction, initialized } = useContext(DatabaseContext);

  const users = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      performSQLAction(async (db) => {
        const command = "SELECT * FROM users";
        const result = await db?.query(command);
        return;
      });
    },
  });
};
