import { IconButton, makeStyles, Paper, Typography } from '@material-ui/core';
import RemoveCircleRoundedIcon from '@material-ui/icons/RemoveCircleRounded';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    titleDiv: {
        display: 'flex',
        width: '100%',
        minHeight: 50,
        alignItems: 'center',
        background: '#14465f',
    },
    title: {
        color: 'white',
        width: '100%',
    },
}));

/**
 *
 * @param {{
 * openAddDialog?: () => void,
 * openDeleteDialog?: () => void,
 * isDeleteDisabled: boolean
 * title: string
 * }} props
 */
export default function ListTitle({
    openAddDialog,
    openDeleteDialog,
    isDeleteDisabled,
    title,
}) {
    const classes = useStyles();

    return (
        <Paper className={classes.titleDiv}>
            <div style={{ position: 'absolute' }}>
                {openAddDialog && (
                    <IconButton onClick={openAddDialog}>
                        <AddCircleRoundedIcon />
                    </IconButton>
                )}
                {openDeleteDialog && (
                    <IconButton
                        disabled={isDeleteDisabled}
                        onClick={openDeleteDialog}
                    >
                        <RemoveCircleRoundedIcon />
                    </IconButton>
                )}
            </div>
            <Typography className={classes.title} align="center" variant="h5">
                {title}
            </Typography>
        </Paper>
    );
}
