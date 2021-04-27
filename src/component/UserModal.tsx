import React from 'react';
import Modal from '@material-ui/core/Modal';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

function getModalStyle() {
    return {
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: '80%',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    userForm: {
        width: '100%'
    }
}));

interface IUserModalProps {
    onChangeUser: Function
}

export default function UserModal(props:IUserModalProps) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(true);
    const [isValid, setValid] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const onChangeUser = (e: React.ChangeEvent<{ value: string }>) => {
        props.onChangeUser(e.target.value)
        setValid(e.target.value.length > 0);
    }

    const body = (
        <form className={classes.userForm}>
            <FormControl
                style={modalStyle}
                className={classes.paper}
            >
                <TextField
                    name="user"
                    autoFocus={true}
                    variant="outlined"
                    label="Please enter your name"
                    required={true}
                    margin="dense"
                    onChange={(e) => onChangeUser(e)}
                />
                <Button
                    type="submit"
                    onClick={handleClose}
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={!isValid}
                >
                    Continue
                </Button>
            </FormControl>
        </form>
    );

    return (
        <React.Fragment>
            <Modal
                open={open}
                onClose={handleClose}
                disableBackdropClick={true}
            >
                {body}
            </Modal>
        </React.Fragment>
    );
}
