import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { MainListItems, LIST_ITEMS } from './listItems';
import TopBar from './TopBar';
import RulesTab from '../Rules/RulesTab';
import { observer } from 'mobx-react';
import Rules from '../Rules/RulesClasses/Rules';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'whitesmoke',
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        display: 'flex',
        height: '100%',
        width: '100%',
        color: 'white',
        paddingLeft: theme.spacing(4),
        paddingTop: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

/**
 *
 * @param {{
 * authenticationManager: import("../AuthenticationManager").default
 * }} props
 */
function Dashboard({ authenticationManager }) {
    const classes = useStyles();
    const [open, setOpen] = useState(true);
    const [selectedItem, setSelectedItem] = useState(LIST_ITEMS.DASHBOARD);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    function renderSelectedTab() {
        switch (selectedItem) {
            case LIST_ITEMS.DASHBOARD:
                return 'null';
            case LIST_ITEMS.ENDPOINTS:
                return 'null';
            case LIST_ITEMS.EVENTS:
                return 'null';
            case LIST_ITEMS.POLICY:
                return 'null';
            case LIST_ITEMS.RULES:
                const dbRules = new Rules();
                return (
                    <RulesTab
                        rules={dbRules.rules}
                        deleteRuleFromList={dbRules.deleteRule}
                        addRuleToList={dbRules.addRule}
                    />
                );

            default:
                return null;
        }
    }

    return (
        <>
            <div className={classes.root}>
                <TopBar
                    open={open}
                    toggleDrawer={toggleDrawer}
                    onLogout={authenticationManager.logout}
                />
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: clsx(
                            classes.drawerPaper,
                            !open && classes.drawerPaperClose,
                        ),
                    }}
                    open={open}
                >
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <MainListItems
                            onItemSelected={setSelectedItem}
                            selectedItem={selectedItem}
                        />
                    </List>
                    <Divider />
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <div className={classes.container}>
                        {renderSelectedTab()}
                    </div>
                </main>
            </div>
        </>
    );
}

export default observer(Dashboard);