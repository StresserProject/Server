import { makeStyles, MenuItem, TextField } from '@material-ui/core';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import ListTitle from '../List/ListTitle';
import VirtualList from '../List/VirtualList';
import ListRow from '../List/ListRow';
import EndpointDescription from './EndpointDescription';

const useStyles = makeStyles((theme) => ({
    endpointDiv: {
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
 * endpoints: import("./EndpointClasses/Endpoint").default[]
 * policies: import("../Policy/PolicyClasses/Policy").default[]
 * }} props
 */
function EndpointTab({ endpoints, policies }) {
    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = useState(0);

    function policyUpdateForm({ values, errors, handleChange }) {
        return (
            <TextField
                value={values.policyId}
                error={!!errors.policyId}
                helperText={errors.policyId}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                fullWidth
                select
                label="Policy"
                name="policyId"
            >
                {policies.map((policy) => (
                    <MenuItem value={policy.id}>{policy.name}</MenuItem>
                ))}
            </TextField>
        );
    }

    function getSelectedEndpoint() {
        const endpoint = endpoints[selectedIndex];
        const policyName = policies.find(
            (policy) => policy.id === endpoint.policyId,
        ).name;

        return {
            ...endpoint,
            policyName,
        };
    }

    return (
        <div className={classes.endpointDiv}>
            <div>
                <ListTitle
                    title="Endpoints"
                    isDeleteDisabled={endpoints.length === 0}
                />
                <VirtualList
                    selectedIndex={selectedIndex}
                    nodes={endpoints}
                    setSelectedIndex={setSelectedIndex}
                    RowComponent={ListRow}
                />
            </div>
            {endpoints.length > 0 && selectedIndex < endpoints.length && (
                <EndpointDescription
                    endpoint={getSelectedEndpoint()}
                    policyUpdateForm={policyUpdateForm}
                />
            )}
        </div>
    );
}

export default observer(EndpointTab);
