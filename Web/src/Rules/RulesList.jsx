import RemoveCircleRoundedIcon from '@material-ui/icons/RemoveCircleRounded';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import {
    Box,
    Button,
    Fade,
    IconButton,
    makeStyles,
    Paper,
    Typography,
} from '@material-ui/core';
import { AutoSizer, List } from 'react-virtualized';
import { Observer, observer } from 'mobx-react';
import { useState } from 'react';
import AddRuleDailog from './AddRuleDialog';
import DeleteDialog from './DeleteDialog';

const useStyles = makeStyles((theme) => ({
    rulesDiv: {
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'space-around',
        paddingTop: 30,
    },
    listDiv: {
        display: 'flex',
        background: theme.palette.grey[400],
        flexDirection: 'column',
        height: 500,
        width: '25%',
        minWidth: '25vw',
    },
    descriptionDiv: {
        display: 'flex',
        flexDirection: 'column',
        background: theme.palette.grey[400],
        width: '25%',
        minWidth: '25vw',
        height: 'fit-content',
        overflowWrap: 'break-word',
    },
    virtualList: {
        outline: 'none',
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
    ruleRow: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        overflowWrap: 'break-word',
    },
}));

const RuleRow = observer(({ rule, style, onClick, isSelected, className }) => {
    return (
        <Fade style={style} className={className} onClick={onClick} in={true}>
            <Box
                borderBottom={1}
                borderColor="black"
                fontWeight={isSelected ? 'fontWeightBold' : 'fontWeightRegular'}
                fontSize={25}
            >
                <span>{rule.name}</span>
            </Box>
        </Fade>
    );
});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
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

    function closeAddDialog() {
        setAddDialog(false);
    }

    function openAddDialog() {
        setAddDialog(true);
    }

    function closeDeleteDialog() {
        setDeleteDialog(false);
    }

    function openDelelteDialog() {
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
                <Paper className={classes.titleDiv}>
                    <div style={{ position: 'absolute' }}>
                        <IconButton onClick={openAddDialog}>
                            <AddCircleRoundedIcon />
                        </IconButton>
                        <IconButton
                            disabled={rules.length === 0}
                            onClick={openDelelteDialog}
                        >
                            <RemoveCircleRoundedIcon />
                        </IconButton>
                    </div>
                    <Typography
                        className={classes.title}
                        align="center"
                        variant="h5"
                    >
                        Rules
                    </Typography>
                </Paper>
                <Paper className={classes.listDiv} elevation={3}>
                    <AutoSizer>
                        {({ width, height }) => (
                            <Observer>
                                {() => (
                                    <List
                                        className={classes.virtualList}
                                        scrollToIndex={selectedIndex}
                                        rowCount={rules.length}
                                        height={height}
                                        width={width}
                                        rowHeight={50}
                                        rowRenderer={(obj) => (
                                            <RuleRow
                                                {...obj}
                                                className={classes.ruleRow}
                                                rule={rules[obj.index]}
                                                onClick={() =>
                                                    setSelectedIndex(obj.index)
                                                }
                                                isSelected={
                                                    selectedIndex === obj.index
                                                }
                                            />
                                        )}
                                    />
                                )}
                            </Observer>
                        )}
                    </AutoSizer>
                </Paper>
            </div>
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
                {rules.length > 0 &&
                    selectedIndex < rules.length &&
                    Object.entries(rules[selectedIndex])
                        .slice(1) // Skip The ID field
                        .map(([key, value]) => (
                            <div key={key}>
                                <Box borderBottom={1} fontSize={17}>
                                    <b>Rule {capitalizeFirstLetter(key)}:</b>{' '}
                                    {value}
                                </Box>
                            </div>
                        ))}
                <Button>Edit</Button>
            </Paper>
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
