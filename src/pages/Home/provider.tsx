import { createContext, useCallback, useContext, useState } from "react";
import { UserList } from "../../entities/UserList";
import { UserListFactory } from "../../entities/UserListFactory";
import { IUser } from "../../interfaces/IUser";



interface IProviderUserListProps {
    load: () => void,
    listUser: IUser[],
    filter: string,
    setFilter: React.Dispatch<React.SetStateAction<string>>
}

const Context = createContext({} as IProviderUserListProps);

export function ProviderUserList({ children }:any) {
    const [listUser, setListUser] = useState<IUser[]>([]);
    const [filter, setFilter] = useState<string>('');

    const load = useCallback(() => {
        UserListFactory.filter = filter;
        UserListFactory
            .loadList()
            .then((result) => {
                setListUser(result);
            }).catch((err) => {
                window.alert(err.message)
            });
    },[filter])

    return <Context.Provider
        value={{
            listUser, load,
            filter, setFilter
        }}
    >
        {children}
    </Context.Provider>
}

export function useProviderUserList() {
    const context = useContext(Context);
    if (!context)
        throw new Error(`ProviderUserList not defined`);
    return context;
}