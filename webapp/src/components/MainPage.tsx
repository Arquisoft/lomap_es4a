import Box from "@mui/material/Box";
import PrimarySearchAppBar from "./Searchbar/Searchbar";
import Map from "./Map/Map";
import { Grid } from "@mui/material";
import React, {useEffect} from "react";
import { SessionType } from "../solidapi/solidapiAdapter";
import Navigator from "./Navbar/Navigator";
import AddPointOption from "./Options/AddPointOption";
import Point from "../solidapi/Point";

// Custom events
import { subscribe, unsubscribe } from "../event";

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
            <Box sx={{ gridArea: 'search'}}><PrimarySearchAppBar /></Box>
            <Box><Navigator/></Box>
            <Box><AddPointOption/></Box>
            <Box sx={{ gridArea: 'mainContainer'}}><Map session={session}/></Box>
        </Grid>
    );
}