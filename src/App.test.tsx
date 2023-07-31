import App from './App.tsx';
import { fireEvent, render, screen } from './utils/test-utils'
import * as reduxHooks from 'react-redux'

vitest.mock('react-redux')

const mockedDispatch = vitest.spyOn(reduxHooks, 'useDispatch')

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

it('should contain input text', async () => {
    const text = 'a'
    mockedDispatch.mockResolvedValue(vitest.fn())
    const { findByRole } = render(<App />)
    vitest.spyOn(reduxHooks, 'useSelector').mockReturnValue(text)
    const input = await findByRole('textbox') as HTMLInputElement
    fireEvent.change(input, { target: { value: text } })
    expect(input).toHaveValue('a');
})








