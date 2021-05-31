import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import {Card, CardActions, CardContent, IconButton} from "@material-ui/core";
import {Home, Help} from "@material-ui/icons";
import {Link} from "react-router-dom";
import StickyFooter from "./StickyFooter";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    chip: {
        margin: theme.spacing(0.5),
    },
    section1: {
        margin: theme.spacing(3, 2),

    },
    section2: {
        margin: theme.spacing(2),
    },
    section3: {
        margin: theme.spacing(3, 1, 1),
    },
    content: {
        marginTop: 0,
        marginBottom: 50,
    },
    actions: {
        marginLeft: 'auto',
    },
    title: {
        fontSize: 30,
        alignContent: 'center'
    },
    bottomButton: {
        marginLeft: 'auto',
    },
}));

export default function Weight() {
    const classes = useStyles();

    return (
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
                                    Choose index to give more weight <br/>
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                    <Divider variant="middle" />
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
                        <Button size="medium" component={Link} to="/ChooseData">Next</Button>
                        <Button size="medium" align='center'>Skip Explanation</Button>
                    </div>
                </CardActions>
            </Card>
            <StickyFooter/>
        </div>
    );
}