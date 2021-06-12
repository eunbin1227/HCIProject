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


export default function ChooseData() {
    const classes = useStyles();
    const [data, setData] = React.useState('');

    const handleChange = (event) => {
        setData(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
        firestore
            .collection('Data')
            .add({data})
            .then()
    }

    const addFile = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = async (progressEvent) => {
            const data = await progressEvent.target.result;
            setData(data);
        }
        reader.readAsText(file);
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
                    <form onSubmit={handleSubmit}>
                        <Typography className={classes.title} variant="h1" gutterBottom>
                            1. Choose Dataset <br/> <br/>
                        </Typography>
                        <Button variant="contained" component="label">
                            Upload File
                            <input
                                type="file"
                                onChange={addFile}
                                hidden/>
                        </Button>

                        <Typography className={classes.contains} variant="h2" gutterBottom>
                            <br/> <br/>
                            * Example Dataset
                        </Typography>
                        <div className={classes.lower}>
                            <FormControl className={classes.formControl}>
                                <Select
                                    value={data}
                                    onChange={handleChange}
                                    displayEmpty
                                    className={classes.selectEmpty}
                                    inputProps={{ 'aria-label': 'Without label' }}
                                >
                                    <MenuItem value="">
                                        <em>Choose Data</em>
                                    </MenuItem>
                                    <MenuItem value={'CarAccident'}>CarAccident</MenuItem>
                                    <MenuItem value={'Disease'}>Disease</MenuItem>
                                    <MenuItem value={'StockPrice'}>StockPrice</MenuItem>
                                </Select>
                            </FormControl>
                            <Button type="submit"> Submit </Button>
                        </div>
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
        minHeight: '100vh',
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
        height: '75vh',
        marginTop: 0,
        display: 'grid',
        placeContent: 'center',
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
        marginTop: theme.spacing(3),
    },
    lower: {
        display: 'flex',
        flexDirection: 'column',
    }
}));

