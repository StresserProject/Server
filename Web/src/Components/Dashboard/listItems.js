import * as React from 'react';
import EndpointsIcon from '@material-ui/icons/Computer';
import PolicyIcon from '@material-ui/icons/Policy';
import EventsIcon from '@material-ui/icons/Event';
import RulesIcon from '@material-ui/icons/Gavel';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssignmentIcon from '@material-ui/icons/Assignment';

export const LIST_ITEMS = {
    //DASHBOARD: 'Dashboard',
    ENDPOINTS: 'Endpoints',
    POLICY: 'Policy',
    RULES: 'Rules',
    EVENTS: 'Events',
};

const ICONS = {
    //Dashboard: DashboardIcon,
    Endpoints: EndpointsIcon,
    Policy: PolicyIcon,
    Rules: RulesIcon,
    Events: EventsIcon,
};

/**
 *
 * @param {{
 * onItemSelected: (string) => void
 * selectedItem: ("Dashboard" | "Endpoints" | "Policy" | "Rules" | "Events")
 * }} props
 */
export function MainListItems({ onItemSelected, selectedItem }) {
    return (
        <div>
            {Object.values(LIST_ITEMS).map((value) => (
                <ListItem
                    key={value}
                    button
                    onClick={() => onItemSelected(value)}
                    selected={value === selectedItem}
                >
                    <ListItemIcon style={{color: '#009194'}}>
                        {React.createElement(ICONS[value], {})}
                    </ListItemIcon>
                    <ListItemText primary={value} />
                </ListItem>
            ))}
        </div>
    );
}

export const secondaryListItems = (
    <div>
        <ListSubheader inset>Saved reports</ListSubheader>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Current month" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Last quarter" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Year-end sale" />
        </ListItem>
    </div>
);
