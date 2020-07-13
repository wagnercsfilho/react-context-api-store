import { Store } from "../lib";

export const UserStore = Store(() => ({
  currentUser: "",
  login() {
    this.currentUser = "John";
  },
}));
