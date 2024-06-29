import * as React from "react";

export const RESET_FORM_STATE = "reset_form_state";
export const SET_FORM_STATE = "set_form_state";
export const SET_TABLE_INFO = "set_table_info";
export const UPDATE_COLS = "update_cols";

type FormState = "table_info" | "update_cols";
type TableInfo = {
  name: string;
  description: string;
  status: string;
};

type Action = {
  type: "set_table_info" | "update_cols" | "set_form_state" | "reset_form_state";
  payload?: any;
};
type State = {
  form_state: FormState;
  table_info: TableInfo | null;
  table_cols: any[] | null;
};
type CreateTableFormProviderProps = { children: React.ReactNode };

const CreateTableFormContext = React.createContext<
  | {
      state: State;
      setTableName: (table_info: TableInfo) => void;
      updateTableCols: (table_cols: any[]) => void;
      updateFormState: (form_state: FormState) => void;
      resetFormState: () => void;
    }
  | undefined
>(undefined);

function tableFormReducer(state: State, action: Action) {
  switch (action.type) {
    case SET_TABLE_INFO:
      return { table_info: action.payload, table_cols: null, form_state: ("update_cols" as FormState) };
    case UPDATE_COLS:
      return { ...state, table_cols: action.payload };
    case SET_FORM_STATE:
      return { ...state, form_state: (action.payload as FormState) };
      case RESET_FORM_STATE:
        return { table_info: null, table_cols: null, form_state: ("table_info" as FormState) };
    default:
      throw new Error(`Unhandled action type ${action.type} in theme reducer!`);
  }
}

export const CreateTableFormProvider = ({
  children,
}: CreateTableFormProviderProps) => {
  const [state, dispatch] = React.useReducer(tableFormReducer, {
    form_state: "table_info",
    table_info: null,
    table_cols: null,
  });

  const value = {
    state,
    setTableName: (table_info: TableInfo) =>
      dispatch({ type: SET_TABLE_INFO, payload: table_info }),
    updateTableCols: (table_cols: any[]) =>
      dispatch({ type: UPDATE_COLS, payload: table_cols }),
    updateFormState: (form_state: FormState) =>
      dispatch({ type: SET_FORM_STATE, payload: form_state }),
    resetFormState: () =>
      dispatch({ type: RESET_FORM_STATE }),
  };
  return (
    <CreateTableFormContext.Provider value={value}>
      {children}
    </CreateTableFormContext.Provider>
  );
};

export const useCreateTableForm = () => {
  const context = React.useContext(CreateTableFormContext);
  if (context === undefined) {
    throw new Error(
      `The current component is not under SQLiteDBProvider please check!`
    );
  }
  return context;
};