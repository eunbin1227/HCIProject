import {
    Button,
    Typography,
    Card,
    CardActions,
    CardContent,
    IconButton,
    MenuItem,
    Select,
    FormControl,
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


export default function Explanation() {
    const classes = useStyles();
    const [data, setData] = React.useState('');

    const handleChange = (event) => {
        setData(event.target.value);
    };

    return (
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
                        Logistic Regression? <br/> <br/>
                    </Typography>
                    <Typography className={classes.contains} variant="h2" gutterBottom>
                        <br/>두 개의 선택지 중 하나를 골라야 하는 문제가 있습니다. 예를 들어, 우리는 환자의 유병 여부, 고객의 구매 여부를 예측하기를 원합니다.
                        <br/>로지스틱회귀(Logistic Regression)는 이러한 이진분류 문제의 해결에 쓰이는 단순하면서도 효과적인 머신러닝 알고리즘입니다.
                        <br/>로지스틱회귀는 여러 개의 독립변수를 받아 0 또는 1의 결과값을 내놓습니다. 0 또는 1은 성공/실패, 병이 있음/없음 등의 값을
                        <br/>대표할 수 있으며, 내놓은 결과값이 실제 결과값과 얼마나 일치하는지에 따라 모델의 성능이 결정됩니다.
                        <br/>반면, 주택의 가격, 중고차의 가격처럼 예측하려는 값이 연속적인 값일 때는 로지스틱회귀를 사용하는 것이 적합하지 않습니다.
                        <br/>이런 경우에 사용되는 것이 선형회귀(Linear Regression)입니다. 선형회귀 역시 여러 개의 독립변수를 받아서 하나의 결과값을 내놓지만,
                        <br/>선형회귀의 결과값은 로지스틱회귀와 달리 독립변수의 값에 따라 연속적으로 달라집니다. 모형 대신 실제 결과값의 평균으로 예측한 값,
                        <br/>회귀모형으로 예측한 값을 비교해 우리는 결정계수(R2)를 구할 수 있으며, 결정계수의 값이 1에 가까울수록 정확도가 높고 0에 가까울수록 정확도가 떨어집니다.
                    </Typography>
                    <FormControl className={classes.formControl}>
                        <Select
                            value={data}
                            onChange={handleChange}
                            displayEmpty
                            className={classes.selectEmpty}
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                        </Select>
                    </FormControl>
                </CardContent>
                <CardActions>
                    <div className={classes.bottomButton}>
                        <Button size="large" component={Link} to="/EditData">Next</Button>
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
    contains: {
        fontSize: 20,
    },
    content: {
        marginTop: 0,
        marginBottom: 50,
    },
    actions: {
        marginLeft: 'auto',
    },
    bottomButton: {
        marginLeft: 'auto',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    }
}));