import { makeStyles, Paper } from '@material-ui/core';
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
}));

/**
 *
 * @param {{
 * selectedIndex: number,
 * nodes: [],
 * setSelectedIndex: (number) => void
 * RowComponent: React.Component
 * }} props
 */
export default function VirtualList({
    selectedIndex,
    nodes,
    setSelectedIndex,
    RowComponent,
}) {
    const classes = useStyles();

    return (
        <Paper className={classes.listDiv} elevation={3}>
            <AutoSizer>
                {({ width, height }) => (
                    <List
                        className={classes.virtualList}
                        scrollToIndex={selectedIndex}
                        rowCount={nodes.length}
                        height={height}
                        width={width}
                        rowHeight={50}
                        rowRenderer={(obj) => (
                            <RowComponent
                                {...obj}
                                node={nodes[obj.index]}
                                onClick={() => setSelectedIndex(obj.index)}
                                isSelected={selectedIndex === obj.index}
                            />
                        )}
                    />
                )}
            </AutoSizer>
        </Paper>
    );
}
