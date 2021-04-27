import { Box, Button, makeStyles, Paper, Typography } from '@material-ui/core';
import { capitalizeFirstLetter } from '../../utils';
import React, { useState } from 'react';
import FormDialog from '../Dialogs/FormDialog';
import * as yup from 'yup';

const useStyles = makeStyles((theme) => ({
    descriptionDiv: {
        display: 'flex',
        flexDirection: 'column',
        background: '#121e23' /*theme.palette.grey[400]*/,
        height: '56%',
        minWidth: '30vw',
        overflowWrap: 'break-word',
        boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 20px 10px rgba(0,0,0,0.22)'
    },
    titleDiv: {
        display: 'flex',
        width: '100%',
        minHeight: 50,
        alignItems: 'center',
        background: '#14465f' /* theme.palette.primary.main*/,
    },
    title: {
        color: 'white',
        width: '100%',
    },
}));

const editButtonStyles = {
    fontSize: '25px',
    marginTop: '50px',
    backgroundColor: '#14465f',
    fontFamily: 'Tahoma',
    color: 'white'
}

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
                {rules.map((rule) => (
                    <li key={rule.id}>{rule.name}</li>
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
                        align="left"
                        variant="h5"
                    >
                        Description
                    </Typography>
                </Paper>

                {Object.entries(policy)
                    .slice(1, 4) // Skip The ID field and has 3 attributes
                    .map(([key, value]) => (
                        <div key={key}>
                            <Box borderBottom={0} fontSize={19} borderColor='#14465f'>
                                <b><font color="#8eacbb">Policy {capitalizeFirstLetter(key)}:</font></b>{' '}
                                <font color="white">{key === 'rules' ? makeRulesList(value) : value}</font>
                            </Box>
                        </div>
                    ))}
                <Button onClick={openEditDialog} style={editButtonStyles}>Edit</Button>
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
