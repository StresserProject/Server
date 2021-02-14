import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import crypto from 'crypto';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp() {
    const classes = useStyles();
    const history = useHistory();

    const initialValues = {
        username: '',
        password: '',
    };

    const validationSchema = yup.object({
        username: yup.string().required('Required'),
        password: yup.string().required('Required'),
    });

    /**
     *
     * @param {{username: string, password: string}} values
     * @param {import('formik').FormikHelpers} formikHelpers
     */
    function onSubmit(values, formikHelpers) {
        const hashedPassword = crypto
            .createHash('SHA256')
            .update(values.password)
            .digest('hex');

        const signupInfo = { ...values, password: hashedPassword };

        console.log(signupInfo);

        axios
            .post(`/user`, signupInfo)
            .then((response) => {
                if (response.data === 'Username already taken')
                    formikHelpers.setFieldError('username', response.data);

                alert('User has been created succssfuly!');
                history.push('/signin');
            })
            .catch((error) => console.log(error));
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Formik
                    onSubmit={onSubmit}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    validateOnChange={false}
                >
                    {({ values, errors, handleChange, handleSubmit }) => (
                        <form className={classes.form} onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        value={values.username}
                                        onChange={handleChange}
                                        error={!!errors.username}
                                        helperText={errors.username}
                                        variant="outlined"
                                        fullWidth
                                        id="email"
                                        label="Username"
                                        name="username"
                                        autoComplete="username"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        value={values.password}
                                        error={!!errors.password}
                                        helperText={errors.password}
                                        onChange={handleChange}
                                        variant="outlined"
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign Up
                            </Button>
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Link href="/signin" variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    )}
                </Formik>
            </div>
        </Container>
    );
}
