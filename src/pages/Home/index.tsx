import { Buttons } from "./Buttons";
import { Filter } from "./Filter";
import { TableList } from "./TableList";
import { ProviderUserList } from "./provider";
import style from './style.module.css';

export function Home() {
    return <ProviderUserList>
        <div className={style.container}>
            <p>Lista de usuários</p>
            <Filter />
            <TableList />
            <Buttons />
        </div>
    </ProviderUserList>
}

