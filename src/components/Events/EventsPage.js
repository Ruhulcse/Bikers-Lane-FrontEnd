import { Button, Container, Grid, Grow } from "@material-ui/core";
import React, { useState } from "react";
import Events from "./Events";
import useStyles from './styles';




const EventsPage = () => {
    const [currentId, setCurrentId] = useState(0);

    const classes = useStyles();

    return (
        <Grow in>
            <Grid className={classes.grid}>
                <Container>
                    <Button className={classes.Button} currentId={currentId} >Create Event</Button>
                    <Events setCurrentId={setCurrentId}></Events>
                </Container>
            </Grid >
        </Grow>
    );



}