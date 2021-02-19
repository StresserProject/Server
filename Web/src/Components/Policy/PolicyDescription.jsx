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
 * policy: import("./PolicyClasses/Policy").default
 * }} props
 */
export default function RuleDescription({ policy, policyFormChildren }) {
    const classes = useStyles();
    const [isEditDialogOpen, setOpenEditDialog] = useState(false);

    function closeEditDialog() {
        setOpenEditDialog(false);
    }

    function openEditDialog() {
        setOpenEditDialog(true);
    }

    function makeRulesList(rules) {
        return (
            <ul>
                {rules.map((ruleName) => (
                    <li>ruleName</li>
                ))}
            </ul>
        );
    }

    const validationSchema = yup.object({
        name: yup.string().required('Required'),
        rules: yup.array().min(1, 'You need to choose at least 1 rule'),
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

                {Object.entries(policy)
                    .slice(1, 4) // Skip The ID field and has 3 attributes
                    .map(([key, value]) => (
                        <div key={key}>
                            <Box borderBottom={1} fontSize={17}>
                                <b>Policy {capitalizeFirstLetter(key)}:</b>{' '}
                                {key === 'rules' ? makeRulesList(value) : value}
                            </Box>
                        </div>
                    ))}
                <Button onClick={openEditDialog}>Edit</Button>
            </Paper>
            <FormDialog
                open={isEditDialogOpen}
                onClose={closeEditDialog}
                onSubmit={policy.updatePolicy}
                dialogTitle={'Edit Policy'}
                submitMessage="Update"
                children={policyFormChildren}
                initialValues={policy}
                validationSchema={validationSchema}
            />
        </>
    );
}
