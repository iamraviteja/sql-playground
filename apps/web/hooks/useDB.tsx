import * as React from "react";
import initSqlJs from "sql.js";

export const INIT_DB_SUCCESS = "init_db_success";
export const INIT_DB_ERROR = "init_db_error";

type Action = {
  type: "init_db_success" | "init_db_error";
  payload: any;
};
type State = { db: any; dbError: any };
type SQLiteDBProviderProps = { children: React.ReactNode };

const SQLiteDBContext = React.createContext<
  { state: State } | undefined
>(undefined);

function dbReducer(_: State, action: Action) {
  switch (action.type) {
    case INIT_DB_SUCCESS:
      return { db: action.payload, dbError: null };
    case INIT_DB_ERROR:
      return { db: null, dbError: action.payload };
    default:
      throw new Error(`Unhandled action type ${action.type} in theme reducer!`);
  }
}

export const SQLiteDBProvider = ({ children }: SQLiteDBProviderProps) => {
  const [state, dispatch] = React.useReducer(dbReducer, {
    db: null,
    dbError: null,
  });

  React.useEffect(() => {
    (async () => {
        try {
            const SQL = await initSqlJs({
              locateFile: (_) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.2/sql-wasm.wasm`,
            });
            const db = new SQL.Database();
            
            dispatch({ type: INIT_DB_SUCCESS, payload: db });
          } catch (err) {
            dispatch({ type: INIT_DB_ERROR, payload: err });
          }
    })();
  }, []);

  const value = { state };
  return (
    <SQLiteDBContext.Provider value={value}>
      {children}
    </SQLiteDBContext.Provider>
  );
};

export const useDB = () => {
  const context = React.useContext(SQLiteDBContext);
  if (context === undefined) {
    throw new Error(
      `The current component is not under SQLiteDBProvider please check!`
    );
  }
  return context;
};