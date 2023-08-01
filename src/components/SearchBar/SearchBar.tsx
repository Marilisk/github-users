import { useEffect } from 'react'
import { useDebounce } from "../../assets/hooks.ts/useDebounce"
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks"
import { fetchGetUsers, resetUsers, setQuery } from "../../redux/store/usersSlice"
import { SortBar } from "../SortBar/SortBar"
import c from './SearchBar.module.scss'


export const SearchBar = () => {

    const query = useAppSelector(s => s.users.query)
    const contentExists = useAppSelector(s => !!s.users.users.items.length)

    const dispatch = useAppDispatch()
    const onChangeHandle = (v: string) => {
        dispatch(setQuery(v))
        v.length < 1 && dispatch(resetUsers())
    }

    const debouncedSearch = useDebounce(query, 1500);
    useEffect(() => {
        if (debouncedSearch && query.length > 1) {
            dispatch(fetchGetUsers({ query: debouncedSearch }));
        }
    }, [debouncedSearch, dispatch])

    return <>
        <div className={contentExists ? c.upperWrap : c.wrap}>
            <div className={c.bar}>
                <input value={query}
                    data-testid='searchInput'
                    type='text'
                    placeholder="введите логин"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeHandle(e.target.value)} />
            </div>
        </div>
        <SortBar contentExists={contentExists} />
    </>
}