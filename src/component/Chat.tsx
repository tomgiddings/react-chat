import { FC, useEffect, useState, SyntheticEvent, Fragment } from 'react';
import env from "react-dotenv";
import _uniqueId from 'lodash/uniqueId';
import Pusher, { Channel } from 'pusher-js/with-encryption';
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
    onSetUser: Function,
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

const Chat:FC<IChatProps> = (props: IChatProps, state: IChatState) => {
    const [channelName, setChannelName] = useState('');
    const [messages, setMessages] = useState([] as IMessage[]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [channel, setChannel] = useState({} as Channel);
    const [user, setUser] = useState('');

    useEffect(() => {
        if(channel.subscribed) {
            bindChannel();
        } else {
            joinChannel();
        }
    });

    const joinChannel = (name: string='General', user: string='Anonymous') => {
        setChannelName(name);
        setChannel(pusher.subscribe('presence-' + name));
        props.onSetChannelName(channelName);
    };

    const bindChannel = () => {
        if(Object.entries(channel)) {
            channel.unbind();
        }
        channel.bind('client-new-message', (data: any, metadata: any) => {
            displayMessage(data);
        });
    };

    const displayMessage = (message: IMessage) => {
        setMessages([...messages, message]);
    }

    const sendMessage = (e: SyntheticEvent) => {
        e.preventDefault();
        let message = {
            id: _uniqueId(`message-${user}-`),
            user,
            message: currentMessage,
        };

        displayMessage(message);
        channel.trigger('client-new-message', message);
        setCurrentMessage('');
    }

    const handleMessageChange = (e: SyntheticEvent) => {
        setCurrentMessage((e.target as HTMLInputElement).value);
    }

    const handleUserChange = (user: string) => {
        setUser(user);
        props.onSetUser(user);
    }

    const { classes } = props;
    return (
        <Fragment>
            <UserModal onChangeUser={handleUserChange} />
            <Feed messages={messages} />

            <AppBar position="fixed" color="primary" className={classes.messageBar}>
                <Toolbar>
                    <form className={classes.formMessage} noValidate autoComplete="off">
                        <FormControl fullWidth={true}>
                            <Grid container direction="row" justify="flex-start" alignItems="center" spacing={1}>
                                <Grid item sm={10}>
                                    <TextField
                                        onChange={handleMessageChange}
                                        autoFocus={true}
                                        placeholder="Type message..."
                                        value={currentMessage}
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
                                        onClick={sendMessage}
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
        </Fragment>
    );
};
export default withStyles(styles)(Chat);
