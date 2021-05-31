import {
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
import CssBaseline from "@material-ui/core/CssBaseline";
import {Link} from 'react-router-dom';
import React from 'react';


export default function EditData() {
    const classes = useStyles();
    const [size, setSize] = React.useState(0);

    const marks = [
        {
            value: 0,
            label: '0',
        },
        {
            value: 25,
            label: '25',
        },
        {
            value: 50,
            label: '50',
        },
        {
            value: 75,
            label: '75'
        },
        {
            value: 100,
            label: '100',
        },
    ];

    function valuetext(value) {
        return `${value}`;
    }


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
                        2. Edit Dataset Size <br/> <br/>
                    </Typography>
                    <div>
                        <Typography id="discrete-slider-custom" className={classes.contains} variant="h2" gutterBottom>
                            Slide to choose appropriate size
                            <br/> <br/>
                            Maximum dataset size: 100
                            <br/>
                            {/*Current dataset size : {size}*/}
                            Current dataset size : 62
                            <br/>
                        </Typography>
                        <Slider
                            defaultValue={62}
                            getAriaValueText={valuetext}
                            aria-labelledby="discrete-slider-custom"
                            step={1}
                            valueLabelDisplay="auto"
                            marks={marks}
                        />
                    </div>
                </CardContent>
                <CardActions>
                    <div className={classes.bottomButton}>
                        <Button size="large" component={Link} to="/Weight">Next</Button>
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
    },
}));