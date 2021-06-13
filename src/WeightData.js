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
    IconButton,
    Paper
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
        display: 'flex',
        flexDirection: 'column',
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
    list: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
    },
}));

export default function Weight() {
    const classes = useStyles();

    const data = JSON.parse(localStorage.getItem("INPUT"));
    const defaultIndex = data.map((value, i) => ({key: i, label: value}));
    console.log(defaultIndex);

    const [chipData, setChipData] = React.useState(defaultIndex);

    const handleDelete = (chipToDelete) => () => {
        setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('WEIGHT', JSON.stringify(chipData.map(value => value.label)));
    }

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
                                    4. Choose index to give more weight <br/>
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className={classes.section2}>
                            <Typography gutterBottom variant="body1">
                                Select index to give more weight<br/>
                            </Typography>
                            <Paper component="ul" className={classes.list}>
                                {chipData.map((data) => {
                                    return (
                                        <li key={data.key}>
                                            <Chip
                                                label={data.label}
                                                onDelete={handleDelete(data)}
                                                className={classes.chip}
                                            />
                                        </li>
                                    );
                                })}
                            </Paper>
                            <Button type='submit'> Submit </Button>
                        </div>
                    </form>
                </CardContent>
                <CardActions>
                    <div className={classes.bottomButton}>
                        <Button className={classes.prevButton} size="large" component={Link} to="/SelectData">prev</Button>
                        <Button className={classes.nextButton} size="large" component={Link} to="/Feedback">Start Regression!</Button>
                    </div>
                </CardActions>
                <StickyFooter/>
            </Card>
        </div>
        </ThemeProvider>
    );
}
