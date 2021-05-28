import { Box, Fade, makeStyles } from '@material-ui/core';
import { observer } from 'mobx-react';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    listRow: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        overflowWrap: 'break-word',
    },
}));
function ListRow({ node, style, onClick, isSelected }) {
    const classes = useStyles();

    return (
        <Fade
            style={style}
            className={classes.listRow}
            onClick={onClick}
            in={true}
        >
            <Box
                borderBottom={1}
                fontWeight={isSelected ? 'fontWeightBold' : 'fontWeightRegular'}
                color={isSelected ? '#37474f' : '#62757f'}
                borderColor={isSelected ? '#37474f' : '#62757f'}
                fontSize={18}
                boxShadow={2}
            >
                <span>{node.name}</span>
            </Box>
        </Fade>
    );
}

export default observer(ListRow);
