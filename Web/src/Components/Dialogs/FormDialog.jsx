import { Button, Dialog, makeStyles, Typography } from '@material-ui/core';
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
 * submitMessage: string,
 * dialogTitle: string
 * onSubmit: ({name: string, type: string, data: string}) => Promise<void>,
 * children: ({ values, errors, handleChange }) => React.ReactElement
 * initialValues: {[key: string]: string}
 * }} props
 */
function FormDialog({
    onSubmit,
    submitMessage = 'Submit',
    children,
    initialValues,
    dialogTitle,
    ...props
}) {
    const classes = useStyles();

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
                    {dialogTitle}
                </Typography>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    validateOnChange={false}
                    onSubmit={submitForm}
                >
                    {({ values, errors, handleChange, handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            {children({ values, errors, handleChange })}
                            <Button
                                className={classes.submitButton}
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                {submitMessage}
                            </Button>
                        </form>
                    )}
                </Formik>
            </div>
        </Dialog>
    );
}

export default FormDialog;
