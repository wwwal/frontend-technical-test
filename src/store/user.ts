import { AlertColor } from '@mui/material';
import { createSlice } from '@reduxjs/toolkit'

import { User } from '../types/user'

export interface UserAlert {
    message: string | null ;
    type?: AlertColor
}

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        infos: <User>null,
        lastAlert: <UserAlert>null
    },
    reducers: {
        setLastAlert: (state, alert) => {
            state.lastAlert = alert.payload
        },
        setUser: (state, user) => {
            state.infos = user.payload
        },
    },
})

export const { setLastAlert, setUser } = userSlice.actions

export default userSlice.reducer