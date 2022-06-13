import { all } from "redux-saga/effects";
import { rootAuthenticationSaga } from "./modules/authentication-saga";

export function* watcherSaga(): any {
  yield all([...rootAuthenticationSaga]);
}
