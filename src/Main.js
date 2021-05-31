import {
    Button,
    Typography,
    Card,
    CardActions,
    CardContent,
    IconButton,
} from '@material-ui/core';
import {
    Home,
    NightsStay
} from "@material-ui/icons";
import { makeStyles } from '@material-ui/core/styles';
import StickyFooter from "./StickyFooter";
import CssBaseline from "@material-ui/core/CssBaseline";
import {Link} from 'react-router-dom';


export default function Main() {
    const classes = useStyles();
  return (
    <div className="App">
        <CssBaseline />
        <Card className={classes.root} elevation={3}>
            <CardActions>
                <div className={classes.actions}>
                    <IconButton> <NightsStay/> </IconButton>
                    <IconButton component={Link} to="/"> <Home/> </IconButton>
                </div>
            </CardActions>
            <CardContent className={classes.content}>
                <Typography className={classes.title} variant="h1" gutterBottom>
                    Say Hello to <br />
                    Logistic Regression
                </Typography>
            </CardContent>
            <CardActions>
                <div className={classes.bottomButton}>
                    <Button size="medium" component={Link} to="/Explanation">Next</Button>
                    <Button size="medium" component={Link} to="/ChooseData">Skip Explanation</Button>
                </div>
            </CardActions>
        </Card>
        <StickyFooter/>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
    },
    title: {
        fontSize: 40,
    },
    content: {
        marginTop: 50,
        marginBottom: 50,
    },
    actions: {
        marginLeft: 'auto',
    },
    bottomButton: {
        marginLeft: 'auto',
    }
}));