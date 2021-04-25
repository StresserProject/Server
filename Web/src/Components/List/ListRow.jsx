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
                borderColor="black"
                fontWeight={isSelected ? 'fontWeightBold' : 'fontWeightRegular'}
                color={isSelected ? '#8a0053' : 'black'}
                borderColor={isSelected ? '#8a0053' : 'black'}
                fontSize={18}
            >
                <span>{node.name}</span>
            </Box>
        </Fade>
    );
}

export default observer(ListRow);
