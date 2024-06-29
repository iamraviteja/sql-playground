import * as React from "react";
import { usePapaParse } from "react-papaparse";

export const SET_FILE = "set_file";
export const PARSED_FILE = "parsed_file";

type Action = {
  type: "set_file" | "parsed_file";
  payload: any;
};
type State = { file: File | null; results: any };
type CSVParserProviderProps = { children: React.ReactNode };

const CSVParserContext = React.createContext<
  { state: State; setFile: (file: File) => void } | undefined
>(undefined);

function csvReducer(state: State, action: Action) {
  switch (action.type) {
    case SET_FILE:
      return { file: action.payload, results: null };
    case PARSED_FILE:
      return { ...state, results: action.payload };
    default:
      throw new Error(`Unhandled action type ${action.type} in theme reducer!`);
  }
}

export const CSVParserProvider = ({ children }: CSVParserProviderProps) => {
  const { readString } = usePapaParse();
  const [state, dispatch] = React.useReducer(csvReducer, {
    file: null,
    results: null,
  });

  React.useEffect(() => {
    if (state.file) {
      var reader = new FileReader();
      reader.onload = function (e) {
        // Use reader.result
        readString(reader.result as string, {
          worker: true,
          complete: (res) => {
            dispatch({ type: PARSED_FILE, payload: res });
          },
          header: true,
        });
      };
      reader.readAsText(state.file);
    }
  }, [state.file]);

  const value = {
    state,
    setFile: (file: File) => dispatch({ type: SET_FILE, payload: file }),
  };
  return (
    <CSVParserContext.Provider value={value}>
      {children}
    </CSVParserContext.Provider>
  );
};

export const useCSV = () => {
  const context = React.useContext(CSVParserContext);
  if (context === undefined) {
    throw new Error(
      `The current component is not under SQLiteDBProvider please check!`
    );
  }
  return context;
};