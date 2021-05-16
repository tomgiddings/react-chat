import { FC, useState, Fragment } from 'react';
import Chat from './component/Chat';

import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import AccountCircle from '@material-ui/icons/AccountCircle';

const App:FC = () => {
    const [channelName, setChannelName] = useState('');
    const [user, setUser] = useState('');

    return (
        <Fragment>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    <Grid
                        justify="space-between"
                        direction="row"
                        alignItems="center"
                        wrap="nowrap"
                        container
                    >
                        <Grid item zeroMinWidth>
                            <Typography variant="h6">
                                {channelName}
                            </Typography>
                        </Grid>
                        <Grid
                        justify="flex-end"
                            spacing={1}
                            container
                        >
                            {user.length > 0 ?
                                <Fragment>
                                    <Grid item>
                                        <AccountCircle />
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="subtitle1">
                                            {user}
                                        </Typography>
                                    </Grid>
                                </Fragment>
                            :<Grid item>Not Logged In</Grid>}
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Chat onSetChannelName={setChannelName} onSetUser={setUser} />
        </Fragment>
    );
}

export default App;
