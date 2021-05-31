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


export default function ChooseData() {
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