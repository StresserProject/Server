import { Box, Fade, makeStyles } from '@material-ui/core';
import { observer } from 'mobx-react';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    ruleRow: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        overflowWrap: 'break-word',
    },
}));
function RuleRow({ node, style, onClick, isSelected }) {
    const classes = useStyles();

    return (
        <Fade
            style={style}
            className={classes.ruleRow}
            onClick={onClick}
            in={true}
        >
            <Box
                borderBottom={1}
                borderColor="black"
                fontWeight={isSelected ? 'fontWeightBold' : 'fontWeightRegular'}
                fontSize={25}
            >
                <span>{node.name}</span>
            </Box>
        </Fade>
    );
}

export default observer(RuleRow);
