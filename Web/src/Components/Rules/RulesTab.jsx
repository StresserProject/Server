import { makeStyles } from '@material-ui/core';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import AddRuleDailog from '../Dialogs/AddRuleDialog';
import DeleteDialog from '../Dialogs/DeleteDialog';
import ListTitle from './List/ListTitle';
import RuleDescription from './RuleDescription';
import RulesList from './List/RulesList';

const useStyles = makeStyles((theme) => ({
    rulesDiv: {
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'space-around',
        paddingTop: 30,
    },
}));

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
                <RulesList
                    selectedIndex={selectedIndex}
                    rules={rules}
                    setSelectedIndex={setSelectedIndex}
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
            <AddRuleDailog
                open={addDialog}
                onClose={closeAddDialog}
                onSubmit={addRule}
            />
        </div>
    );
}

export default observer(RuleList);
