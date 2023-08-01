import App from './App.tsx';
import { render, screen } from './utils/test-utils'
import * as reduxHooks from 'react-redux'
import { Users } from './components/Users/Users.tsx';
import { mockUser } from './components/Users/UserItem/UserItem.test.tsx';

vitest.mock('react-redux')
const mockUsers = [mockUser]


it('the input is visible', () => {
    vitest.spyOn(reduxHooks, 'useSelector').mockReturnValue([])
    render(<App />)
    const placeholder = screen.queryByText(/введите логин/i)
    expect(placeholder).toBeDefined()
})

it('no results: not to be in the component by default', () => {
    vitest.spyOn(reduxHooks, 'useSelector').mockReturnValue([])
    render(<App />)
    const placeholder = screen.queryByText(/нет результатов.../i)
    expect(placeholder).not.toBeInTheDocument()
})

it('should create App with empty users', () => {
    const component = render(<App />)
    expect(component).toMatchSnapshot()
})

it('should show users', () => {
    const component = render(<Users items={mockUsers} />)
    expect(component).toBeDefined()
})



