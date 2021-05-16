import React, { useEffect, useRef } from 'react';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    text: {
        padding: theme.spacing(2, 2, 0),
    },
    paper: {
        paddingBottom: 50,
        height: '100%'
    },
    list: {
        marginBottom: theme.spacing(2),
    }
}));

interface IMessage {
    id: string,
    user: string,
    message: string
}

interface IFeedProps {
    messages: IMessage[]
}

export default function Feed(props: IFeedProps) {
    const scrollRef = useRef<null | any>(null);
    const classes = useStyles();

    useEffect(() => {
        let isMounted = true;
        if (isMounted && scrollRef.current) {
          scrollRef.current.scrollIntoView({ behaviour: "smooth" });
        }
        return () => {
            isMounted = false;
        };
    }, [props.messages]);

    return (
        <Paper square 
            className={classes.paper}
            elevation={0}
        >
        <List className={classes.list}>
            {props.messages.map((body) => (
                <ListItem 
                    button
                    ref={scrollRef}
                    key={body.id}
                >
                    <ListItemText
                        primary={body.user}
                        secondary={body.message}
                    />
                </ListItem>
            ))}
        </List>
    </Paper>
        
    )
}