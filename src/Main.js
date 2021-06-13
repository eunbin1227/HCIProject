import {
    Button,
    Typography,
    Card,
    CardActions,
    CardContent,
    IconButton,
} from '@material-ui/core';
import {
    Height,
    Home,
    NightsStay
} from "@material-ui/icons";
import { makeStyles } from '@material-ui/core/styles';
import StickyFooter from "./StickyFooter";
import CssBaseline from "@material-ui/core/CssBaseline";
import {Link} from 'react-router-dom';

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

export default function Main() {
    const classes = useStyles();
  return (

<ThemeProvider theme={theme}>
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
                    Say&nbsp;Hello&nbsp;to <br />
                    Logistic&nbsp;Regression
                </Typography>
            </CardContent>
            <CardActions>
                <div className={classes.bottomButton}>
                    <Button className={classes.nextButton} size="medium" component={Link} to="/Explanation">next</Button>
                    <Button className={classes.skipButton} size="medium" component={Link} onClick={() => {localStorage.clear()}} to="/ChooseData">skip explanation</Button>
                </div>
            </CardActions>
            <StickyFooter/>
        </Card>

 </div>
</ThemeProvider>

  );
}

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        display: 'grid',
        height: '100vh',
//       backgroundColor: 'pink',
    },
    actions: {
        position: 'absolute',
        right: '1vw',
        top: '1vh',
//        backgroundColor: 'yellow',
    },
    title: {
        fontSize: 70,
        textAlign: "center",
//        backgroundColor: 'blue',
    },
    content: {
        height: '60vh',
        paddingTop: '20vh',
        display: 'grid',
        placeItems: 'center',
//        backgroundColor: 'grey',
    },
    bottomButton: {
        marginTop: '15vh',
        marginLeft: 'auto',
//        backgroundColor: 'red',
    },
    nextButton: {
        fontSize: 18,
        textTransform: "none",
        marginRight: '2vw',
    },
    skipButton: {
        fontSize: 18,
        textTransform: "none",
        marginRight: "1vw",
    },
    
}));

const theme = createMuiTheme({
    typography: {
      fontFamily: [
          'Noto Sans KR', 'sans-serif'
      ].join(','),
    },
});