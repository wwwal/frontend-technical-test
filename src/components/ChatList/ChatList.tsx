import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';

import { RootState } from '../../store';
import { useAppSelector } from '../../hooks';
import ChatCard from '../ChatCard/ChatCard';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

type ChatListProps = {
    selectOnClick: (id: number) => void;
    deleteOnClick: (id: number) => void | null;
    newOnClick: () => void
}

const ChatList = ({ deleteOnClick, selectOnClick, newOnClick }: ChatListProps) => {
    const conversations = useAppSelector((state: RootState) => state.chat.conversations)
    const orderedConversations = Object.values(conversations).sort((a, b) => a.lastMessageTimestamp < b.lastMessageTimestamp ? 1 : -1)

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <List>
                        {
                            orderedConversations.map((conversation) => (
                                <ChatCard
                                    key={conversation.id}
                                    conversation={conversation}
                                    deleteOnClick={deleteOnClick}
                                    selectOnClick={selectOnClick}
                                />
                            ))
                        }
                    </List>
                </Grid>
            </Grid>
            <Box position={'absolute'} bottom={15} right={15}>
                <Fab color="secondary" aria-label="create new conversation" onClick={() => newOnClick()}>
                    <AddIcon />
                </Fab>
            </Box>
        </Box>
    );
}

export default ChatList