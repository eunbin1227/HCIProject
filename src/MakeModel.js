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
import LogisticRegression from 'ml-logistic-regression';
import { ProgressBar } from "primereact/progressbar";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as d3 from 'd3';
import * as _ from 'lodash';
import { Matrix } from 'ml-matrix';
import { theme } from './theme';


export default function MakeModel() {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [acc, setAcc] = useState(null);
    const [flag, setFlag] = useState(false);

    const open = Boolean(anchorEl);
    
    const [progressBarValue, setProgressBarValue] = useState(30 + Math.floor(Math.random() * 50));
    useEffect(() => {
      const intervalId = setInterval(() => {
        setProgressBarValue((prev) => {
          if (prev >= 95) {
            clearInterval(intervalId);
            setAcc(right/test * 100);
            if(!flag) setFlag(true);
            localStorage.setItem('ACC', JSON.stringify(acc));
            return 100;
          } else {
              const ret = Math.floor(prev + Math.random() * 20)
            return ret > 100? 100: ret;
          }
        });
      }, 1000);
      return () => clearInterval(intervalId);
    }, [flag]);

    const classes = useStyles();

    const d = JSON.parse(localStorage.getItem("DATA"));
    const features = JSON.parse(localStorage.getItem("INPUT"));
    const weight = JSON.parse(localStorage.getItem("WEIGHT"));
    const train = JSON.parse(localStorage.getItem("TRAIN"));
    const test = JSON.parse(localStorage.getItem("TEST"));
    const output = JSON.parse(localStorage.getItem("OUTPUT"));

    let data = d3.shuffle(d).slice(0, train+test);

    let result = []
    for(let i = 0; i < features.length; i++) {
        result[i] = _.map(data, features[i]).map(Number);
        if(features[i] === weight[0]) {
            result[i] = result[i].map(function(x) { return x * 2});
        }
    }        

    const finalData = result[0].map((_, colIndex) => result.map(row => row[colIndex]));
    const yData = _.map(data, output).map(Number);

    let Xtrain = finalData.slice(0, train);
    let Ytrain = yData.slice(0, train);
    Xtrain = new Matrix(Xtrain);
    Ytrain = Matrix.columnVector(Ytrain);

    let Xtest = finalData.slice(train, train+test);
    const check = Xtest.slice(0, 10);
    let Ytest = yData.slice(train, train+test);
    Xtest = new Matrix(Xtest);

    const logreg = new LogisticRegression({ numSteps: 1000, learningRate: 5e-2 });
    logreg.train(Xtrain, Ytrain);

    const finalResults = logreg.predict(Xtest);

    let right = 0;
    for(let i = 0; i < test; i++) {
        if(finalResults[i] === Ytest[i]) {
            right++;
        }
    }

      return (

        <ThemeProvider theme={theme}>
            <div className="App">
                <CssBaseline />
                <Card className={classes.root} elevation={3}>
                    <CardActions>
                        <div className={classes.actions}>
                            <IconButton component={Link} to="/"> <Home/> </IconButton>
                            <IconButton>
                                <Help onClick={handleClick} />
                                <Dialog
                                    open={open} onClose={handleClose}>
                                    <DialogTitle className={classes.modalTitle}>
                                        ?????????
                                    </DialogTitle>
                                    <DialogContent className={classes.modalContainer}>
                                        <DialogContentText className={classes.modalContents}>
                                            ??? ??????????????? ??? ???????????? ???????????? ????????????.
                                        </DialogContentText>
                                        <DialogContentText className={classes.modalContents}>
                                            &ensp;1. ???????????? ????????? ????????????? <br/>
                                            &ensp;2. ???????????? ?????? ?????? ??????????????? <br/>
                                            &ensp;3. ???????????? ?????? ?????? ??????????????? <br/>
                                        </DialogContentText>
                                        <DialogContentText className={classes.modalContents}>
                                            prev??? ???????????? ?????? ????????????,
                                                next??? ???????????? ?????? ???????????? ???????????????.
                                        </DialogContentText>
                                        <DialogContentText className={classes.modalContents}>
                                            ????????????<br/>
                                            <a href="https://curiousily.com/posts/diabetes-prediction-using-logistic-regression-with-tensorflow-js/"
                                            target="_blank" rel="noopener noreferrer"
                                            style={{ textDecoration: 'none', color: 'black' }}
                                            >
                                                1. Javascript??? ????????? ??????????????????
                                            </a>
                                            <br/>
                                            <a href="https://www.datacamp.com/community/tutorials/understanding-logistic-regression-python"
                                                target="_blank" rel="noopener noreferrer"
                                                style={{ textDecoration: 'none', color: 'black' }}
                                                >
                                                2. Python?????? ????????? ??????????????????
                                            </a>
                                        </DialogContentText>

                                        <DialogContentText className={classes.modalContact}>
                                            Contact us: learninglogisticregression@gmail.com
                                        </DialogContentText>
                                    </DialogContent>
                                </Dialog>
                            </IconButton>
                        </div>
                    </CardActions>
                    <CardContent className={classes.content}>
                        <Typography className={classes.title} variant="h1" gutterBottom>
                            6. ???????????? ?????? ?????? ????????? <br/> <br/>
                        </Typography>
                        <ProgressBar
                            className={classes.progressbar}
                            value={progressBarValue}
                        ></ProgressBar>
                        <Typography className={classes.contains} >
                            ?????????: {localStorage.getItem('ACC')}%
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <div className={classes.bottomButton}>
                            <Button className={classes.prevButton} size="large" component={Link} to="/WeightData">prev</Button>
                            <Button className={classes.nextButton} size="large" component={Link} to="/WrapUp">next</Button>
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
        minHeight: '100vh',
    },
    title: {
        fontSize: 40,
    },
    contains: {
        fontSize: 17,
        paddingTop: '7vh',
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
    progressbar: {
        padding: '5vh',
        
    },
    modalTitle: {
        color: 'black',
        fontWeight: 500,
        height: '10vh',
        padding: '3vh',
    },
    modalContainer: {
        height:'40vh',
    },
    modalContents: {
        color: 'black',
        textAlign: 'justify',
        margin: '1vh',
    },  
    modalContact: {
        textAlign: 'right'
    } 

}));