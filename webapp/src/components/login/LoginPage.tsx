import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
//import "@inrupt/jest-jsdom-polyfills" // TODO: revisar
import { LoginButton } from "@inrupt/solid-ui-react";
import { SelectChangeEvent, InputLabel, MenuItem, Select, FormControl } from "@mui/material";

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/Arquisoft/lomap_es4a">
        LoMap_es4a
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const theme = createTheme();


export default function LoginPage() {
	const [podProvider, setPodProvider] = useState("https://inrupt.net");
	const [currentUrl] = useState("http://localhost:3000");
  
	
	// Cambia el proveedor de pod
	const handleChange = (event: SelectChangeEvent) => {
	  setPodProvider(event.target.value);
	};


  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }} >
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://i.pinimg.com/originals/6a/9b/1b/6a9b1bffeab9f41eea79e49408adea2e.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log in
            </Typography>

            <Box sx={{ minWidth: 120, padding:"2em" }} >
				<FormControl fullWidth >
					<InputLabel id="selectPodProviderLabel">SOLID Pod Provider</InputLabel>
					<Select
						labelId="selectPodProviderLabel"
						label="SOLID Pod Provider"
						id="selectPodProvider"
						value={podProvider}
						onChange={handleChange}
					>
						<MenuItem value={"https://inrupt.net"}>Inrupt.net</MenuItem>
						<MenuItem value={"https://login.inrupt.com"}>pod.Inrupt.com</MenuItem>
						<MenuItem value={"https://solidcommunity.net"}>Solid Community</MenuItem>
						<MenuItem value={"https://solidweb.org"}>Solid Web</MenuItem>
					</Select>
				</FormControl>
			  
			<LoginButton oidcIssuer={podProvider} redirectUrl={currentUrl}>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2 }}
				>
					Log In
				</Button>
			</LoginButton>
            <Copyright sx={{ mt: 5 }} />
            </Box>
			
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
