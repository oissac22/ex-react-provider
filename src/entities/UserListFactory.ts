import { UserDBLocalStorage } from "./UserDBLocalStorage";
import { UserList } from "./UserList";

const dbuser = new UserDBLocalStorage();

export const UserListFactory = new UserList(dbuser);