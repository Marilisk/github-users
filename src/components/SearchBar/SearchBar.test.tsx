import { SearchBar } from "./SearchBar";
import { fireEvent, render, screen, userEvent } from './../../utils/test-utils'
import * as reduxHooks from 'react-redux'
import * as actions from './../../redux/store/usersSlice'

vitest.mock('react-redux')

const mockedDispatch = vitest.spyOn(reduxHooks, 'useDispatch')



it('should dispatch actions', async () => {
    const dispatch = vitest.fn()
    mockedDispatch.mockReturnValue(dispatch)
    mockedDispatch.mockResolvedValue(vitest.fn())
    const mockedSetQuery = vitest.spyOn(actions, 'setQuery')
    //mockedDispatch.mockResolvedValue(vitest.fn())
    const { findByRole } = render(<SearchBar />)
    
    const input = await findByRole('textbox') as HTMLInputElement
    fireEvent.change(input, { target: { value: 'a' } })
    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(mockedSetQuery).toHaveBeenCalledTimes(1)
    
}) 