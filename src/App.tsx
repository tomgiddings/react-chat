import React from 'react';
import Chat from './component/Chat';

import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

interface IAppProps {
}

interface IAppState {
    channelName: string
}

class App extends React.Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {
        super(props);
        this.state = { channelName: '' }
        this.setChannelName = this.setChannelName.bind(this);
    }

    setChannelName(name:string) {
        this.setState({ channelName: name });
    }

    render() { return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        {this.state.channelName}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Chat onSetChannelName={this.setChannelName} />
        </React.Fragment>
    )};
}

export default App;
