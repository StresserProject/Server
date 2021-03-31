import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import CustomPieChart from './PieChart';

const useStyles = makeStyles(() => ({
    eventsDiv: {
        display: 'flex',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
    },
    headDiv: {
        display: 'flex',
        border: '1px solid black',
        width: '100%',
        height: '10vh',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    pieChartsDiv: {
        display: 'flex',
        width: '100%',
        height: '35vh',
    },
}));

/**
 *
 * @param {import("./EventsClasses/Event").default[]} events
 */
function getGroup(events) {
    const arr = [];

    for (const event of events) {
        if (arr.filter((obj) => obj.name === event.ip).length > 0) continue;

        const numberOfEvents = events.filter((obj) => event.ip === obj.ip)
            .length;
        arr.push({ name: event.ip, value: numberOfEvents });
    }
    return arr;
}

/**
 *
 * @param {{
 * events: import("./EventsClasses/Event").default[]
 * }} props
 */
function EventsTab({ events }) {
    const classes = useStyles();

    const groupByIp = getGroup(events);

    return (
        <div className={classes.eventsDiv}>
            <div className={classes.headDiv}>
                <Typography color="textPrimary" variant="h5">
                    Number of events: {events.length}
                </Typography>
                <Typography color="textPrimary" variant="h5">
                    Number of idk
                </Typography>
            </div>
            <div className={classes.pieChartsDiv}>
                <CustomPieChart
                    data={groupByIp}
                    labelKey="name"
                    dataKey="value"
                />
                <CustomPieChart
                    data={groupByIp}
                    labelKey="name"
                    dataKey="value"
                />
            </div>
            <div></div>
        </div>
    );
}

export default EventsTab;
