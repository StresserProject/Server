import React, { useMemo, useState } from 'react';
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
    const [dateFilter, setDateFilter] = useState({
        year: '\\d+',
        month: '\\d+',
        day: '\\d+',
    });
    const [dateFactor, setDateFactor] = useState('year');

    const filteredEvents = useMemo(() => {
        let re = new RegExp(
            `${dateFilter.month}/${dateFilter.day}/${dateFilter.year}`,
            'g',
        );

        return events.filter(({ timeStamp }) =>
            timeStamp.toLocaleDateString('en-us').match(re),
        );
    }, [events, dateFilter]);

    const lastMonthEvents = events.filter((event) => {
        const currentTime = new Date();
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        return (
            event.timeStamp <= currentTime &&
            event.timeStamp >= lastMonth &&
            event
        );
    });

    const lastDayEvents = events.filter((event) => {
        const currentTime = new Date();
        const lastDay = new Date();
        lastDay.setDate(lastDay.getDate() - 1);

        return (
            event.timeStamp >= lastDay &&
            event.timeStamp <= currentTime &&
            event
        );
    });

    const groupByAttribute = (attribute) =>
        Object.values(
            filteredEvents.reduce((a, event) => {
                if (!a[event[attribute]])
                    a[event[attribute]] = { name: event[attribute], value: 1 };
                else a[event[attribute]].value++;

                return a;
            }, {}),
        );

    const groupByDate = Object.values(
        filteredEvents.reduce((a, { timeStamp }) => {
            let fullDate;
            let date;
            switch (dateFactor) {
                case 'year':
                    date = timeStamp.getFullYear();
                    fullDate = date;
                    break;
                case 'month':
                    date = timeStamp.getMonth() + 1;
                    fullDate = `${date}/${timeStamp.getFullYear()}`;
                    break;
                case 'day':
                    date = timeStamp.getDate();
                    fullDate = `${date}/${
                        timeStamp.getMonth() + 1
                    }/${timeStamp.getFullYear()}`;
                    break;
                default:
                    break;
            }
            if (!a[date])
                a[date] = Object.assign(
                    {},
                    {
                        date,
                        fullDate,
                        events: 1,
                    },
                );
            else a[date].events++;

            return a;
        }, {}),
    );

    const onRightClick = (event) => {
        event.preventDefault();

        if (dateFactor === 'year') return;

        setDateFactor((prev) => {
            if (prev === 'day') return 'month';
            if (prev === 'month') return 'year';
            return prev;
        });
        setDateFilter((prev) => {
            const newState = { ...prev };
            const newDateFactor = dateFactor === 'day' ? 'month' : 'year';
            newState[newDateFactor] = '\\d+';
            return newState;
        });
    };

    const onGraphClick = (data) => {
        if (dateFactor === 'day') return;

        setDateFilter((prev) => {
            const newState = { ...prev };
            newState[dateFactor] = data.date;
            return newState;
        });
        setDateFactor((prev) => {
            if (prev === 'year') return 'month';
            if (prev === 'month') return 'day';
            return prev;
        });
    };

    return (
        <div className={classes.eventsDiv}>
            <div className={classes.headDiv}>
                <Typography color="textPrimary" variant="h5">
                    Number of events: {events.length}
                </Typography>
                <Typography color="textPrimary" variant="h5">
                    Number of events in last month: {lastMonthEvents.length}
                </Typography>
                <Typography color="textPrimary" variant="h5">
                    Number of events in last 24 hours: {lastDayEvents.length}
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
            <div className={classes.barChartDiv} onContextMenu={onRightClick}>
                <ResponsiveContainer>
                    <BarChart data={groupByDate} barSize={80}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="fullDate" />
                        <YAxis />
                        <Tooltip cursor={false} />
                        <Bar
                            dataKey="events"
                            fill="#8884d8"
                            onClick={onGraphClick}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default EventsTab;
