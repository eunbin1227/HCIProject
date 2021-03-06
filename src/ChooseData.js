import React from 'react';
import {
    CssBaseline,
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
import { makeStyles, ThemeProvider} from '@material-ui/core/styles';
import StickyFooter from "./StickyFooter";
import {Link} from 'react-router-dom';
import { theme } from "./theme";
import { firestore } from "./firebase";
import bdiag from './data/bdiag.csv';
import diabetes from './data/diabetes.csv';
import titanic from './data/titanic.csv';
import SBI from './data/SBI.csv';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


export default function ChooseData() {
    const classes = useStyles();
    const [data, setData] = React.useState('');
    const [name, setName] = React.useState('');

    const custom = "Custom Dataset";

    const handleChange = (event) => {
        event.preventDefault();
        setName(event.target.value);
        fetch(event.target.value)
            .then((r) => r.text())
            .then(text => {
                setData(text);
                localStorage.setItem('DNAME', JSON.stringify(text));
                console.log(text);
            })
    };


    const handleSubmit = (e) => {
        console.log(data);
        console.log(typeof data);
        e.preventDefault();
        firestore
            .collection('Data')
            .add({data})
            .then(function(docRef) {
                localStorage.setItem('KEY', docRef.id);
            })
    }

    const addFile = (e) => {

        e.preventDefault();
        const file = e.target.files[0];
        const reader = new FileReader();

        setName(custom);

        reader.onload = async (progressEvent) => {
            const data = await progressEvent.target.result;
            setData(data);
        }
        reader.readAsText(file);
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
                <CardContent >
                    <form className={classes.content} onSubmit={handleSubmit}>
                        <Typography className={classes.title} variant="h1" gutterBottom>
                            2. ???????????? ???????????? <br/> <br/>
                        </Typography>
                        <FormControl className={classes.formControl}>
                            <Select
                                value={name}
                                onChange={handleChange}
                                displayEmpty
                                className={classes.selectEmpty}
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value="">
                                    <em>???????????? ??????</em>
                                </MenuItem>
                                <MenuItem value={titanic}>Titanic Survivor</MenuItem>
                                <MenuItem value={bdiag}>Breast Cancer</MenuItem>
                                <MenuItem value={SBI}>Bacteria infection</MenuItem>
                                <MenuItem value={diabetes}>Diabetes</MenuItem>
                                <MenuItem value={custom} className={classes.tmp}>??? ????????????</MenuItem>
                            </Select>
                        </FormControl>
                        <Button className={classes.button} variant="contained" component="label">
                            <Typography style={{ textTransform: 'lowercase'}}>
                                ??? ???????????? ????????? (.csv, .xlsx)
                            </Typography>
                            <input
                                type="file"
                                onChange={addFile}
                                hidden/>
                        </Button>

                        <Button className={classes.submit} type="submit"> ?????? ?????? &#9989;</Button>

                    </form>

                </CardContent>
                <CardActions>
                    <div className={classes.bottomButton}>
                        <Button className={classes.prevButton} size="large" component={Link} to="/Explanation">prev</Button>
                        <Button className={classes.nextButton} size="large" component={Link} to="/EditData">next</Button>
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
    },
    actions: {
        position: 'absolute',
        right: '1vw',
        top: '1vh',
//        backgroundColor: 'yellow',
    },
    title: {
        fontSize: 40,
        fontWeight: 500,
    },
    contains: {
        fontSize: 20,
    },
    content: {
        height: '71vh',
        marginTop: 0,
        display: 'grid',
        placeContent: 'center',
        justifyItems: 'center',
        textAlign: 'center',
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
        width: 400,
        padding: theme.spacing(3),
        display: "grid",
    },
    selectEmpty: {
        marginTop: theme.spacing(3),
    },
    button: {
        margin: theme.spacing(3),
        width: 300,
        display: "grid",
    },
    submit: {
        margin: theme.spacing(3),
        width: 300,
        fontSize: 20,
        fontWeight: 500,
        display: "grid",
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
    },
    tmp: {
        display: 'none',
    }

}));

