import { useContext } from "react";
import { DatabaseContext } from "../context/database-context";
import { useQuery } from "@tanstack/react-query";
import type { Dream } from "../lib/validations/dreams";

export const useDreams = () => {
  const { performSQLAction, initialized } = useContext(DatabaseContext);

  const dreams = useQuery({
    queryKey: ["dreams"],
    queryFn: async () => {
      const data: Dream[] | undefined = (await performSQLAction(async (db) => {
        const command = "SELECT * FROM dreams";
        const result = await db?.query(command);
        const dreams: Dream[] | undefined = result?.values;
        return dreams;
      })) as Dream[] | undefined;
      return data;
    },
    enabled: initialized,
  });

  return {
    dreams,
  };
};
