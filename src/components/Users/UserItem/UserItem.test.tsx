import { UserItem } from './UserItem'
import { render, screen } from './../../../utils/test-utils'

export const mockUser = {
    login: 'pol',
    id: 1,
    avatar_url: 'pol',
    url: 'pol',
    site_admin: false,
    subscriptions_url: 'pol',
    followers_url: 'pol',
    following_url: 'pol',
}

it('user is visible', () => {
    render(<UserItem user={mockUser} />)
    const user = screen.queryByText(`${mockUser.login}`)
    expect(user).toBeDefined()
})
