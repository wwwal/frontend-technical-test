import { Grid, List, ListItem, Skeleton } from '@mui/material'

const ChatSkeleton = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
                <List>
                    {
                        [0, 1, 2, 3].map((i) => (
                            <ListItem key={i}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} display={'flex'} justifyContent={'space-evenly'}>
                                        <Skeleton variant="circular" width={40} height={40} />
                                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={100} />
                                    </Grid>
                                </Grid>
                            </ListItem>
                        ))
                    }
                </List>

            </Grid>
            <Grid item xs={12} md={9}>
                <List>
                    {
                        [0, 2, 3, 5, 7, 8, 9].map((i) => (
                            <ListItem key={i}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} display={'flex'} justifyContent={0 === i % 2 ? 'end' : 'start'}>
                                        <Skeleton variant="rounded" width={100} />
                                    </Grid>
                                </Grid>
                            </ListItem>
                        ))
                    }
                </List>
            </Grid>
        </Grid>
    )
}

export default ChatSkeleton