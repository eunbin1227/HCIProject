import React, {useState, useEffect} from 'react';
import {
    CssBaseline,
    Button,
    Typography,
    Card,
    CardActions,
    CardContent,
    IconButton,
} from '@material-ui/core';
import {
    Home,
    Help
} from "@material-ui/icons";
import { makeStyles } from '@material-ui/core/styles';
import StickyFooter from "./StickyFooter";
import {Link} from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';


export default function WrapUp() {


    const classes = useStyles();

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

    let features = JSON.parse(localStorage.getItem("INPUT"));
    let weight = JSON.parse(localStorage.getItem("WEIGHT"));
    let output = JSON.parse(localStorage.getItem("OUTPUT"));
    let accuracy = JSON.parse(localStorage.getItem("ACC"));
 
    console.log(features);
    console.log(accuracy);


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
                        7. 정리 <br/> <br/>
                    </Typography>
                    <Typography className={classes.contains} variant="h1" gutterBottom>
                      
                        <br/>
                        &ensp;데이터셋: 
                        <br/>
                        &ensp;인풋: {features} 
                        <br/>
                        &ensp;아웃풋: {output}
                        <br/>
                        &ensp;반영 비중이 높은 인풋:  {weight}
                        <br/>
                        &ensp;정확도: {accuracy}

                    </Typography>
                </CardContent>
                <CardActions>
                    <div className={classes.bottomButton}>
                        <Button className={classes.prevButton} size="large" component={Link} to="/MakeModel">prev</Button>
                        <Button className={classes.nextButton} size="large" component={Link} to="/Feedback">next</Button>
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
        minWidth: '25vw',
        fontSize: 20,
        fontWeight:  500,
        lineHeight: 2.5,
        textAlign: 'justify',
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
        position: 'absolute',
        right: '1vw',
        top: '1vh',
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