import { styled } from '@mui/material';

export const FixedAlert = styled('div')(({ theme }) => ({
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    '& .MuiAlert-root': {
        margin: 0,
        width: '100%',
        '@media (min-width: 1024px)': {
            width: '80%',
            margin: '20px'
        }
    }
}
));