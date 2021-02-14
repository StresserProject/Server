import { Box, Button, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    descriptionDiv: {
        display: 'flex',
        flexDirection: 'column',
        background: theme.palette.grey[400],
        width: '25%',
        minWidth: '25vw',
        height: 'fit-content',
        overflowWrap: 'break-word',
    },
    titleDiv: {
        display: 'flex',
        width: '100%',
        minHeight: 50,
        alignItems: 'center',
        background: theme.palette.primary.main,
    },
    title: {
        color: 'white',
        width: '100%',
    },
}));

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 *
 * @param {{
 * rule: import("./Rule").default
 * }} props
 */
export default function RuleDescription({ rule }) {
    const classes = useStyles();

    return (
        <Paper className={classes.descriptionDiv} elevation={3}>
            <Paper className={classes.titleDiv}>
                <Typography
                    className={classes.title}
                    align="center"
                    variant="h5"
                >
                    Description
                </Typography>
            </Paper>
            {Object.entries(rule)
                .slice(1) // Skip The ID field
                .map(([key, value]) => (
                    <div key={key}>
                        <Box borderBottom={1} fontSize={17}>
                            <b>Rule {capitalizeFirstLetter(key)}:</b> {value}
                        </Box>
                    </div>
                ))}
            <Button>Edit</Button>
        </Paper>
    );
}
