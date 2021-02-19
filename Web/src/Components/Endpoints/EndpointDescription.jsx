import { Box, Button, makeStyles, Paper, Typography } from '@material-ui/core';
import { capitalizeFirstLetter } from '../../utils';
import React, { useState } from 'react';
import FormDialog from '../Dialogs/FormDialog';
import * as yup from 'yup';

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

/**
 *
 * @param {{
 * endpoint: import("./EndpointClasses/Endpoint").default
 * }} props
 */
export default function RuleDescription({ endpoint, endpointFormChildren }) {
    const classes = useStyles();
    const [isEditDialogOpen, setOpenEditDialog] = useState(false);

    function closeEditDialog() {
        setOpenEditDialog(false);
    }

    function openEditDialog() {
        setOpenEditDialog(true);
    }

    return (
        <>
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

                {Object.entries(endpoint)
                    .slice(2, 7) // Skip The ID field and has 5 attributes
                    .map(([key, value]) => (
                        <div key={key}>
                            <Box borderBottom={1} fontSize={17}>
                                <b>Endpoint {capitalizeFirstLetter(key)}:</b>{' '}
                                {value}
                            </Box>
                        </div>
                    ))}
                <Button onClick={openEditDialog}>Update Endpoint Policy</Button>
            </Paper>
            <FormDialog
                open={isEditDialogOpen}
                onClose={closeEditDialog}
                onSubmit={endpoint.updatePolicy}
                dialogTitle={'Edit Endpoint Policy'}
                submitMessage="Update"
                children={endpointFormChildren}
                initialValues={endpoint}
                validationSchema
            />
        </>
    );
}
