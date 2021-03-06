import React from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import {
    Chip,
    Button,
    Grid,
    Typography,
    Card,
    CardActions,
    CardContent,
    IconButton,
    Paper
} from '@material-ui/core';
import {Home, Help} from "@material-ui/icons";
import { Link } from "react-router-dom";
import StickyFooter from "./StickyFooter";
import { theme } from "./theme";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        display: 'grid',
        minHeight: '100vh',
    },
    chip: {
        margin: theme.spacing(1),
    },
    section1: {
        margin: theme.spacing(4),
    },
    section2: {
        flexDirection: 'column',
        margin: theme.spacing(4),
        textAlign: 'center',
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
    title: {
        fontSize: 40,
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
    list: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        minHeight: '10vh',
        padding: theme.spacing(0.5),
        marginBottom: theme.spacing(5),
    },
    submit: {
        width: 300,
        fontSize: 20,
        fontWeight: 500,
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

export default function Weight() {
    const classes = useStyles();

    const data = JSON.parse(localStorage.getItem("INPUT"));
    const defaultIndex = data.map((value, i) => ({key: i, label: value}));

    const [chipData, setChipData] = React.useState(defaultIndex);

    const handleDelete = (chipToDelete) => () => {
        setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('WEIGHT', JSON.stringify(chipData.map(value => value.label)));
    }


    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);


    return (
        <ThemeProvider theme={theme}>
        <div className='App'>
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
                    <div className={classes.section1}>
                        <Grid container alignItems="center">
                            <Grid item xs>
                                <Typography gutterBottom variant="h2" className={classes.title}>
                                    5. ????????? ?????? ????????? ????????? <br/>
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className={classes.section2}>
                            <Typography gutterBottom variant="body1">
                                ????????? ????????? ?????? ???????????? ??????????????? (1???) <br/>
                            </Typography>
                            <Paper component="ul" className={classes.list}>
                                {chipData.map((data) => {
                                    return (
                                        <li key={data.key}>
                                            <Chip
                                                label={data.label}
                                                onDelete={handleDelete(data)}
                                                className={classes.chip}
                                            />
                                        </li>
                                    );
                                })}
                            </Paper>
                            <Button className={classes.submit} type="submit"> ?????? ?????? &#9989;</Button>
                        </div>
                    </form>
                </CardContent>
                <CardActions>
                    <div className={classes.bottomButton}>
                       <Button className={classes.prevButton} size="large" component={Link} to="/SelectData">prev</Button>
                        <Button className={classes.nextButton} size="large" component={Link} to="/MakeModel">Start Regression!</Button>
                    </div>
                </CardActions>
                <StickyFooter/>
            </Card>
        </div>
        </ThemeProvider>
    );
}
