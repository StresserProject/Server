import { makeStyles, MenuItem, TextField } from '@material-ui/core';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import FormDialog from '../Dialogs/FormDialog';
import DeleteDialog from '../Dialogs/DeleteDialog';
import ListTitle from './ListTitle';
import RuleDescription from './RuleDescription';
import { capitalizeFirstLetter } from '../../utils';
import VirtualList from '../VirtualList';
import RuleRow from './RuleRow';
import * as yup from 'yup';

const useStyles = makeStyles((theme) => ({
    rulesDiv: {
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'space-around',
        paddingTop: 30,
    },
}));

const RULES_TYPES = {
    PROCESS: 'Process',
    REGISTRY: 'Registry',
    FILE: 'File',
};

export function rulesFormChildren({ values, errors, handleChange }) {
    return (
        <>
            <TextField
                value={values.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                variant="outlined"
                margin="normal"
                fullWidth
                label={'Name'}
                name={'name'}
            />
            <TextField
                value={values.type}
                error={!!errors.name}
                helperText={errors.type}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                fullWidth
                select
                label="Type"
                name="type"
            >
                {Object.values(RULES_TYPES).map((value) => (
                    <MenuItem value={value}>
                        {capitalizeFirstLetter(value)}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                value={values.data}
                onChange={handleChange}
                error={!!errors.data}
                helperText={errors.data}
                variant="outlined"
                margin="normal"
                fullWidth
                label={'Data'}
                name={'data'}
            />
        </>
    );
}

/**
 *
 * @param {{
 * rules: import("./Rule").default[]
 * deleteRuleFromList: (string) => Promise<void>
 * addRuleToList: ({name: string, type: string, data: string}) => Promise<Boolean>
 * }} props
 */
function RuleList({ rules, deleteRuleFromList, addRuleToList }) {
    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [addDialog, setAddDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);

    const initialValues = {
        name: '',
        type: '',
        data: '',
    };

    const validationSchema = yup.object({
        name: yup.string().required('Required'),
        type: yup.string().required('Required'),
        data: yup.string().required('Required'),
    });

    function closeAddDialog() {
        setAddDialog(false);
    }

    function openAddDialog() {
        setAddDialog(true);
    }

    function closeDeleteDialog() {
        setDeleteDialog(false);
    }

    function openDeleteDialog() {
        setDeleteDialog(true);
    }

    async function addRule(values) {
        if (await addRuleToList(values)) {
            setSelectedIndex(rules.length - 1);
            return true;
        }
        return false;
    }

    return (
        <div className={classes.rulesDiv}>
            <div>
                <ListTitle
                    isDeleteDisabled={rules.length === 0}
                    openAddDialog={openAddDialog}
                    openDeleteDialog={openDeleteDialog}
                />
                <VirtualList
                    selectedIndex={selectedIndex}
                    nodes={rules}
                    setSelectedIndex={setSelectedIndex}
                    RowComponent={RuleRow}
                />
            </div>
            {rules.length > 0 && selectedIndex < rules.length && (
                <RuleDescription rule={rules[selectedIndex]} />
            )}
            <DeleteDialog
                type={'Rule'}
                open={deleteDialog}
                onClose={closeDeleteDialog}
                onSubmit={async () => {
                    await deleteRuleFromList(selectedIndex);
                    selectedIndex === rules.length &&
                        setSelectedIndex((prev) => prev - 1);
                }}
            />
            <FormDialog
                open={addDialog}
                onClose={closeAddDialog}
                onSubmit={addRule}
                dialogTitle={'Add Rule'}
                children={rulesFormChildren}
                initialValues={initialValues}
                validationSchema={validationSchema}
            />
        </div>
    );
}

export default observer(RuleList);
