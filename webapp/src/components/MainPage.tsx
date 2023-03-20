import Box from "@mui/material/Box";
import PrimarySearchAppBar from "./Searchbar/Searchbar";
import Map from "./Map/Map";
import { Grid } from "@mui/material";
import React from "react";
import { SessionType } from "../solidapi/solidapiAdapter";
import Navigator from "./Navbar/Navigator";
import AddPointOption from "./Options/AddPointOption";
import Point from "../solidapi/Point";

export default function MainPage({ session }: SessionType): JSX.Element {

    const [navigatorOpen, setNavigatorOpen] = React.useState(false);

    const [addOpen, setAddOpen] = React.useState(false);

    // Muestra el menú de Navigator si este está oculto o lo oculta si este está visible
    const toggleShowNavigator = () => {
        setNavigatorOpen(!navigatorOpen);
    };

    const showAddPointOption = (point: Point) => {
        if (navigatorOpen) {
            toggleShowNavigator();
        }
        setAddOpen(true);
    };

    const supressAddPointOption = () => {
        setAddOpen(false);
    }

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
            <Box sx={{ gridArea: 'search'}}><PrimarySearchAppBar callback={ toggleShowNavigator } /></Box>
            <Box><Navigator variant={"persistent"} open={ navigatorOpen }/></Box>
            <Box><AddPointOption variant={"persistent"} open={ addOpen } callback={ showAddPointOption }/></Box>
            <Box sx={{ gridArea: 'mainContainer'}}><Map session={session} callback={ showAddPointOption }/></Box>
        </Grid>
    );
}