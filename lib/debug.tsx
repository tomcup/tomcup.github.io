import { DEBUG } from "./constants";

export function log(message: Object) {
  if (DEBUG) {
    console.log(message);
  }
}
