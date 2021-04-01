import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import CustomPieChart from './PieChart';
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

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
    barChartDiv: {
        display: 'flex',
        width: '100%',
        height: '35vh',
    },
}));

/**
 *
 * @param {{
 * events: import("./EventsClasses/Event").default[]
 * }} props
 */
function EventsTab({ events }) {
    const classes = useStyles();

    const groupByAttribute = (attribute) =>
        Object.values(
            events.reduce((a, event) => {
                if (!a[event[attribute]])
                    a[event[attribute]] = { name: event[attribute], value: 1 };
                else a[event[attribute]].value++;

                return a;
            }, {}),
        );
    const groupByDate = Object.values(
        events.reduce((a, { timeStamp }) => {
            const date = `${
                timeStamp.getUTCMonth() + 1
            }/${timeStamp.getFullYear()}`;
            if (!a[date])
                a[date] = Object.assign(
                    {},
                    {
                        date: timeStamp.toLocaleDateString('en-us', {
                            month: 'long',
                        }),
                        events: 1,
                    },
                );
            else a[date].events++;

            return a;
        }, {}),
    );

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
                    data={groupByAttribute('ip')}
                    labelKey="name"
                    dataKey="value"
                />
                <CustomPieChart
                    data={groupByAttribute('type')}
                    labelKey="name"
                    dataKey="value"
                />
            </div>
            <div className={classes.barChartDiv}>
                <ResponsiveContainer>
                    <BarChart data={groupByDate}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Bar
                            maxBarSize={80}
                            dataKey="events"
                            fill="#8884d8"
                            onClick={(data, index) =>
                                console.log('Data: ', data, ' Index: ', index)
                            }
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default EventsTab;
