import {
    Button,
    Typography,
    Card,
    CardActions,
    CardContent,
    IconButton,
    Slider,
} from '@material-ui/core';
import {
    Home,
    Help
} from "@material-ui/icons";
import { makeStyles } from '@material-ui/core/styles';
import StickyFooter from "./StickyFooter";
import CssBaseline from "@material-ui/core/CssBaseline";
import {Link} from 'react-router-dom';
import React from 'react';

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';


export default function EditData() {
    const classes = useStyles();
    const [size, setSize] = React.useState(0);

    const marks = [
        {
            value: 0,
            label: '0',
        },
        {
            value: 25,
            label: '25',
        },
        {
            value: 50,
            label: '50',
        },
        {
            value: 75,
            label: '75'
        },
        {
            value: 100,
            label: '100',
        },
    ];

    function valuetext(value) {
        return `${value}`;
    }


    return (

        
    <ThemeProvider theme={theme}>

        <div className="App">
            <CssBaseline />
            <Card className={classes.root} elevation={3}>
                <CardActions>
                    <div className={classes.actions}>
                        <IconButton component={Link} to="/"> <Home/> </IconButton>
                        <IconButton> <Help/> </IconButton>
                    </div>
                </CardActions>
                <CardContent className={classes.content}>
                    <Typography className={classes.title} variant="h1" gutterBottom>
                        2. Edit Dataset Size <br/> <br/>
                    </Typography>
                    <div>
                        <Typography id="discrete-slider-custom" className={classes.contains} variant="h2" gutterBottom>
                            Slide to choose appropriate size
                            <br/><br/><br/>
                            Max: 100,&ensp;
                            {/*Current dataset size : {size}*/}
                            Current size : 62
                            <br/>
                        </Typography>
                        <Slider className={classes.slider}
                            defaultValue={62}
                            getAriaValueText={valuetext}
                            aria-labelledby="discrete-slider-custom"
                            step={1}
                            valueLabelDisplay="auto"
                            marks={marks}
                        />
                    </div>
                </CardContent>
                <CardActions>
                    <div className={classes.bottomButton}>
                        <Button className={classes.prevButton} size="large" component={Link} to="/ChooseData">prev</Button>
                        <Button className={classes.nextButton} size="large" component={Link} to="/WeightData">next</Button>
                    </div>
                </CardActions>
                <StickyFooter/>
            </Card>
        </div>
        </ThemeProvider>
    );
}


const theme = createMuiTheme({
    typography: {
      fontFamily: [
          'Noto Sans KR', 'sans-serif'
      ].join(','),
    },
});


const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        display: 'grid',
        minHeight: '100vh',

    },
    title: {
        fontSize: 40,
    },
    contains: {
        fontSize: 20,
        paddingBottom: '10vh',
    },
    content: {
        height: '75vh',
        marginTop: 0,
        display: 'grid',
        placeContent: 'center',
    },
    slider: {
        width: '50vw',
    },
    actions: {
        marginLeft: 'auto',
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
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));