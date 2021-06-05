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
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';


export default function ChooseData() {
    const classes = useStyles();
    const [data, setData] = React.useState('');

    const handleChange = (event) => {
        setData(event.target.value);
    };

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
                        1. Choose Dataset <br/> <br/>
                    </Typography>
                    <Button variant="contained" component="label">
                        Upload File
                        <input type="file" hidden/>
                    </Button>
                    <Typography className={classes.contains} variant="h2" gutterBottom>
                        <br/> <br/>
                        * Example Dataset
                    </Typography>
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
    }
}));


const theme = createMuiTheme({
    typography: {
      fontFamily: [
          'Noto Sans KR', 'sans-serif'
      ].join(','),
    },
});