import { ItemUser } from "./ItemUser";
import { useProviderUserList } from "./provider";

export function TableList() {
    const { listUser } = useProviderUserList();

    return <table>
        <thead>
            <tr>
                <th>Nome</th>
                <th>Idade</th>
            </tr>
        </thead>
        <tbody>
            {
                listUser.map( (user, idx) => {
                    return <ItemUser user={user} key={idx} />
                } )
            }
        </tbody>
    </table>;
}

