import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Formik } from 'formik';
import * as yup from 'yup';
import crypto from 'crypto';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';

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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function SignIn({ login }) {
    const classes = useStyles();
    const history = useHistory();
    const [isInvalidCredentials, setIsInvalidCredentials] = useState(false);

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

        const loginInfo = { ...values, password: hashedPassword };

        axios
            .post('/user/login', loginInfo)
            .then((response) => {
                login(response.data);
                history.push('/');
            })
            .catch((error) => {
                console.log(error);
                setIsInvalidCredentials(true);
            });
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                    validateOnChange={false}
                    validateOnBlur={true}
                >
                    {({ values, errors, handleChange, handleSubmit }) => (
                        <form className={classes.form} onSubmit={handleSubmit}>
                            <TextField
                                value={values.username}
                                onChange={handleChange}
                                error={!!errors.username}
                                helperText={errors.username}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                            />
                            <TextField
                                value={values.password}
                                error={!!errors.password}
                                helperText={errors.password}
                                onChange={handleChange}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            {/* <FormControlLabel
                                    control={
                                        <Checkbox
                                            value="remember"
                                            color="primary"
                                        />
                                    }
                                    label="Remember me"
                                /> */}
                            {isInvalidCredentials ? (
                                <Typography color="error">
                                    Worng password or username!
                                </Typography>
                            ) : null}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link href="/signup" variant="body2">
                                        {"Don't have an account? Sign Up"}
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

export default observer(SignIn);
