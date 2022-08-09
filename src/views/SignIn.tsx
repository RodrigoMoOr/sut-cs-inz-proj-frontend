import * as React from "react";
import {useEffect, useState} from "react";
import {Link as NavLink, useNavigate} from "react-router-dom";
import {EMAIL, PASSWORD} from "../helpers/regex";
import {SignInRequest, SignInResponse} from "../interfaces/sign-in.interface";
import {apiClient} from "../adapters/api-client";
import {Avatar, Box, Button, Container, CssBaseline, Grid, Link, Paper, TextField, Typography} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const SignIn = () => {

  const [email, setEmail] = useState<string>('');
  const [validEmail, setValidEmail] = useState<boolean>(false);

  const [password, setPassword] = useState<string>('');
  const [validPassword, setValidPassword] = useState<boolean>(false);

  const [errMsg, setErrMsg] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    setValidEmail(EMAIL.test(email));
  }, [email]);

  useEffect(() => {
    setValidPassword(PASSWORD.test(password));
  }, [password]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    const antiHackOne = EMAIL.test(email);
    const antiHackTwo = PASSWORD.test(password);

    if (!antiHackOne || !antiHackTwo) {
      setErrMsg('Invalid inputs');
      return;
    }

    const payload: SignInRequest = {
      username: email,
      password
    }

    const res = await apiClient.post<SignInResponse>('auth/sign-in', payload);
    if (res.data.accessToken) navigate('/home');
  }

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline/>
      <Paper elevation={4}>
        <Box sx={{
          marginTop: 16,
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <Typography component="h1" variant="h4" textAlign="center">
            Sign In to your Plutus Account
          </Typography>
          <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
            <AccountCircleIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{mt: 4, mb: 4}}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField required fullWidth id="username" label="Email Address" name="username" autoComplete="email"
                           error={!validEmail} helperText="Please provide a valid email"
                           onChange={(e) => setEmail(e.target.value)}/>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={!validPassword}
                  helperText="Password must have a length between 8 and 24 characters. Must include uppercase and lowercase letters, a number and a special character"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Button disabled={isLoading} type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}>
                Sign In
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <NavLink to="/sign-in" style={{textDecoration: 'none'}}>
                    Already have an account? Sign in
                  </NavLink>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
      <Typography variant="body2" color="text.secondary" align="center" sx={{mt: 8}}>
        {'Copyright © '}
        <Link color="inherit" href="https://github.com/RodrigoMoOr/sut-cs-inz-proj-frontend">
          Plutus
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Container>
  )
}