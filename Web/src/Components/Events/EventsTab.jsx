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
        backgroundColor: '#1c3d4c',
        color: '#8eacbb',
        width: '100%',
        height: '10vh',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: '50px'
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
    const [ipFilter, setIpFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');

    const filteredEvents = useMemo(() => {
        let dateRegex = new RegExp(
            `${dateFilter.month}/${dateFilter.day}/${dateFilter.year}`,
            'g',
        );

        return events.filter(
            ({ timeStamp, ip, type }) =>
                timeStamp.toLocaleDateString('en-us').match(dateRegex) &&
                (!ipFilter || ip === ipFilter) &&
                (!typeFilter || type === typeFilter),
        );
    }, [events, dateFilter, ipFilter, typeFilter]);

    const clearIpFilter = () => setIpFilter('');
    const clearTypeFilter = () => setTypeFilter('');

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
                    fullDate = `${date}/${timeStamp.getMonth() + 1
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
                <Typography variant="h5">
                    Number of events: {events.length}
                </Typography>
                <Typography variant="h5">
                    Number of events in last month: {lastMonthEvents.length}
                </Typography>
                <Typography variant="h5">
                    Number of events in last 24 hours: {lastDayEvents.length}
                </Typography>
            </div>
            <br />
            <div style={{ fontWeight: 'bold', backgroundColor: '#102027', borderRadius: '8px', boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 20px 15px rgba(0,0,0,0.22)" }}>
                <div className={classes.pieChartsDiv}>
                    <CustomPieChart
                        data={groupByAttribute('ip')}
                        labelKey="name"
                        dataKey="value"
                        onClick={setIpFilter}
                        onRightClick={clearIpFilter}
                    />
                    <CustomPieChart
                        data={groupByAttribute('type')}
                        labelKey="name"
                        dataKey="value"
                        onClick={setTypeFilter}
                        onRightClick={clearTypeFilter}
                    />
                </div>
                <div className={classes.barChartDiv} onContextMenu={onRightClick}>
                    <ResponsiveContainer>
                        <BarChart data={groupByDate} barSize={80}>
                            <CartesianGrid strokeDasharray="3 1" stroke="#009194" />
                            <XAxis dataKey="fullDate" />
                            <YAxis />
                            <Tooltip cursor={false} />
                            <Bar
                                dataKey="events"
                                fill="#8eacbb"
                                onClick={onGraphClick}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default EventsTab;
