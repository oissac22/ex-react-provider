export interface IDbUser {
    loadList(filter:string):Promise<any[]>;
    load(id:string):Promise<any>;
    insert(data:any):Promise<void>;
    update(id:string, data:any):Promise<void>;
    delete(id:string):Promise<void>;
}