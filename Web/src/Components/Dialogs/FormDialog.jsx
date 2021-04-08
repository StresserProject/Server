import { Button, Dialog, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { Formik } from 'formik';

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
 * validationSchema?: yup.AnyObjectSchema,
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
    validationSchema,
    dialogTitle,
    ...props
}) {
    const classes = useStyles();

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
                    {({
                        values,
                        errors,
                        handleChange,
                        handleSubmit,
                        setFieldValue,
                    }) => (
                        <form onSubmit={handleSubmit}>
                            {children({
                                values,
                                errors,
                                handleChange,
                                setFieldValue,
                            })}
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
