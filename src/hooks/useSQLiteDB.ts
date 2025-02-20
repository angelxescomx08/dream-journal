import { useEffect, useRef, useState } from "react";
import {
  type SQLiteDBConnection,
  SQLiteConnection,
  CapacitorSQLite,
} from "@capacitor-community/sqlite";
import { initDatabase } from "../data/init-database";

const useSQLiteDB = () => {
  const db = useRef<SQLiteDBConnection>();
  const sqlite = useRef<SQLiteConnection>();
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    const initializeDB = async () => {
      if (sqlite.current) return;

      sqlite.current = new SQLiteConnection(CapacitorSQLite);
      const ret = await sqlite.current.checkConnectionsConsistency();
      const isConn = (
        await sqlite.current.isConnection("db_dream_journal", false)
      ).result;

      if (ret.result && isConn) {
        db.current = await sqlite.current.retrieveConnection(
          "db_dream_journal",
          false
        );
      } else {
        db.current = await sqlite.current.createConnection(
          "db_dream_journal",
          false,
          "no-encryption",
          1,
          false
        );
      }
    };

    initializeDB().then(() => {
      initializeTables();
      setInitialized(true);
    });
  }, []);

  const performSQLAction = async (
    action: (db: SQLiteDBConnection | undefined) => Promise<unknown>,
    cleanup?: () => Promise<void>
  ) => {
    try {
      await db.current?.open();
      return await action(db.current);
    } catch (error) {
      // biome-ignore lint/complexity/noUselessCatch: <explanation>
      throw error;
    } finally {
      try {
        (await db.current?.isDBOpen())?.result && (await db.current?.close());
        cleanup && (await cleanup());
      } catch (error) {
        // biome-ignore lint/correctness/noUnsafeFinally: <explanation>
        // biome-ignore lint/complexity/noUselessCatch: <explanation>
        throw error;
      }
    }
  };

  /**
   * here is where you cna check and update table
   * structure
   */
  const initializeTables = async () => {
    performSQLAction(async (db: SQLiteDBConnection | undefined) => {
      const queryCreateTable = initDatabase();
      const respCT = await db?.execute(queryCreateTable);
      console.log(`res: ${JSON.stringify(respCT)}`);
    });
  };

  return { performSQLAction, initialized };
};

export default useSQLiteDB;
