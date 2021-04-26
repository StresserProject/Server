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
        background: '#a4b9c3',
        minWidth: '30vw',
        height: '56%',
        overflowWrap: 'break-word',
        boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 20px 10px rgba(0,0,0,0.22)'
    },
    titleDiv: {
        display: 'flex',
        width: '100%',
        minHeight: 50,
        alignItems: 'center',
        background: '#14465f' /*theme.palette.primary.main*/,
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
                            <Box borderBottom={2} fontSize={19}>
                                <b>Rule {capitalizeFirstLetter(key)}:</b>{' '}
                                {value}
                            </Box>
                        </div>
                    ))}
                <Button onClick={openEditDialog} style={{ fontSize: '35px' }}>Edit</Button>
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
