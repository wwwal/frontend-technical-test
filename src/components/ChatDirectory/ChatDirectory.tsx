import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Modal, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';

import { RootState } from '../../store';
import { setLastAlert } from '../../store/user';
import { StyledAvatar } from '../Avatar/Avatar.style';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { User } from '../../types/user';

type ChatDirectoryProps = {
    onCreate: (recipient: User) => void
    open: boolean;
}

const ChatDirectory = ({ onCreate, open = false }: ChatDirectoryProps) => {
    const dispatch = useAppDispatch();
    const [recipients, setRecipients] = useState<User[]>([]);
    const currentUserId = useAppSelector((state: RootState) => state.user?.infos?.id)

    useEffect(() => {
        if (undefined !== currentUserId) {
            axios.get<User[]>(`${process.env.API_HOST}/users`)
                .then((response) => {
                    const filteredRecipients = response.data.filter((recipient) => currentUserId !== recipient.id)
                    setRecipients(filteredRecipients)
                })
                .catch((error: AxiosError) => {
                    dispatch(setLastAlert({ type: 'error', message: error.message }));
                })
        }

    }, [currentUserId, dispatch])

    return (
        <Modal
            open={open}
            aria-labelledby="modal new conversation"
            aria-describedby="modal showing chat directory"
        >
            <Box>
                <Paper>
                    <List>
                        {
                            recipients.map((recipient) => (
                                <ListItem
                                    key={recipient.id}
                                    onClick={() => onCreate(recipient)}
                                >
                                    <ListItemAvatar>
                                        <StyledAvatar
                                            overlap="circular"
                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                            variant="dot"
                                        >
                                            <Avatar alt={recipient.nickname} src={`/users/${recipient.id}.png`} />
                                        </StyledAvatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={recipient.nickname}
                                    />
                                </ListItem>
                            ))
                        }
                    </List>
                </Paper>
            </Box>
        </Modal>
    );
}

export default ChatDirectory