import type { SQLiteDBConnection } from "@capacitor-community/sqlite";
import { createContext } from "react";

export type DatabaseContextType = {
  performSQLAction: (
    action: (db: SQLiteDBConnection | undefined) => Promise<void>,
    cleanup?: () => Promise<void>
  ) => Promise<void>;
  initialized: boolean;
};

export const DatabaseContext = createContext<DatabaseContextType>(
  {} as DatabaseContextType
);
