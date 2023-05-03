import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';

import { Conversation } from '../../types/conversation';
import { StyledAvatar } from '../Avatar/Avatar.style';
import { StyledChatCard } from './ChatCard.style';

type ChatCardProps = {
    conversation: Conversation
    selectOnClick: (id: number) => void
    deleteOnClick: (id: number) => void | null
}

const ChatCard = ({ conversation, deleteOnClick, selectOnClick }: ChatCardProps) => {
    return (
        <StyledChatCard
            onClick={() => selectOnClick(conversation.id)}
            secondaryAction={
                null !== deleteOnClick ?
                    <IconButton edge="end" aria-label="delete conversation" onClick={() => deleteOnClick(conversation.id)}>
                        <DeleteIcon />
                    </IconButton>
                    :
                    null
            }
        >
            <ListItemAvatar>
                <StyledAvatar
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant={conversation.recipientOnline ? 'dot' : 'standard'}
                >
                    <Avatar alt={conversation.recipientNickname} src={`/users/${conversation.recipientId}.png`} />
                </StyledAvatar>
            </ListItemAvatar>
            <ListItemText
                primary={conversation.recipientNickname}
            />
        </StyledChatCard>
    )
}

export default ChatCard