import React from 'react';
import {
    AppBar,
    Button, CircularProgress, CssBaseline, Divider,
    Drawer, Grid,
    IconButton,
    List, ListItem, ListItemIcon, ListItemText,
    makeStyles,
    Menu,
    MenuItem,
    Toolbar,
    Typography, useTheme
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import clsx from "clsx";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {Link} from 'react-router-dom';
import WorldIcon from '@material-ui/icons/Public';
import WorldDialog from "./WorldDialog";

import {graphql, QueryRenderer} from "react-relay";
import environment from "../enviroment";

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        overflow: "hidden",
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        zIndex: theme.zIndex.drawer + 1,
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        color: theme.palette.primary,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

function Navbar(props) {

    const { onWorldSelect } = props;

    const classes = useStyles();
    const theme = useTheme();
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const [openWorld, setOpenWorld] = React.useState(false);

    const worldClick = () => setOpenWorld(true);

    const worldClose = () => setOpenWorld(false);

    const handleDrawerOpen = () => setOpenDrawer(true);

    const handleDrawerClose = () => setOpenDrawer(false);

    return (
        <Grid item className={classes.root}>
            <CssBaseline/>
            <AppBar
                position="static"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: openDrawer,
                })}
            >
                <Toolbar style={{height: "auto"}}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, openDrawer && classes.hide)}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Towns and Kings
                    </Typography>

                    <div
                        style={{flexGrow: 1}}
                    />

                    <QueryRenderer
                        environment={environment}
                        query={graphql`
                            query NavbarQuery {
                                ...WorldDialog_worldList
                            }
                        `}
                        variables={{}}
                        render={({error, props}) => {
                            if (error) {
                                console.error(error);
                                return <div>Error!</div>;
                            }
                            if (!props) {
                                return <CircularProgress className={classes.menuButton} color="secondary"/>;
                            }

                            return [
                                <WorldDialog key="dialog" open={openWorld} worldList={props} onClose={worldClose} onSelect={(v) => {
                                    worldClose();
                                    onWorldSelect(v);
                                }} />,
                                <IconButton
                                    color="inherit"
                                    key="worldbutton"
                                    aria-haspopup="true"
                                    onClick={worldClick}
                                    edge="start"
                                    className={classes.menuButton}
                                >
                                    <WorldIcon/>
                                </IconButton>
                            ];
                        }}
                    />


                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={openDrawer}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <Typography variant="h5" style={{flexGrow: 1, textAlign: "left", padding: theme.spacing(0, 1)}}> My City </Typography>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>
                </div>
                <Divider/>
                <List>
                    {
                        [
                            {text: 'Overview', url: '/dashboard'},
                            {text: 'Nodes', url: '/nodes'},
                            {text: 'Economics', url: '/economics'},
                            {text: 'Laws', url: '/laws'},

                        ].map((item, index) => (
                            <ListItem button key={item.text} component={Link} to={item.url}>
                                <ListItemText primary={item.text}/>
                            </ListItem>
                        ))}
                </List>
                <Divider/>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: openDrawer,
                })}
            >
            </main>
        </Grid>
    );
}

export default Navbar;
