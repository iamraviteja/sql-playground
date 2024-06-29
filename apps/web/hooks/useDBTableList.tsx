import * as React from "react";

export const ADD_TABLE_ITEM = "add_table_item";
export const UPDATE_TABLE_ITEM = "update_table_item";

export type DBTableItem = {
  id: string;
  name: string;
  description: string;
  status: string;
  fields: any[];
};

type Action = {
  type: "add_table_item" | "update_table_item";
  payload: any;
};
type State = {
  items: DBTableItem[];
};
type DBTableListProviderProps = { children: React.ReactNode };

const DBTableListContext = React.createContext<
  | {
      state: State;
      addTableItem: (table_item: DBTableItem) => void;
      updateTableItem: (table_item: DBTableItem) => void;
    }
  | undefined
>(undefined);

function dbTableListReducer(state: State, action: Action) {
  switch (action.type) {
    case ADD_TABLE_ITEM:
      state.items.push(action.payload as DBTableItem);
      return { ...state, items: state.items.slice() };
    case UPDATE_TABLE_ITEM:
      state.items.forEach((i: DBTableItem) => {
        let uItem = action.payload;
        if (uItem.id === i.id) {
          i = Object.assign(i, uItem);
        }
      });
      return { ...state, items: state.items.slice() };
    default:
      throw new Error(`Unhandled action type ${action.type} in theme reducer!`);
  }
}

export const DBTableListProvider = ({ children }: DBTableListProviderProps) => {
  const [state, dispatch] = React.useReducer(dbTableListReducer, {
    items: [],
  });

  const value = {
    state,
    addTableItem: (table_item: DBTableItem) =>
      dispatch({ type: ADD_TABLE_ITEM, payload: table_item }),
    updateTableItem: (table_item: DBTableItem) =>
      dispatch({ type: UPDATE_TABLE_ITEM, payload: table_item }),
  };
  return (
    <DBTableListContext.Provider value={value}>
      {children}
    </DBTableListContext.Provider>
  );
};

export const useDBTableList = () => {
  const context = React.useContext(DBTableListContext);
  if (context === undefined) {
    throw new Error(
      `The current component is not under SQLiteDBProvider please check!`
    );
  }
  return context;
};