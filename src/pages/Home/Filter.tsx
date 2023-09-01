import { useCallback, useEffect } from "react";
import { useProviderUserList } from "./provider";

export function Filter() {
    const { filter, setFilter, load } = useProviderUserList();

    useEffect(() => {
        load();
    },[filter])

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    },[])

    return <input placeholder="PESQUISAR" onChange={handleChange} value={filter} />;
}
