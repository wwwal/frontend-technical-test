import { Box, Drawer, styled } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

const drawerWidth = 240;
const sendButtonSize = 40;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
    $mobile?: boolean;
}

const ChatDrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const ChatBottomBox = styled('div')(({ theme }) => ({
    position: 'fixed',
    zIndex: 1,
    bottom: 0,
    left: 0,
    right: 0,
    margin: '0 auto',
    padding: '15px',
    display: 'flex',
    justifyContent: 'end',
    backgroundColor: theme.palette.background.default
}));

const ChatTextField = styled('div')({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    '& .MuiFormControl-fullWidth': {
        width: `calc(100% - ${sendButtonSize + 5}px)`,
        marginRight: '5px'
    }
});


const ChatMain = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

const ChatAppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open, $mobile }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: '100%',
        marginLeft: 0,
        '@media (min-width: 900px)': {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: `${drawerWidth}px`,
        },
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const ChatDrawer = styled(Drawer)({
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxSizing: 'border-box',
    },
});

export {
    ChatDrawerHeader,
    ChatBottomBox,
    ChatMain,
    ChatAppBar,
    ChatDrawer,
    ChatTextField
}