import React from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import {
    Chip,
    Button,
    Grid,
    Typography,
    Card,
    CardActions,
    CardContent,
    IconButton
} from '@material-ui/core';
import {Home, Help} from "@material-ui/icons";
import { Link } from "react-router-dom";
import StickyFooter from "./StickyFooter";
import { theme } from "./theme";

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        display: 'grid',
        minHeight: '100vh',
    },
    chip: {
        margin: theme.spacing(1),
    },
    section1: {
        margin: theme.spacing(4),
    },
    section2: {
        margin: theme.spacing(4),
    },
    content: {
        height: '75vh',
        marginTop: 0,
        display: 'grid',
        placeContent: 'center',
    },
    actions: {
        position: 'absolute',
        right: '1vw',
        top: '1vh',
    },
    title: {
        fontSize: 40,
        alignContent: 'center',
    },
    bottomButton: {
        marginLeft: 'auto',
    },
    prevButton: {
        fontSize: 18,
        textTransform: "none",
        marginRight: '2vw',
    },
    nextButton: {
        fontSize: 18,
        textTransform: "none",
        marginRight: "3vw",
    },
}));

export default function Weight() {
    const classes = useStyles();

    return (

        <ThemeProvider theme={theme}>
        <div className='App'>
            <Card className={classes.root} elevation={3}>
                <CardActions>
                    <div className={classes.actions}>
                        <IconButton component={Link} to="/"> <Home/> </IconButton>
                        <IconButton> <Help/> </IconButton>
                    </div>
                </CardActions>
                <CardContent className={classes.content}>
                    <div className={classes.section1}>
                        <Grid container alignItems="center">
                            <Grid item xs>
                                <Typography gutterBottom variant="h2" className={classes.title}>
                                    3. Choose index to give more weight <br/>
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
{/*                    <Divider variant="middle"/>
*/}
                    <div className={classes.section2}>
                        <Typography gutterBottom variant="body1">
                            Select index <br/>
                        </Typography>
                        <div>
                            <Chip className={classes.chip} label="Age" />
                            <Chip className={classes.chip} color="primary" label="Sex" />
                            <Chip className={classes.chip} label="Height" />
                            <Chip className={classes.chip} color="primary" label="Weight" />
                            <Chip className={classes.chip} label="Disease" />
                        </div>
                    </div>
                </CardContent>
                <CardActions>
                    <div className={classes.bottomButton}>
                        <Button className={classes.prevButton} size="large" component={Link} to="/EditData">prev</Button>
                        <Button className={classes.nextButton} size="large" component={Link} to="/Feedback">next</Button>
                    </div>
                </CardActions>
                <StickyFooter/>
            </Card>
        </div>
        </ThemeProvider>
    );
}
