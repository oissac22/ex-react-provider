import { useCallback, useEffect, useState } from "react";
import { IUser } from "../../interfaces/IUser";
import {Link, useNavigate} from 'react-router-dom';
import style from './style.module.css'
import { newUser } from "../../entities/UserFectory";
import { useParams } from 'react-router-dom';

export function Edit() {
    const [userData, setUserData] = useState<IUser>({ id:'', idade:0, nome:'' });
    const { id:idUser } = useParams();
    const navigate = useNavigate();

    const isEdit = !!idUser;

    useEffect(() => {
        if (idUser) {
            const user = newUser();
            user.load(idUser)
                .then(() => {
                    const { id, nome, idade } = user;
                    setUserData({ id, nome, idade });
                }).catch((err) => {
                    alert(err.message);
                });
        }
    },[idUser])

    const inputChange = useCallback((key:keyof IUser) => {
        return {
            onChange:(e: React.ChangeEvent<HTMLInputElement>) => {
                setUserData(prev => ({ ...prev, [key]:e.target.value }))
            },
            value: userData[key]
        }
    },[userData])

    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = newUser();
        user.nome = userData.nome;
        user.idade = Number(userData.idade);
        if (isEdit) {
            user.id = userData.id;
            user.update();
        } else
            user.insert();
        alert("Registro salvo com sucesso");
    },[userData, isEdit])

    const handleDel = useCallback(() => {
        const user = newUser();
        user.id = userData.id;
        user.delete()
            .then(() => {
                navigate('/');
            }).catch((err) => {
                alert(err.message);
            });
    },[userData, navigate])

    const title = isEdit ? `Editar usuário` : `Novo usuário`;

    return <form className={style.container} onSubmit={handleSubmit}>
        <p>{title}</p>
        <input placeholder="NOME" {...inputChange('nome')} autoFocus />
        <input placeholder="IDADE" type="number" {...inputChange('idade')} />
        <div className={style.buttons}>
            <button>Salvar</button>
            {
                !isEdit ? null :
                <button type="button" onClick={handleDel}>Deletar</button>
            }
            <Link to="/">
                <button type="button">Voltar</button>
            </Link>
        </div>
    </form>
}

