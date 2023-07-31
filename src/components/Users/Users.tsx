import { FC, useEffect } from "react"
import { IUser } from "../../types/usersTypes"
import { UserItem } from "./UserItem/UserItem"
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks"
import { Preloader } from "../../assets/Preloader/Preloader"
import { createPortal } from "react-dom"
import { UserPopup } from "./UserPopup/UserPopup"
import { callPopup } from "../../redux/store/usersSlice"

interface IUsersProps {
    items: IUser[]
}

export const Users: FC<IUsersProps> = ({ items }) => {

    const isLoading = useAppSelector(s => s.users.users.loadingStatus === 'loading')
    const query = useAppSelector(s => s.users.query)
    const dispatch = useAppDispatch()
    const popup = useAppSelector(s => s.users.popup)
    const showPopup = popup?.opened

    const handleClick = (e: MouseEvent) => {
        const element = (e.target as HTMLElement).closest('[id]') as HTMLElement
        let id
        if (element) { id = element.id }
        dispatch(callPopup(id))
    }

    useEffect(() => {
        window.addEventListener('click', handleClick)
        return () => window.removeEventListener('click', handleClick)
    })

    if (!query?.length) return null
    if (isLoading) return <Preloader />
    if (!items.length && query.length && !isLoading) return <h1>нет результатов...</h1>

    return <div>
        {items.map((user => <UserItem key={user.id} user={user} />))}
        {showPopup && createPortal(
            <UserPopup userId={popup.id} />,
            document.body)}
    </div>
}