import { IDbUser } from "../interfaces/IDb";
import { IUser } from "../interfaces/IUser";

export class UserList {
    filter:string = '';

    constructor(
        private readonly db:IDbUser
    ){}

    async loadList(): Promise<IUser[]> {
        const list = await this.db.loadList(this.filter);
        return list;
    }
}