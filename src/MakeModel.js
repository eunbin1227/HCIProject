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


import diabetes from './data/diabetes.csv';


export default function MakeModel() {


    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [acc, setAcc] = useState(null);

    const open = Boolean(anchorEl);
    
    const [progressBarValue, setProgressBarValue] = useState(30 + Math.floor(Math.random() * 50));
    useEffect(() => {
      const intervalId = setInterval(() => {
        setProgressBarValue((prev) => {
          if (prev >= 95) {
            clearInterval(intervalId);
            setAcc(right/test * 100);
            localStorage.setItem('ACC', JSON.stringify(acc));
            return 100;
          } else {
              const ret = Math.floor(prev + Math.random() * 20)
            return ret > 100? 100: ret;
          }
        });
      }, 1000);
      return () => clearInterval(intervalId);
    }, []);

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
                                    도움말
                                </DialogTitle>
                                <DialogContent className={classes.modalContainer}>
                                    <DialogContentText className={classes.modalContents}>
                                        이 웹사이트는 세 부분으로 이루어져 있습니다.                                        
                                    </DialogContentText>
                                    <DialogContentText className={classes.modalContents}>
                                        &ensp;1. 로지스틱 회귀란 무엇인가? <br/>
                                        &ensp;2. 로지스틱 회귀 모델 만들어보기 <br/>
                                        &ensp;3. 로지스틱 회귀 모델 평가해보기 <br/>
                                    </DialogContentText>
                                    <DialogContentText className={classes.modalContents}>
                                        prev를 클릭하면 이전 페이지로, 
                                            next를 클릭하면 다음 페이지로 이동합니다.
                                    </DialogContentText>
                                    <DialogContentText className={classes.modalContents}>
                                        참고문헌<br/>
                                        <a href="https://curiousily.com/posts/diabetes-prediction-using-logistic-regression-with-tensorflow-js/" 
                                        target="_blank" rel="noopener noreferrer"
                                        style={{ textDecoration: 'none', color: 'black' }}
                                        >
                                            1. Javascript로 배우는 로지스틱회귀
                                        </a>
                                        <br/>
                                        <a href="https://www.datacamp.com/community/tutorials/understanding-logistic-regression-python" 
                                            target="_blank" rel="noopener noreferrer"
                                            style={{ textDecoration: 'none', color: 'black' }}
                                            >
                                            2. Python으로 배우는 로지스틱회귀
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
                        6. 로지스틱 회귀 모형 만들기 <br/> <br/>
                    </Typography>
                    
                    <ProgressBar
                        className="classes.progressbar"
                        value={progressBarValue}
                    ></ProgressBar>             

                    <Typography className={classes.contains} >
                        정확도: {acc}%
                    </Typography>
                </CardContent>
                <CardActions>
                    <div className={classes.bottomButton}>
                        <Button className={classes.prevButton} size="large" component={Link} to="/WeightData">prev</Button>
                        <Button className={classes.nextButton} size="large" component={Link} to="/FeedBack">next</Button>
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