import { describe } from "vitest";
import { fireEvent, render, screen } from "../../../utils/test-utils";
import { UserPopup } from "./UserPopup";
import * as actions from './../../../redux/store/usersSlice'
import * as reduxHooks from 'react-redux'

vitest.mock('react-redux')

const mockedDispatch = vitest.spyOn(reduxHooks, 'useDispatch')




describe('UserPopup', () => {
    it('should create popup', () => {
        const component = render(<UserPopup userId={'123'} />)
        expect(component).toMatchSnapshot()
    })

    it('should dispatch actions', () => {
        const component = render(<UserPopup userId={'123'} />)

        const element = screen.getByTestId('123')
        //fireEvent.click(screen.getByTestId('123'))

    })
})