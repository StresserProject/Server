import { makeStyles, TextField, Tooltip, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import ListTitle from '../List/ListTitle';
import VirtualList from '../List/VirtualList';
import * as yup from 'yup';
import ListRow from '../List/ListRow';
import DeleteDialog from '../Dialogs/DeleteDialog';
import FormDialog from '../Dialogs/FormDialog';
import PolicyDescription from './PolicyDescription';

const useStyles = makeStyles((theme) => ({
    policiesDiv: {
        //background: "linear-gradient(45deg, #17004c 30%, #171027 90%)",
        display: 'flex',
        width: '75%',
        height: '100%',
        justifyContent: 'space-around',
        paddingTop: 70,
        marginLeft: 70
    },
}));

/**
 *
 * @param {{
 * policies: import("./PolicyClasses/Policy").default[],
 * rules: import("../Rules/RulesClasses/Rule").default[],
 * deletePolicyFromList: (string) => Promise<void>,
 * addPolicyToList: ({name: string, rules: rules}) => Promise<Boolean>,
 *
 * }} props
 */
function PolicyTab({ policies, deletePolicyFromList, addPolicyToList, rules }) {
    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [addDialog, setAddDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);

    const initialValues = {
        name: '',
        rules: [],
    };

    const validationSchema = yup.object({
        name: yup.string().required('Required'),
        rules: yup.array().min(1, 'You need to choose at least 1 rule'),
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

    async function addPolicy(values) {
        if (await addPolicyToList(values)) {
            setSelectedIndex(policies.length - 1);
            return true;
        }
        return false;
    }

    function policyFormChildren({
        values,
        errors,
        handleChange,
        setFieldValue,
    }) {
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
                <Autocomplete
                    multiple
                    value={values.rules}
                    name={'rules'}
                    onChange={(event, value) => setFieldValue('rules', value)}
                    options={rules}
                    getOptionLabel={(option) => option.name}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            fullWidth
                            error={!!errors.rules}
                            helperText={errors.rules}
                            variant="standard"
                            label="Rules"
                            placeholder="choose rules.."
                        />
                    )}
                    renderOption={(option, state) => (
                        <Tooltip
                            title={
                                <span>
                                    <p>Type: {option.type}</p>
                                    <p>Data: {option.data}</p>
                                </span>
                            }
                        >
                            <Typography
                                align="center"
                                style={{ width: '100%' }}
                            >
                                {option.name}
                            </Typography>
                        </Tooltip>
                    )}
                />
            </>
        );
    }

    function getSelectedPolicy() {
        const policy = policies[selectedIndex];
        const rulesIds = Array.from(policy.rules.values());
        const newRules = rules
            .filter((rule) => rulesIds.includes(rule.id))
            .map((rule) => rule);
        return {
            ...policy,
            rules: newRules,
        };
    }

    return (
        <div className={classes.policiesDiv}>
            <div>
                <ListTitle
                    title="Policies"
                    isDeleteDisabled={policies.length === 0}
                    openAddDialog={openAddDialog}
                    openDeleteDialog={openDeleteDialog}
                />
                <VirtualList
                    selectedIndex={selectedIndex}
                    nodes={policies}
                    setSelectedIndex={setSelectedIndex}
                    RowComponent={ListRow}
                />
                {
                    policies.length > 0 && selectedIndex < policies.length && (
                        <PolicyDescription
                            policy={getSelectedPolicy()}
                            policyFormChildren={policyFormChildren}
                        />
                    )
                }
            </div>
            <DeleteDialog
                type="Policy"
                open={deleteDialog}
                onClose={closeDeleteDialog}
                onSubmit={async () => {
                    await deletePolicyFromList(selectedIndex);
                    selectedIndex === policies.length &&
                        setSelectedIndex((prev) => prev - 1);
                }}
            />
            <FormDialog
                open={addDialog}
                onClose={closeAddDialog}
                onSubmit={addPolicy}
                dialogTitle={'Add Policy'}
                children={policyFormChildren}
                initialValues={initialValues}
                validationSchema={validationSchema}
            />
        </div>

    );
}

export default observer(PolicyTab);
