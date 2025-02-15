import type { SQLiteDBConnection } from "@capacitor-community/sqlite";
import { createContext } from "react";

export type DatabaseContextType = {
  performSQLAction: (
    action: (db: SQLiteDBConnection | undefined) => Promise<unknown>,
    cleanup?: () => Promise<void>
  ) => Promise<unknown>;
  initialized: boolean;
};

export const DatabaseContext = createContext<DatabaseContextType>(
  {} as DatabaseContextType
);
