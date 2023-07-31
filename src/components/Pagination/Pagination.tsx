import { FC } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks"
import { fetchGetUsers, setMaxVisiblePage, setPage } from "../../redux/store/usersSlice"
import c from './Pagination.module.scss'


export const Pagination: FC = () => {

    const dispatch = useAppDispatch()
    const currentPage = useAppSelector(s => s.users.page)
    const totalUsersCount = useAppSelector(s => s.users.users.totalUsersCount)
    const pagesCount = Math.ceil(totalUsersCount / 10)
    const maxVisiblePage = useAppSelector(s => s.users.maxVisiblePage)
    const minVisiblePage = !!(maxVisiblePage - 4) ? (maxVisiblePage - 4) : 1

    const visiblePagesArray = []
    if (pagesCount > 1 && maxVisiblePage) {
        for (let i = minVisiblePage; i <= maxVisiblePage; i++) {
            if (i <= pagesCount) {
                visiblePagesArray.push(i)
            }
        }
    }

    const handleChoosePage = (n: number) => {
        dispatch(fetchGetUsers({ page: n }))
        dispatch(setPage(n))
    }

    return <div className={c.wrap}>
        {minVisiblePage > 1 && <>
            <button type="button"
                className={c.pageNum}
                onClick={() => {
                    dispatch(setMaxVisiblePage(5))
                    handleChoosePage(1)
                }}>
                начало
            </button>
            <button type="button"
                className={c.arrowPage}
                onClick={() => dispatch(setMaxVisiblePage(maxVisiblePage - 1))}>
                <div className={c.leftArrow} />
            </button>
        </>
        }
        {visiblePagesArray.map(p => (
            <button key={p} onClick={() => handleChoosePage(p)}
                className={p === currentPage ? c.chosen : c.pageNum}>
                {p}
            </button>
        ))}

        {
            pagesCount > 5
            && maxVisiblePage !== pagesCount && <>
                <button type="button"
                    className={c.arrowPage}
                    onClick={() => dispatch(setMaxVisiblePage(maxVisiblePage + 1))}>
                    <div className={c.rightArrow} />
                </button>
                <button type="button"
                    className={c.pageNum}
                    onClick={() => {
                        dispatch(setMaxVisiblePage(pagesCount))
                        handleChoosePage(pagesCount)
                    }}>
                    <div>конец</div>
                </button>
            </>
        }

    </div>
}
