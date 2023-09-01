import { useCallback } from "react";
import { IUser } from "../../interfaces/IUser";
import style from './style.module.css';
import { useNavigate } from 'react-router-dom'

interface IItemUserProps {
    user:IUser
}

export function ItemUser({ user }:IItemUserProps) {
    const navigate = useNavigate();

    const handleClick = useCallback(() => {
        navigate(`/edit/${user.id}`)
    },[navigate, user]);

    return <tr className={style.item} onClick={handleClick}>
        <td>{user.nome}</td>
        <td>{user.idade}</td>
    </tr>;
}
