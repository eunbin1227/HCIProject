import React from 'react';
import {
    CssBaseline,
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
import {Link} from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { firestore } from "./firebase";
import {readString} from 'react-papaparse';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


export default function EditData() {
    const classes = useStyles();
    const [size, setSize] = React.useState(0);
    const [train, setTrainSize] = React.useState(0);
    const [maxsize, setMaxsize] = React.useState(0);
    const [results, setResults] = React.useState([]);

    const dataRef = firestore.collection('Data').doc(localStorage.getItem('KEY'));
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    let max;

    const getData = () => {
        dataRef
            .get()
            .then(async (doc) =>  {
                const res = await doc.data().data
                const result = readString(res, {
                    header: true
                });
                max = result.data.length;
                setResults(result.data);
                setMaxsize(max);
            })

    }

    React.useEffect(() => {
        getData();
    }, [maxsize])

    function valuetext(value) {
        return `${value}`;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('SIZE', size.toString());
        localStorage.setItem('DATA', JSON.stringify(results));
        localStorage.setItem('TRAIN', train.toString());
        const test = size - train;
        localStorage.setItem('TEST', test.toString());
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
                                <DialogContentText className={classes.modalRef}>
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
                        3. 데이터셋 사이즈 결정하기 <br/> <br/>
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <Typography id="discrete-slider-custom" className={classes.config1} variant="h2" gutterBottom>
                            {/*Current dataset size : {size}*/}
                            1) 데이터셋 크기 결정:&ensp;{size}/{maxsize}의 데이터 선택
                        </Typography>
                        <div className={classes.sliderContainer}>
                            <Slider className={classes.slider}
                                    defaultValue={0}
                                    getAriaValueText={valuetext}
                                    aria-labelledby="discrete-slider-custom"
                                    step={1}
                                    valueLabelDisplay="auto"
                                    max = {maxsize}
                                    onChange = {(e, val) => setSize(val)}
                            />
                        </div>

                        <Typography id="discrete-slider-custom" className={classes.config2} variant="h2" gutterBottom>
                            {/*Current dataset size : {size}*/}
                            2) 학습 데이터셋 : 훈련 데이터셋&ensp;=&ensp;{train}:{size-train}
                        </Typography>
                        <div className={classes.sliderContainer}>
                            <Slider className={classes.slider}
                                    defaultValue={0}
                                    getAriaValueText={valuetext}
                                    aria-labelledby="discrete-slider-custom"
                                    step={1}
                                    valueLabelDisplay="auto"
                                    max = {size}
                                    onChange = {(e, val) => setTrainSize(val)}
                            />
                        </div>

                        <Button type='submit'>Submit</Button>
                    </form>
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
    slide: {
        display: 'flex',
        flexDirection: 'column'
    },
    config1: {
        fontSize: 20,
        paddingBottom: '5vh',
    },
    config2: {
        fontSize: 20,
        paddingTop: '5vh',
        paddingBottom: '5vh',
    },
    content: {
        height: '75vh',
        marginTop: 0,
        display: 'grid',
        placeContent: 'center',
    },
    sliderContainer: {
        width: '40vw',
        paddingBottom: '3vh',
    },
    slider: {
        width: '40vw',
        paddingBottom: '3vh',
    },

}));