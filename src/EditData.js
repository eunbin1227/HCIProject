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


export default function EditData() {
    const classes = useStyles();
    const [size, setSize] = React.useState(50);
    const [maxsize, setMaxsize] = React.useState(0);
    const [results, setResults] = React.useState([]);

    const dataRef = firestore.collection('Data').doc(localStorage.getItem('KEY'));

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

                    <form onSubmit={handleSubmit}>
                        <div className={classes.slide}>
                            <Typography id="discrete-slider-custom" className={classes.contains} variant="h2" gutterBottom>
                                Slide to choose appropriate size
                                <br/><br/><br/>
                                Max: {maxsize},&ensp;
                                Current dataset size : {size}
                                <br/>
                            </Typography>
                            <Slider className={classes.slider}
                                    defaultValue={0}
                                    getAriaValueText={valuetext}
                                    aria-labelledby="discrete-slider-custom"
                                    step={1}
                                    valueLabelDisplay="auto"
                                    max = {maxsize}
                                    onChange = {(e, val) => setSize(val)}
                            />
                            <Button type='submit'>Submit</Button>
                        </div>
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
    slide: {
        display: 'flex',
        flexDirection: 'column'
    }
}));