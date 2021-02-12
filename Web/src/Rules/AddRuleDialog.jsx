import {
    Button,
    Dialog,
    makeStyles,
    TextField,
    Typography,
} from '@material-ui/core';
import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';

const useStyles = makeStyles((theme) => ({
    dialog: {
        padding: 15,
    },
    submitButton: {
        marginTop: 16,
    },
}));

/**
 *
 * @param {import("@material-ui/core/Dialog").DialogProps & {
 * onSubmit: ({name: string, type: string, data: string}) => Promise<void>
 * }} props
 */
function AddRuleDialog({ onSubmit, ...props }) {
    const classes = useStyles();

    const initialValues = {
        name: '',
        type: '',
        data: '',
    };

    const validationSchema = yup.object({
        name: yup.string().required('Required'),
        type: yup.string().required('Required'),
        data: yup.string().required('Required'),
    });

    /**
     *
     * @param {{name: string, type: string, data: string}} values
     * @param {import('formik').FormikHelpers} formikHelpers
     */
    async function submitForm(values, formikHelpers) {
        const result = await onSubmit(values);
        if (result) {
            props.onClose();
        } else {
            alert('ERORR');
        }
    }

    return (
        <Dialog {...props}>
            <div className={classes.dialog}>
                <Typography align="center" variant="h4">
                    Add Rule
                </Typography>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={submitForm}
                >
                    {({ values, errors, handleChange, handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                value={values.name}
                                onChange={handleChange}
                                error={!!errors.name}
                                helperText={errors.name}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="name"
                                label="Name"
                                name="name"
                                autoFocus
                            />
                            <TextField
                                value={values.type}
                                error={!!errors.type}
                                helperText={errors.type}
                                onChange={handleChange}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                name="type"
                                label="Type"
                                id="type"
                            />
                            <TextField
                                value={values.data}
                                error={!!errors.data}
                                helperText={errors.data}
                                onChange={handleChange}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                name="data"
                                label="Data"
                                id="data"
                            />
                            {/* {isInvalidCredentials ? (
                            <Typography color="error">User</Typography>
                        ) : null} */}
                            <Button
                                className={classes.submitButton}
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                Submit
                            </Button>
                        </form>
                    )}
                </Formik>
            </div>
        </Dialog>
    );
}

export default AddRuleDialog;
