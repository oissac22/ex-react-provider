import { User } from "./User";
import { UserDBLocalStorage } from "./UserDBLocalStorage";

export function newUser() {
    const db = new UserDBLocalStorage();
    const user = new User(db);
    return user;
}