import { Box, Paper, styled } from '@mui/material';

export const MessageBox = styled(Box)(({ theme }) => ({
    padding: '10px'
}));

export const MessagePaper = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: '5px 15px',
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

