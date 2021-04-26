import React from 'react';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {
    AppBar,
    IconButton,
    Toolbar,
    Typography,
    withStyles,
} from '@material-ui/core';

const drawerWidth = 240;

const styles = (theme) => ({
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    lebeledIconButton: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    title: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
});

/**
 *
 * @param {{
 * classes: {[key: string]: string},
 * open: boolean,
 * toggleDrawer: () => void,
 * onLogout: () => void
 * }} props
 */
function TopBar({ classes, open, toggleDrawer, onLogout }) {
    return (
        <AppBar
            style={{ backgroundColor: "#14465f", boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 20px 15px rgba(0,0,0,0.22)" /*boxShadow: 'none'*/ }}
            position="absolute"
            className={clsx(classes.appBar, open && classes.appBarShift)}
        >
            <Toolbar className={classes.toolbar}>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer}
                    className={clsx(
                        classes.menuButton,
                        open && classes.menuButtonHidden,
                    )}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    component="h1"
                    variant="h4"
                    color="inherit"
                    noWrap
                    className={classes.title}
                >
                    Stresser
                </Typography>
                <IconButton
                    color="inherit"
                    className={classes.lebeledIconButton}
                    onClick={onLogout}
                >
                    <Typography>Logout</Typography>
                    &nbsp;
                    <ExitToAppIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

export default withStyles(styles)(TopBar);
