import { Users } from './components/Users/Users'
import { useAppSelector } from './redux/store/hooks'
import { SearchBar } from './components/SearchBar/SearchBar'
import { Pagination } from './components/Pagination/Pagination'

function App() {

  const users = useAppSelector(s => s.users.users.items)
  const total = useAppSelector(s => s.users.users.totalUsersCount)


  return (
    <>
      <SearchBar />
      {!!total && !!users.length &&
        <>
          <h1>Результатов: {total}</h1>
          <Pagination />
        </>
      }
      <Users items={users} />
    </>
  )
}

export default App
