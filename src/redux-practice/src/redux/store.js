import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

import { tasksReducer } from "./reducers/tasks";
import { filterReducer } from "./reducers/filter";
import { allCheckedReducer } from "./reducers/allChecked";

const rootReducer = combineReducers({
  filter: filterReducer,
  tasks: tasksReducer,
  allChecked: allCheckedReducer,
});

const syncWithServer =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    switch (action.type) {
      case "ADD":
        fetch("https://6321dfda82f8687273bb7341.mockapi.io/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(action.payload),
        });
        break;
      case "EDIT_ONE":
        fetch(
          `https://6321dfda82f8687273bb7341.mockapi.io/tasks/${action.payload.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({ text: action.payload.newText }),
          }
        );
        break;
      case "DELETE_ONE":
        fetch(
          `https://6321dfda82f8687273bb7341.mockapi.io/tasks/${action.payload}`,
          {
            method: "DELETE",
          }
        );
        break;
      default:
        console.warn(
          `mockapi.io doesn't provide PATCH endpoint: ${action.type} is NOT UPDATING SERVER DATA`
        );
    }

    next(action);
  };

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk, syncWithServer)
    // other store enhancers if any
  )
);

export default store;
