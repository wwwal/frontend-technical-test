import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fab,
    Grid,
    IconButton,
    TextField,
    Toolbar,
    useTheme
} from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next';
import axios, { AxiosError } from 'axios';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Divider from '@mui/material/Divider';
import SendIcon from '@mui/icons-material/Send';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

import { addConversation, addMessageToConversation, removeConversation } from '../../store/chat';
import { ChatAppBar, ChatBottomBox, ChatDrawer, ChatDrawerHeader, ChatMain, ChatTextField } from './Chat.style';
import { Message } from '../../types/message';
import { RootState } from '../../store';
import { setLastAlert } from '../../store/user';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { User } from '../../types/user';
import ChatDirectory from '../ChatDirectory/ChatDirectory';
import ChatList from '../ChatList/ChatList';
import ChatSkeleton from './ChatSkeleton';
import ChatThread from '../ChatThread/ChatThread';



type ChatProps = {
    loading: boolean;
    deleteEnabled?: boolean;
}

const Chat = ({ loading, deleteEnabled = false }: ChatProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    const [currentMessage, setCurrentMessage] = useState('');
    const [currentConversationId, setCurrentConversationId] = useState(null);
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [listOpen, setListOpen] = useState(true);
    const [toDeleteId, setToDeleteId] = useState(null);
    const dispatch = useAppDispatch();
    const { t } = useTranslation(['chat', 'global']);
    const conversations = useAppSelector((state: RootState) => state.chat.conversations)
    const currentUser = useAppSelector((state: RootState) => state.user.infos)

    const handleClickCreate = (recipient: User) => {
        const existing = Object.values(conversations).find(
            (conversation) => recipient.id === conversation.recipientId
        )

        if (undefined !== existing) {
            setCurrentConversationId(existing.id)
        } else {
            dispatch(addConversation(
                {
                    id: 0,
                    recipientId: recipient.id,
                    recipientNickname: recipient.nickname,
                    senderId: currentUser.id,
                    senderNickname: currentUser.nickname,
                    lastMessageTimestamp: Date.now()
                }
            ))
            setCurrentConversationId(0)
        }
        setListOpen(false)
        setCreateDialogOpen(false)
    };

    const handleClickDelete = (id: number) => {
        setToDeleteId(id)
    };

    const handleClickCancelDelete = () => {
        setToDeleteId(null)
    };

    const handleClickConfirmDelete = () => {
        const id = toDeleteId;
        setToDeleteId(null)
        axios.delete(`${process.env.API_HOST}/conversation/${id}`)
            .then(() => {
                dispatch(removeConversation(id))
            })
            .catch((error: AxiosError) => {
                console.log
                dispatch(setLastAlert({ type: 'error', message: error.code }))
            })
    };

    const handleClickThread = (id: number) => {
        setCurrentConversationId(id)
        setListOpen(!listOpen)
    };

    const handleNewMessage = () => {
        const newMessage: Omit<Message, 'conversationId' | 'id'> = {
            timestamp: Date.now(),
            authorId: currentUser.id,
            body: currentMessage
        } as const;

        axios.post(`${process.env.API_HOST}/conversation/${currentConversationId}/messages`, newMessage)
            .then((response) => {
                dispatch(addMessageToConversation(response.data))
                setCurrentMessage('')

            })
            .catch((error: AxiosError) => {
                dispatch(setLastAlert({ type: 'error', message: error.code }))
            })
    };

    const title = null !== currentConversationId ?
        `${conversations[currentConversationId].recipientNickname} - ${t('you', { ns: 'global' })}` : t('title');

    if (true === loading || null === currentUser) {
        return <ChatSkeleton />
    }

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <ChatAppBar position="fixed" open={listOpen}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open chat list"
                            onClick={() => setListOpen(!listOpen)}
                            edge="start"
                            sx={{ mr: 2, ...(listOpen && { display: 'none' }) }}
                        >
                            <ChatBubbleIcon />
                        </IconButton>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" noWrap component="div">
                                    {title}
                                </Typography>
                            </Grid>
                            {
                                null !== currentConversationId &&
                                <Grid item md={6}>
                                    <Typography variant="h6" noWrap component="div">
                                        {`Last message: ${new Date(conversations[currentConversationId].lastMessageTimestamp).toLocaleDateString()}`}
                                    </Typography>
                                </Grid>
                            }

                        </Grid>

                    </Toolbar>
                </ChatAppBar>
                <ChatDrawer
                    variant="temporary"
                    anchor="left"
                    open={listOpen}
                >
                    <ChatDrawerHeader>
                        <IconButton onClick={() => setListOpen(!listOpen)}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </ChatDrawerHeader>
                    <Divider />
                    <ChatList
                        deleteOnClick={deleteEnabled ? handleClickDelete : null}
                        selectOnClick={handleClickThread}
                        newOnClick={() => setCreateDialogOpen(true)}
                    />
                </ChatDrawer>
                <ChatMain open={listOpen}>
                    <ChatDrawerHeader />
                    <ChatThread
                        conversationId={currentConversationId}
                        lastUpdate={undefined !== conversations[currentConversationId] ? conversations[currentConversationId].lastMessageTimestamp : 0}
                    />
                </ChatMain>
                <ChatBottomBox>
                    <ChatTextField>
                        <TextField
                            value={currentMessage}
                            id="chat-text-field"
                            label={t('enter_text')}
                            multiline
                            maxRows={4}
                            fullWidth
                            onChange={(e) => {
                                setCurrentMessage(e.target.value)
                            }}
                        />
                        <Fab size="small" color="primary" aria-label="send message" onClick={() => handleNewMessage()}>
                            <SendIcon />
                        </Fab>
                    </ChatTextField>
                </ChatBottomBox>
            </Box>
            <Dialog
                fullScreen={isMobile}
                open={null !== toDeleteId}
                onClose={handleClickCancelDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {t('delete_warning.title')}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {t('delete_warning.body')}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickCancelDelete}>{t('cancel', { ns: 'global' })}</Button>
                    <Button onClick={handleClickConfirmDelete} autoFocus>
                        {t('confirm', { ns: 'global' })}
                    </Button>
                </DialogActions>
            </Dialog>
            <ChatDirectory
                open={createDialogOpen}
                onCreate={handleClickCreate}
            />
        </>
    );
}

export default Chat