import { createStore } from "redux";
import userReducer from "./reducers/userReducer";
const store = createStore(userReducer);
export { store };