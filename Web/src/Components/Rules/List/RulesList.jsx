import { Box, Fade, makeStyles, Paper } from '@material-ui/core';
import { observer, Observer } from 'mobx-react';
import React from 'react';
import { AutoSizer, List } from 'react-virtualized';

const useStyles = makeStyles((theme) => ({
    listDiv: {
        display: 'flex',
        background: theme.palette.grey[400],
        flexDirection: 'column',
        height: 500,
        width: '25%',
        minWidth: '25vw',
    },
    virtualList: {
        outline: 'none',
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

/**
 *
 * @param {{
 * selectedIndex: number,
 * rules: import("./Rule").default[],
 * setSelectedIndex: (number) => void
 * }} props
 */
export default function RulesList({ selectedIndex, rules, setSelectedIndex }) {
    const classes = useStyles();

    return (
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
                                        isSelected={selectedIndex === obj.index}
                                    />
                                )}
                            />
                        )}
                    </Observer>
                )}
            </AutoSizer>
        </Paper>
    );
}
