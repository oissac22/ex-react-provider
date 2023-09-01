import { IDbUser } from "../interfaces/IDb";

export class User {
    private _id:string = '';
    nome:string = '';
    idade:number = 0;

    constructor(
        private readonly db:IDbUser
    ){}

    private verifyId() {
        if (!this.id)
            throw new Error(`id not found in User class`);
    }

    get id() {
        return this._id;
    }

    set id(value:string) {
        this._id = value;
    }

    async load(idUser:string) {
        const { id, nome, idade } = await this.db.load(idUser);
        this._id = id;
        this.nome = nome;
        this.idade = idade;
    }

    insert() {
        this._id = new Date().toISOString().replace(/\D+/g,'');
        const { id, idade, nome } = this;
        this.db.insert({ id, idade, nome });
    }

    update() {
        this.verifyId();
        const { idade, nome } = this;
        this.db.update(this.id, { idade, nome });

    }

    async delete():Promise<void> {
        this.verifyId();
        this.db.delete(this.id);
    }
}