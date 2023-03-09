import { useState } from "react";
import { LoginButton } from "@inrupt/solid-ui-react";
import { Button } from "@material-ui/core";
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Grid } from "@mui/material";

function LoginForm() {
  const [podProvider, setPodProvider] = useState("https://inrupt.net");
  const [currentUrl, setCurrentUrl] = useState("http://localhost:3000");


  const handleChange = (event: SelectChangeEvent) => {
    setPodProvider(event.target.value as string);
  };


  return (
	<Grid
  	container
  	spacing={4}
  	direction="column"
  	alignItems="center"
  	justifyContent="center"
  	style={{ minHeight: '100vh' }}
	>
		<Grid item xs={12}>
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
		</Grid>

		<Grid item xs={3}>
		<LoginButton oidcIssuer={podProvider} redirectUrl={currentUrl}>
			<Button type="submit" fullWidth variant="contained" color="primary">
				Login
			</Button>
		</LoginButton>
		</Grid>
	</Grid>
            
  );
}

export default LoginForm;