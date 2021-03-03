import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import WorldIcon from "@material-ui/icons/Public";
import {ListItemIcon} from "@material-ui/core";
import {createFragmentContainer, graphql} from "react-relay";

function WorldDialog(props) {
    const { worldList, open, onClose, onSelect } = props;

    //TODO default world

    const handleListItemClick = (value) => {
        onSelect(value)
    };

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="simple-dialog-title">
            <DialogTitle style={{textAlign: "center"}} id="simple-dialog-title">Select world</DialogTitle>
            <List>
                {worldList.worlds.map((world) => (
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

export default createFragmentContainer(WorldDialog,
    {
        worldList: graphql`
            fragment WorldDialog_worldList on Query {
                worlds {
                    id,
                    name
                }
            }
        `
    }
);