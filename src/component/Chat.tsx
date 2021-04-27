import React from 'react';
import env from "react-dotenv";
import _uniqueId from 'lodash/uniqueId';
import Pusher from 'pusher-js/with-encryption';
import UserModal from './UserModal';
import Feed from './Feed';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme:any) => ({
    messageBar: {
        top: 'auto',
        bottom: 0,
    },
    lightField:{
        background: 'white'
    },
    formMessage: {
        width: '100%'
    }
});

const pusher = new Pusher(env.PUSHER_APP_ID, {
    cluster: env.PUSHER_CLUSTER,
    authEndpoint: env.PUSHER_AUTH_ENDPOINT
});

interface IChatProps {
    onSetChannelName: Function,
    classes: any
}

interface IChatState {
    channelName: string,
    messages: IMessage[],
    currentMessage: string,
    channel: any,
    user: string
}

interface IMessage {
    id: string,
    user: string,
    message: string
}

class Chat extends React.Component<IChatProps, IChatState> {
    constructor(props: IChatProps) {
        super(props);
        this.state = {
            channelName: '',
            messages: [],
            currentMessage: '',
            channel: {},
            user: ''
        };
        this.setCurrentMessage = this.setCurrentMessage.bind(this);
        this.setUser = this.setUser.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    componentDidMount() {
        this.joinChannel();
    }

    joinChannel(name: string='General', user: string='Anonymous') {
        this.setState({
            channelName: name,
            channel: pusher.subscribe('presence-' + name)
        }, () => this.bindChannel());
        this.props.onSetChannelName(name);
    }

    bindChannel() {
        if(Object.entries(this.state.channel)) {
            this.state.channel.unbind();
        }
        this.state.channel.bind('client-new-message', (data: any, metadata: any) => {
            this.displayMessage(data);
        });
    }

    setCurrentMessage(e: React.ChangeEvent<{ value: string }>) {
        this.setState({
            currentMessage: e.target.value
        });
    }

    setUser(user: string) {
        this.setState({
            user
        })
    }

    displayMessage(message: IMessage) {
        this.setState((prevState, props) => ({
            messages: [...prevState.messages, message],
        }));
    }

    sendMessage(event: React.SyntheticEvent) {
        event.preventDefault();
        let message = {
            id: _uniqueId("message-"),
            user: this.state.user,
            message: this.state.currentMessage, 
        };

        this.displayMessage(message)
        this.state.channel.trigger('client-new-message', message)
        this.setState({ currentMessage: '' })
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <UserModal onChangeUser={(user:string) => this.setUser(user)} />
                <Feed messages={this.state.messages} />

                <AppBar position="fixed" color="primary" className={classes.messageBar}>
                    <Toolbar>
                        <form className={classes.formMessage}>
                        <FormControl fullWidth={true}>
                            <Grid container direction="row" justify="flex-start" alignItems="center" spacing={1}>
                                <Grid item sm={10}>
                                    <TextField
                                        onChange={this.setCurrentMessage.bind(this)}
                                        autoFocus={true}
                                        placeholder="Type message..."
                                        value={this.state.currentMessage}
                                        variant="outlined"
                                        margin="dense"
                                        fullWidth={true}
                                        InputProps={{
                                            className: classes.lightField
                                        }}
                                    />
                                </Grid>
                                <Grid item sm={2}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        onClick={this.sendMessage}
                                        size="large"
                                        fullWidth={true}
                                    >
                                        Send
                                    </Button>
                                </Grid>
                            </Grid>
                        </FormControl>
                        </form>
                    </Toolbar>
                </AppBar>
            </React.Fragment>
        );
    }
};
export default withStyles(styles)(Chat);
