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


    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`vertical-tabpanel-${index}`}
                aria-labelledby={`vertical-tab-${index}`}
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
        value: PropTypes.any.isRequired
    };

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.paper,
            display: "flex",
            height: '382px',

        },
        tabs: {
            borderRight: `1px solid ${theme.palette.divider}`,

        },
        indicator: {
            left: "0px",
            backgroundColor: 'white'
        }
    }));

    const classes = useStyles();

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <div className={classes.root}>
            <AppBar position="static" color="default" style={{ backgroundColor: '#102027' }}>
                <Tabs
                    value={value}
                    orientation="vertical"
                    onChange={handleChange}
                    classes={{ indicator: classes.indicator }}
                    textColor="#8eacbb"
                    variant="scrollable"
                    scrollButtons="auto" s
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                    style={{ background: '#102027', color: '#8eacbb' }}
                >
                    {nodes.map((n, i) =>
                        <Tab label={n.name} onClick={() => setSelectedIndex(i)} />)}
                </Tabs>
            </AppBar>

        </div >
    );
}
