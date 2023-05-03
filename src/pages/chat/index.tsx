import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react'
import axios, { AxiosError } from 'axios';

import { Conversation } from '../../types/conversation';
import { setChatLastUpdate, setConversations } from '../../store/chat';
import { setLastAlert, setUser } from '../../store/user';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Chat from '../../components/Chat/Chat';
import db from '../../server/db.json';
import { RootState } from '../../store';



export default function ChatPage() {
    const [isLoading, setLoading] = useState(false)
    const dispatch = useAppDispatch()
    const [cookies] = useCookies();
    const conversations = useAppSelector((state: RootState) => state.chat.conversations)


    useEffect(() => {
        dispatch(setUser(db.users.find((user) => cookies.user === user.token)));
        axios.defaults.headers.common['Authorization'] = `Bearer ${db.users[0].token}`;
        if (null === conversations || 0 === Object.values(conversations).length) {
            setLoading(true)
            axios.get<Conversation[]>(`${process.env.API_HOST}/conversations`)
                .then((response) => {
                    setLoading(false)
                    dispatch(setConversations(response.data))
                    dispatch(setChatLastUpdate(Date.now()))
                })
                .catch((error: AxiosError) => {
                    dispatch(setLastAlert({ type: 'error', message: error.code }))
                })
        }
    }, [cookies.user, dispatch])

    return (
        <Chat
            loading={isLoading}
            deleteEnabled={true}
        />
    )
}
