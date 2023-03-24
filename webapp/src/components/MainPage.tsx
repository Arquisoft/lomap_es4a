import Box from "@mui/material/Box";
import PrimarySearchAppBar from "./Searchbar/Searchbar";
import Map from "./Map/Map";
import { Grid } from "@mui/material";
import { SessionType } from "../solidapi/solidapiAdapter";

export default function MainPage({ session }: SessionType): JSX.Element {

    return (
        <Grid
            sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(9, 1fr)',
                gridTemplateRows: 'auto',
                gridTemplateAreas: `"search search search search search search search search search"
                "search search search search search search search search search"
                "mainContainer mainContainer mainContainer mainContainer mainContainer mainContainer mainContainer mainContainer mainContainer "
                "mainContainer mainContainer mainContainer mainContainer mainContainer mainContainer mainContainer mainContainer mainContainer "
                "mainContainer mainContainer mainContainer mainContainer mainContainer mainContainer mainContainer mainContainer mainContainer "
                "mainContainer mainContainer mainContainer mainContainer mainContainer mainContainer mainContainer mainContainer mainContainer "`,
            }}>
            <Box sx={{ gridArea: 'search'}}><PrimarySearchAppBar session={session} /></Box>
            <Box sx={{ gridArea: 'mainContainer'}}><Map session={session} /></Box>
        </Grid>
    );
}