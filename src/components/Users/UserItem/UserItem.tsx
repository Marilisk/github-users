import { FC } from "react";
import { IUser } from "../../../types/usersTypes";
import c from './UserItem.module.scss'


interface IUserItemProps {
    user: IUser
}

export const UserItem: FC<IUserItemProps> = ({ user }: IUserItemProps) => {

    
    return <div className={c.wrap} id={user.id.toString()} data-testid={user.id.toString()}>
        <div className={c.item}>
            <div className={c.avatar}>
                <img alt={user.login} src={user.avatar_url} />
            </div>
            <div className={c.name}>
                {user.login}
            </div>
        </div>
    </div>
}