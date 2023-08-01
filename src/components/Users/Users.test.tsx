import { describe } from "vitest";
import { Users } from "./Users";
import { mockUser } from "./UserItem/UserItem.test";
import { render } from "../../utils/test-utils";

vitest.mock('react-redux')

const mockUsers = [mockUser]

describe('Users', () => {
    it('should create users', () => {
        const component = render(<Users items={mockUsers} />)
        expect(component).toMatchSnapshot()
    })
})