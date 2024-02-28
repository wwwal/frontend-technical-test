import { Box, Grid, ThemeProvider, Typography, createTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios, { AxiosError } from 'axios';

import { loadConversation } from '../../store/chat';
import { Message } from '../../types/message';
import { MessageBox, MessagePaper } from './Message.style';
import { RootState } from '../../store';
import { setLastAlert } from '../../store/user';
import { useAppDispatch, useAppSelector } from '../../hooks';

type ChatThreadProps = {
    conversationId: number
    lastUpdate: number
}

const ChatThread = ({ conversationId, lastUpdate }: ChatThreadProps) => {
    const [currentConversation, setCurrentConversation] = useState<Message[] | null>(null);
    const dispatch = useAppDispatch();
    const currentUserId = useAppSelector((state: RootState) => state.user?.infos?.id)
    const { t } = useTranslation('chat');
    const conversations = useAppSelector((state: RootState) => state.chat.conversations)
    const recipientNickname = conversations[conversationId]?.recipientNickname;

    const darkTheme = createTheme({ palette: { mode: 'dark' } });
    const lightTheme = createTheme({ palette: { mode: 'light' } });

    useEffect(() => {
        if (null !== conversationId) {
            axios.get<Message[]>(`${process.env.API_HOST}/messages/${conversationId}`)
                .then((response) => {
                    const messages = response.data.sort((a, b) => a.timestamp > b.timestamp ? 1 : -1);
                    setCurrentConversation(messages);
                    dispatch(loadConversation(messages))
                })
                .catch((error: AxiosError) => {
                    dispatch(setLastAlert({ type: 'error', message: error.message }));
                })
        }
    }, [conversationId, conversations[conversationId], dispatch])
    return (
        <Box paddingBottom={10}>
            {(null !== currentConversation && 0 !== currentConversation.length) ?
                (
                    currentConversation.map((message) => (
                        <Grid
                            key={message.id}
                            container
                            spacing={2}
                            alignItems={currentUserId === message.authorId ? 'flex-end' : 'flex-start'}
                            flexDirection={'column'}
                        >
                            <Grid item xs={8}>
                                <ThemeProvider theme={currentUserId === message.authorId ? lightTheme : darkTheme}>
                                    <MessageBox>
                                        {currentUserId !== message.authorId ? <Typography variant="caption" noWrap component="div">{recipientNickname}</Typography> : null}
                                        <MessagePaper elevation={4}>
                                            {message.body}
                                        </MessagePaper>
                                    </MessageBox>
                                </ThemeProvider>
                            </Grid>
                        </Grid>
                    ))
                )
                :
                (
                    <Grid
                        container
                        spacing={2}
                        alignItems={'center'}
                        flexDirection={'column'}
                    >
                        <Grid item xs={8}>{null === conversationId ? t('welcome') : t('empty_conversation')}</Grid>
                    </Grid>
                )
            }

        </Box>
    )

}

export default ChatThread