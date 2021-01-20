import React from 'react'
import { NodeEditor } from "flume";
import config from "../NodeConfig";
import {
    Container,
    Divider,
    Drawer,
    Grid,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Toolbar
} from "@material-ui/core";
import List from "@material-ui/core/List";
import {classes} from "istanbul-lib-coverage";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

function NodePage()
{

    const classes = useStyles();

    return (
        <Grid item className={classes.root} style={{flexGrow: 1}}>
            <NodeEditor
                portTypes={config.portTypes}
                nodeTypes={config.nodeTypes}
            />

            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="right"
            >

                <Toolbar />
                <div className={classes.drawerContainer}>
                    <List>
                        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                            <ListItem button key={text}>

                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {['All mail', 'Trash', 'Spam'].map((text, index) => (
                            <ListItem button key={text}>

                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Drawer>

        </Grid>

    )
}

export default NodePage;