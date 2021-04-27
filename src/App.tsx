import React from 'react';
import Chat from './component/Chat';

import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import AccountCircle from '@material-ui/icons/AccountCircle';

interface IAppProps {
}

interface IAppState {
    channelName: string,
    user: string
}

class App extends React.Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {
        super(props);
        this.state = {
            channelName: '',
            user: ''
        };
        this.setChannelName = this.setChannelName.bind(this);
        this.setUser = this.setUser.bind(this);
    }

    setChannelName(name:string) {
        this.setState({ channelName: name });
    }

    setUser(user:string) {
        this.setState({ user });
    }

    render() { return (
        <React.Fragment>
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
                        <Grid item>
                            <Typography variant="h6">
                                {this.state.channelName}
                            </Typography>
                        </Grid>
                        <Grid
                        justify="flex-end"
                            spacing={1}
                            container
                            zeroMinWidth
                        >
                            {this.state.user.length > 0 ?
                                <React.Fragment>
                                    <Grid item>
                                        <AccountCircle />
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="subtitle1">
                                            {this.state.user}
                                        </Typography>
                                    </Grid>
                                </React.Fragment>
                            :<Grid item>Not Logged In</Grid>}
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Chat onSetChannelName={this.setChannelName} onSetUser={this.setUser} />
        </React.Fragment>
    )};
}

export default App;
