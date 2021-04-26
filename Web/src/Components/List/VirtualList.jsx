import { makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import { AutoSizer, List } from 'react-virtualized';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import PolicyDescription from '../Policy/PolicyDescription'

const useStyles = makeStyles((theme) => ({
    listDiv: {
        display: 'flex',
        background: '#90a4ae',
        flexDirection: 'column',
        height: '50%',
        width: '25%',
        minWidth: '25vw',
        boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 20px 10px rgba(0,0,0,0.22)'
    },
    virtualList: {
        outline: 'none',
    },
}));

/**
 *
 * @param {{
 * selectedIndex: number,
 * nodes: [],
 * setSelectedIndex: (number) => void
 * RowComponent: React.Component
 * }} props
 */
export default function VirtualList({
    selectedIndex,
    nodes,
    setSelectedIndex,
    RowComponent,
}) {
    const classes = useStyles();

    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`scrollable-auto-tabpanel-${index}`}
                aria-labelledby={`scrollable-auto-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box p={3}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.any.isRequired,
        value: PropTypes.any.isRequired,
    };

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <div className={classes.root} style={{ maxWidth: "800px"}}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="#8eacbb"
                    variant="scrollable"
                    scrollButtons="auto"s
                    aria-label="scrollable auto tabs example"
                    style={{background: '#102027', color: '#8eacbb'}}

                >
                    {nodes.map((n, i) =>
                        <Tab label={n.name} onClick={() => setSelectedIndex(i)} />)}
                </Tabs>
            </AppBar>

        </div>
    );
}
