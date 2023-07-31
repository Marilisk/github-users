import { FC, useEffect, useState } from 'react'
import c from './UserPopup.module.scss'
import { useAppSelector } from '../../../redux/store/hooks'
import { getUserForPopup } from '../../../redux/store/usersSlice'
import { IUserData } from '../../../types/usersTypes'
import { LoadingDots } from '../../../assets/Preloader/LoadingDots'

interface IUserPopupProps {
    userId: string | undefined
}

export const UserPopup: FC<IUserPopupProps> = ({ userId }: IUserPopupProps) => {

    const user = useAppSelector(state => getUserForPopup(state))
    const [userData, setUserData] = useState<IUserData>()

    const getInfo = async () => {
        if (user?.url) {
            fetch(user?.url)
                .then(async (data) => {
                    let json = await data.json()
                    setUserData(json)
                }).catch((err) => console.log(err))
        }
    }

    useEffect(() => {
        getInfo()
    }, [userId])

    if (!userData) return <div className={c.wrap}><LoadingDots /></div>

    return <div className={c.wrap} id={userId}>
        <h1>{user?.login}</h1>
        <p>
            {user?.site_admin ? '' : 'Не '} является администратором
        </p>
        {userData?.name &&
            <p>
                Имя: {userData?.name}
            </p>
        }
        {userData?.location && <p>
            Регион: {userData?.location}
        </p>}
        <p>
            Создан: {new Date(userData?.created_at).toDateString()}
        </p>
        <p>
            Репозиториев: {userData?.public_repos}
        </p>
    </div>
}

