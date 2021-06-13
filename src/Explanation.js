import React from 'react';
import {
    CssBaseline,
    Button,
    Typography,
    Card,
    CardActions,
    CardContent,
    IconButton,
    Popover
} from '@material-ui/core';
import {
    Home,
    Help
} from "@material-ui/icons";
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import StickyFooter from "./StickyFooter";
import { Link } from 'react-router-dom';
import linreg from './img/linreg.png';
import logreg from './img/logreg.png';
import { theme } from "./theme";

export default function Explanation() {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

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
                                {/*<Popover*/}
                                {/*    id={id}*/}
                                {/*    open={open}*/}
                                {/*    anchorPosition={{top:200, left:400}}*/}
                                {/*    onClose={handleClose}*/}
                                {/*    anchorOrigin={{*/}
                                {/*        vertical: 'top',*/}
                                {/*        horizontal: 'center',*/}
                                {/*    }}*/}
                                {/*    transformOrigin={{*/}
                                {/*        vertical: 'top',*/}
                                {/*        horizontal: 'center',*/}
                                {/*    }}*/}
                                {/*>*/}
                                {/*    <Typography variant="h2" className={classes.title}>*/}
                                {/*        Need Help? <br/>*/}
                                {/*    </Typography>*/}
                                {/*    <Typography gutterBottom variant="h4" className={classes.contact}>*/}
                                {/*        Contact Us: eunbinrnt@gmail.com <br/>*/}
                                {/*    </Typography>*/}
                                {/*/!*    TBD *!/*/}
                                {/*</Popover>*/}
                            </IconButton>
                        </div>
                    </CardActions>
                    <CardContent className={classes.content}>
                        <Typography className={classes.title} variant="h1" gutterBottom>
                            로지스틱 회귀란? <br/> <br/>
                        </Typography>

                        <div className={classes.container}>
                            <Typography className={classes.explanation} variant="h2" gutterBottom>
                        &ensp;&ensp;두 개의 선택지 중 하나를 골라야 하는 문제가 있습니다. 예를 들어, 우리는 환자의 유병 여부, 고객의 구매 여부를 예측하기를 원합니다. 로지스틱 회귀는 이러한 이진분류 문제의 해결에 쓰이는 단순하면서도 효과적인 머신러닝 알고리즘입니다. 로지스틱 회귀는 여러 개의 독립변수를 받아 0과 1 사이의 결과값을 내놓습니다. 0 또는 1은 성공/실패, 병이 있음/없음 등의 값을 대표할 수 있으며, 내놓은 결과값이 실제 결과값과 얼마나 일치하는지에 따라 모델의 성능이 결정됩니다.
                        <br/><br/>
                        &ensp;&ensp;반면, 주택의 가격, 중고차의 가격처럼 예측하려는 값이 연속적인 값일 때는 로지스틱 회귀를 사용하는 것이 적합하지 않습니다. 이런 경우에 사용되는 것이 선형회귀입니다. 선형회귀 역시 여러 개의 독립변수를 받아서 하나의 결과값을 내놓지만, 선형회귀의 결과값은 로지스틱 회귀와 달리 독립변수의 값에 따라 연속적으로 달라집니다. 모형 대신 실제 결과값의 평균으로 예측한 값, 회귀모형으로 예측한 값을 비교해 우리는 결정계수를 구할 수 있으며, 결정계수의 값이 1에 가까울수록 정확도가 높고 0에 가까울수록 정확도가 떨어집니다.
                        </Typography>
                        </div>
                        <div className={classes.graphContainer}>
                            <span className={classes.span}><img src={linreg} height='400vw'/></span>
                            <span><img src={logreg} height='400vw'/></span>
                        </div>
                    </CardContent>
                    <CardActions>
                        <div className={classes.bottomButton}>
                            <Button className={classes.prevButton} size="large" component={Link} to="/">prev</Button>
                            <Button className={classes.nextButton} size="large" component={Link} onClick={()=> {localStorage.clear()}} to="/ChooseData">next</Button>
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
    actions: {
        position: 'absolute',
        right: '1vw',
        top: '1vh',
    },
    title: {
        fontSize: 40,
        fontWeight: 500,
        paddingTop: '10vh',
    },
    content: {
    },
    container: {
        padding: '3vh',
        display: 'grid',
        width: '100vw',
        placeContent: 'center',
    },
    explanation: {
        width: '53vw',
        fontSize: 17,
        fontWeight: 500,
        textAlign: "justify",
        lineHeight: '25px',
    },
    graphContainer: {
        padding: '3vh',
    },
    span: {
        padding: '5vh',
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
        marginRight: "6vw",
    },
    typography: {

    },
    contact: {

    }
}));

