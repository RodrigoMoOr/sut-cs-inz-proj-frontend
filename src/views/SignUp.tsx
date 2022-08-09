import * as React from 'react'
import {useEffect, useState} from 'react'
import {Avatar, Box, Button, Container, CssBaseline, Grid, Link, Paper, TextField, Typography} from "@mui/material"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Link as NavLink, useNavigate} from 'react-router-dom'
import {EMAIL, PASSWORD} from "../helpers/regex";
import {SignUpRequest, SignUpResponse} from "../interfaces/sign-up.interface";
import {apiClient} from "../adapters/api-client";

export const SignUp = () => {

  const [name, setName] = useState<string>('');
  const [validName, setValidName] = useState<boolean>(false);

  const [surname, setSurname] = useState<string>('');
  const [validSurname, setValidSurname] = useState<boolean>(false);

  const [email, setEmail] = useState<string>('');
  const [validEmail, setValidEmail] = useState<boolean>(false);

  const [password, setPassword] = useState<string>('');
  const [validPassword, setValidPassword] = useState<boolean>(false);

  const [verifyPassword, setVerifyPassword] = useState<string>('');
  const [validVerifyPassword, setValidVerifyPassword] = useState<boolean>(false);

  const [errMsg, setErrMsg] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (name.length > 0) setValidName(true);
  }, [name]);

  useEffect(() => {
    setValidEmail(EMAIL.test(email));
  }, [email]);

  useEffect(() => {
    setValidPassword(PASSWORD.test(password));
    setValidVerifyPassword(password === verifyPassword);
  }, [password]);

  useEffect(() => {
    setErrMsg('');
  }, [email, password, verifyPassword]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const antiHackOne = EMAIL.test(email);
    const antiHackTwo = PASSWORD.test(password);

    if (!antiHackOne || !antiHackTwo) {
      setErrMsg('Invalid inputs');
      return;
    }

    const payload: SignUpRequest = {
      name,
      surname,
      username: email,
      password
    };

    const res = await apiClient.post<SignUpResponse>('auth/sign-up', payload);

    if (res.data.id) navigate('/sign-in');
  }


  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline/>
      <Paper elevation={4}>

        <Box
          sx={{
            marginTop: 16,
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h4" textAlign="center">
            Create your account at Plutus
          </Typography>
          <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
            <AccountCircleIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 4, mb: 4}}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField autoComplete="given-name" name="name" required fullWidth id="name" label="Name" autoFocus
                           error={!validName} helperText="Please provide your given name"
                           onChange={(e) => setName(e.target.value)}/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField required fullWidth id="surname" label="Surname" name="surname" autoComplete="family-name"
                           error={!validSurname} helperText="Please provide your surname"
                           onChange={(e) => setSurname(e.target.value)}/>
              </Grid>
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
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="verifyPassword"
                  label="Repeat Password"
                  type="password"
                  id="verifyPassword"
                  autoComplete="new-password"
                  error={!validVerifyPassword} helperText="Must match password"
                  onChange={(e) => setVerifyPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button disabled={isLoading} type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}>
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <NavLink to="/sign-in" style={{textDecoration: 'none'}}>
                  Already have an account? Sign in
                </NavLink>
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
