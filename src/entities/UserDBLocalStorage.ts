import { IDbUser } from "../interfaces/IDb";

const DB_NAME = 'db_test_user';

export class UserDBLocalStorage implements IDbUser {
    private static users:{[key:string]:any} = {};
    private static loaded:boolean = false;

    constructor() {
        if (!UserDBLocalStorage.loaded) {
            this.loadData();
            UserDBLocalStorage.loaded = true;
        }
    }

    private loadData() {
        const data = JSON.parse(localStorage.getItem(DB_NAME) || `{}`);
        UserDBLocalStorage.users = data;
    }

    private saveData() {
        const data = UserDBLocalStorage.users;
        localStorage.setItem(DB_NAME, JSON.stringify(data));
    }

    async loadList(filter:string): Promise<any[]> {
        const list:any[] = Object.values(UserDBLocalStorage.users);
        if (filter) {
            filter = filter.toLowerCase();
            return list.filter( user =>
                user.nome.toLowerCase().indexOf(filter) >= 0
            )
        }
        return list;
    }

    async load(id: string): Promise<any> {
        const data = UserDBLocalStorage.users[id];
        if (!data)
            throw new Error(`User not found`);
        return data;
    }

    async insert(data: any): Promise<void> {
        UserDBLocalStorage.users[data.id] = data;
        this.saveData();
    }

    async update(id: string, data: any): Promise<void> {
        UserDBLocalStorage.users[id] = {...data, id};
        this.saveData();
    }

    async delete(id: string): Promise<void> {
        delete UserDBLocalStorage.users[id];
        this.saveData();
    }

}