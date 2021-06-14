import React from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import {
    Card,
    CardActions,
    CardContent,
    IconButton,
    TextField,
    Box,
    Grid,
    Button,
    Typography
} from "@material-ui/core";
import {Link} from "react-router-dom";
import {Help, Home} from "@material-ui/icons";
import StickyFooter from "./StickyFooter";
import {theme} from "./theme";
import { firestore } from './firebase';

const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        display: 'grid',
        minHeight: '100vh',
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
        marginBottom: 50,
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
    rating: {
        width: 200,
        display: 'flex',
        alignItems: 'center',
        marginBottom: 50,
    },
    submit: {
        display: 'flex',
        flexDirection: 'column',
    }
});

export default function Feedback() {
    const [value, setValue] = React.useState(2);
    const [hover, setHover] = React.useState(-1);
    const [text, setText] = React.useState('');
    const classes = useStyles();

    const handleSubmit = (e) => {
        e.preventDefault();
        firestore
            .collection("Feedback")
            .add({rating: {value}, feedbackText: {text}})
            .then(() => {
            })
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
                        <div>
                            <Grid container alignItems="center">
                                <Grid item xs>
                                    <Typography gutterBottom variant="h2" className={classes.title}>
                                        7. Feedback <br/>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </div>
                        <div className={classes.rating}>
                            <Rating
                                name="hover-feedback"
                                value={value}
                                precision={0.5}
                                size="large"
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                                onChangeActive={(event, newHover) => {
                                    setHover(newHover);
                                }}
                            />
                            {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
                        </div>
                        <div>
                            <form className={classes.submit} noValidate autoComplete="off" onSubmit={handleSubmit}>
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Feedback"
                                    multiline
                                    rows={10}
                                    defaultValue="의견을 남겨주세요!"
                                    variant="outlined"
                                    onChange={(e) => setText(e.target.value)}
                                />
                                <Button type="submit"> Submit </Button>
                            </form>

                        </div>
                    </CardContent>
                    <CardActions>
                        <div className={classes.bottomButton}>
                            <Button className={classes.prevButton} size="large" component={Link} to="/MakeModel">prev</Button>
                            <Button className={classes.nextButton} size="large" component={Link} to="/">end</Button>
                        </div>
                    </CardActions>
                    <StickyFooter/>
                </Card>
            </div>
        </ThemeProvider>
    );
}
