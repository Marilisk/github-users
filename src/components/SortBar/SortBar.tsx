import { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks'
import { fetchGetUsers, setOrder } from '../../redux/store/usersSlice'
import c from './Sortbar.module.scss'

interface ISortBarProps {
    contentExists: boolean
}

export const SortBar: FC<ISortBarProps> = ({ contentExists }: ISortBarProps) => {

    const dispatch = useAppDispatch()
    const viewOrder = useAppSelector(s => s.users.viewOrder)

    const handleChangeOrder = (value: 'asc' | 'desc') => {
        dispatch(setOrder(value))
        dispatch(fetchGetUsers({ order: value, }))
    }

    return <div className={contentExists ? c.wrap : c.hidden}>
        <button type='button'
            className={viewOrder === 'asc' ? c.act : c.pass}
            onClick={() => handleChangeOrder('asc')}>
            <span>сортировать по возрастанию</span>
        </button>
        <button type='button'
            className={viewOrder !== 'asc' ? c.act : c.pass}
            onClick={() => handleChangeOrder('desc')}>
            <span>сортировать по убыванию</span>
        </button>
    </div>
}