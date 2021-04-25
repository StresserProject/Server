import { Box, Button, makeStyles, Paper, Typography } from '@material-ui/core';
import { capitalizeFirstLetter } from '../../utils';
import { rulesFormChildren } from './RulesTab';
import React, { useState } from 'react';
import FormDialog from '../Dialogs/FormDialog';
import * as yup from 'yup';

const useStyles = makeStyles((theme) => ({
    descriptionDiv: {
        display: 'flex',
        flexDirection: 'column',
        background: theme.palette.grey[400],
        width: '45%',
        minWidth: '35vw',
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
 * rule: import("./RulesClasses/Rule").default
 * }} props
 */
export default function RuleDescription({ rule }) {
    const classes = useStyles();
    const [isEditDialogOpen, setOpenEditDialog] = useState(false);

    function closeEditDialog() {
        setOpenEditDialog(false);
    }

    function openEditDialog() {
        setOpenEditDialog(true);
    }

    const validationSchema = yup.object({
        name: yup.string().required('Required'),
        type: yup.string().required('Required'),
        data: yup.string().required('Required'),
    });

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

                {Object.entries(rule)
                    .slice(1, 4) // Skip The ID field and has 3 attributes
                    .map(([key, value]) => (
                        <div key={key}>
                            <Box borderBottom={1} fontSize={17}>
                                <b>Rule {capitalizeFirstLetter(key)}:</b>{' '}
                                {value}
                            </Box>
                        </div>
                    ))}
                <Button onClick={openEditDialog}>Edit</Button>
            </Paper>
            <FormDialog
                open={isEditDialogOpen}
                onClose={closeEditDialog}
                onSubmit={rule.updateRule}
                dialogTitle={'Edit Rule'}
                submitMessage="Update"
                children={rulesFormChildren}
                initialValues={rule}
                validationSchema={validationSchema}
            />
        </>
    );
}
