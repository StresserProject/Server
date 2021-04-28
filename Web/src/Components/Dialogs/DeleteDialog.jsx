import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

/**
 *
 * @param {import('@material-ui/core/Dialog').DialogProps &{
 * type: string,
 * }} props
 */
export default function DeleteDialog({ type, ...props }) {
    function submit() {
        props.onSubmit();
        props.onClose();
    }

    return (
        <Dialog
            {...props}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle style={{ backgroundColor: '#102027', color: '#009194' }} id="alert-dialog-title">{`${type} Delete`}</DialogTitle>
            <DialogContent style={{ backgroundColor: '#102027' }}>
                <DialogContentText id="alert-dialog-description" style={{ color: 'white' }}>
                    Are you sure you want to delete this {type}?
                </DialogContentText>
            </DialogContent>
            <DialogActions style={{ backgroundColor: '#102027' }}>
                <Button onClick={props.onClose} style={{ backgroundColor: '#14465f' }}>
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={submit}
                    color="primary"
                    autoFocus
                    style={{ backgroundColor: '#14465f' }}
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}
