import React, { useEffect, useRef, useState } from 'react';
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
import PolicyTab from '../Policy/PolicyTab';
import EndpointTab from '../Endpoints/EndpointTab';
import EventsTab from '../Events/EventsTab';
import DataAccessManager from '../../utils/DataAccsessManager';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    drawerPaper: {
        position: 'relative',
        backgroundColor: '#102027',
        color: '#8eacbb',
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
        background: "linear-gradient(45deg, #607d8b 30%, #34515e 85%)",
        paddingLeft: theme.spacing(4),
        paddingTop: theme.spacing(4),
        paddingRight: theme.spacing(4),
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
    const [selectedItem, setSelectedItem] = useState(LIST_ITEMS.ENDPOINTS);

    /**
     * @type {React.MutableRefObject<DataAccessManager}
     */
    const dataAccessManager = useRef(new DataAccessManager());

    useEffect(() => {
        return () => dataAccessManager.current.destructor();
    }, []);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    function renderSelectedTab() {
        switch (selectedItem) {
            case LIST_ITEMS.DASHBOARD:
                return 'null';
            case LIST_ITEMS.ENDPOINTS:
                return (
                    <EndpointTab
                        endpoints={
                            dataAccessManager.current.dbEndpoints.endpoints
                        }
                        policies={dataAccessManager.current.dbPolicies.policies}
                    />
                );
            case LIST_ITEMS.EVENTS:
                return (
                    <EventsTab
                        events={dataAccessManager.current.dbEvents.events}
                    ></EventsTab>
                );
            case LIST_ITEMS.POLICY:
                return (
                    <PolicyTab
                        policies={dataAccessManager.current.dbPolicies.policies}
                        rules={dataAccessManager.current.dbRules.rules}
                        deletePolicyFromList={
                            dataAccessManager.current.dbPolicies.deletePolicy
                        }
                        addPolicyToList={
                            dataAccessManager.current.dbPolicies.addPolicy
                        }
                    />
                );
            case LIST_ITEMS.RULES:
                return (
                    <RulesTab
                        rules={dataAccessManager.current.dbRules.rules}
                        deleteRuleFromList={
                            dataAccessManager.current.dbRules.deleteRule
                        }
                        addRuleToList={
                            dataAccessManager.current.dbRules.addRule
                        }
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
                        <IconButton onClick={toggleDrawer} style={{ color: '#009194' }}>
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
