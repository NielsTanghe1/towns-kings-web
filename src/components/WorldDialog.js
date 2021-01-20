import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import WorldIcon from "@material-ui/icons/Public";
import {ListItemIcon} from "@material-ui/core";
import environment from "../enviroment";
import {graphql, QueryRenderer} from "react-relay";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

const emails = ['username@gmail.com', 'user02@gmail.com'];
const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
});

function WorldDialog(props) {
    const classes = useStyles();
    const { onLoad, onClose, selectedValue, open, onSelect } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onSelect(value);
        onClose(value);
    };

    return (
        <QueryRenderer
            environment={environment}
            query={graphql`
              query WorldDialogQuery {
                worlds {
                    id,
                    name
                }
              }
            `}
            variables={{}}
            render={({error, props}) => {
                if (error) {
                    return <div>Error!</div>;
                }

                if (props) {

                    onLoad(props.worlds.filter((w) => w.default)[0]);

                    return (
                        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
                            <DialogTitle style={{textAlign: "center"}} id="simple-dialog-title">Select world</DialogTitle>
                            <List>
                                {props.worlds.map((world) => (
                                    <ListItem button onClick={() => handleListItemClick(world)} key={world.name}>
                                        <ListItemIcon>
                                            <WorldIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary={world.name} />
                                    </ListItem>
                                ))}
                            </List>
                        </Dialog>
                    );
                }
        }}/>
    );
}

export default WorldDialog;