import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from '../api/api';
import { IFetch, IUserIniStateType } from '../../types/usersTypes';
import { RootState } from './store';


export const fetchGetUsers = createAsyncThunk('users/fetchGetUsers', async ({ order, query, page }: IFetch, thunkApi) => {
    const state: any = thunkApi.getState()
    const usersState: IUserIniStateType = state.users
    const q = query || usersState.query
    const ord = order || usersState.viewOrder
    const p = page || usersState.page
    let response = await instance.get(`users?q=${q}+in%3Alogin&type=Users&per_page=10&page=${p}&sort=repositories&order=${ord}`);
    return response.data;
})


const initialState: IUserIniStateType = {
    users: {
        items: [],
        loadingStatus: 'loaded',
        totalUsersCount: 0,
    },
    viewOrder: 'desc',
    query: '',
    page: 1,
    maxVisiblePage: 5,
    popup: {
        id: undefined,
        opened: false,
    }
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setQuery(state, action) {
            state.query = action.payload
        },
        setOrder(state, action) {
            state.viewOrder = action.payload
        },
        setPage(state, action) {
            state.page = action.payload
        },
        setMaxVisiblePage(state, action) {
            state.maxVisiblePage = action.payload
        },
        resetUsers(state) {
            state.users.items = []
        },
        callPopup(state, action) {
            if ( state.popup.id && state.popup.id !== action.payload) {
                state.popup.opened = false
                state.popup.id = undefined
            } else {
                if (action.payload !== 'root' && action.payload) {
                    state.popup.id = action.payload
                    state.popup.opened = true
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchGetUsers.pending, (state) => {
            state.users.loadingStatus = 'loading'
        })
            .addCase(fetchGetUsers.fulfilled, (state, action) => {
                state.users.loadingStatus = 'loaded'
                state.users.items = action.payload.items;
                state.users.totalUsersCount = action.payload.total_count
            })
            .addCase(fetchGetUsers.rejected, (state) => {
                state.users.loadingStatus = 'error';
            })
    },
});

export const getUserForPopup = (state: RootState) => {
    const popupId = Number(state.users.popup.id)
    if (popupId) {
        return state.users.users.items.find(u => u.id === popupId)
    }
}

export const {
    setQuery,
    setOrder,
    setPage,
    resetUsers,
    setMaxVisiblePage,
    callPopup,
} = usersSlice.actions;
export default usersSlice.reducer;