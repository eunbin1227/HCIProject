import React from 'react';
import {
    CssBaseline,
    Button,
    Typography,
    Card,
    CardActions,
    CardContent,
    IconButton,
    Paper,
    TextField,
    Grid,
} from '@material-ui/core';
import {
    Home,
    Help
} from "@material-ui/icons";
import { makeStyles } from '@material-ui/core/styles';
import StickyFooter from "./StickyFooter";
import {Link} from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from "./theme";
import select from "./select";


export default function WrapUp() {
    const classes = useStyles();
    const [expect, setExpect] = React.useState('');
    const candidate = JSON.parse(localStorage.getItem('INPUT'));

    const handleSubmit = (e) => {
        e.preventDefault();
        setExpect(select(JSON.parse(localStorage.getItem('OUTINDEX'))));
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
                            8. 직접 해보기 <br/> <br/>
                        </Typography>
                        <Typography className={classes.contains} variant="h4" gutterBottom>
                            인풋 값 입력하기
                        </Typography>
                        <form noValidate autoComplete="off" className={classes.form} onSubmit={handleSubmit}>
                            <Paper component="ul" className={classes.list}>
                                    {candidate.map((data) => {
                                        return (
                                            <TextField
                                                id="standard-basic"
                                                label={data}
                                                className={classes.input}
                                                variant="outlined"
                                            />
                                        );
                                    })
                                    }
                            </Paper>
                            <Button type="submit"> 예측 시작 </Button>
                        </form>
                        <Typography className={classes.contains} variant="h4" gutterBottom>
                            예측 결과
                        </Typography>
                        <Paper className={classes.list} justify="center">
                            <Grid container justify="center">
                                <Typography className={classes.contains} variant="h4" gutterBottom>
                                    예측 결과 : {expect}
                                </Typography>
                            </Grid>
                        </Paper>
                    </CardContent>
                    <CardActions>
                        <div className={classes.bottomButton}>
                            <Button className={classes.prevButton} size="large" component={Link} to="/WrapUp">prev</Button>
                            <Button className={classes.nextButton} size="large" component={Link} to="/Feedback">next</Button>
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
    list: {
        margin: 10,
        padding: 10,
        paddingLeft: 20,
    },
    input: {
        margin: 5,
        width: 150,
    },
    form: {
        margin: 10,
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