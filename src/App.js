import './App.css';
import {Component} from "react";
import {BrowserRouter, Route} from 'react-router-dom';
import Main from './Main';
import Next from './Next';
import ChooseData from './ChooseData';
import EditData from './EditData';
import Weight from './Weight';
import Explanation from './Explanation';

export default class App extends Component {
    render() {
        return(
            <div>
                <BrowserRouter>
                    <Route path="/" exact component={Main} />
                    <Route path="/Next" component={Next} />
                    <Route path="/ChooseData" component={ChooseData} />
                    <Route path="/EditData" component={EditData} />
                    <Route path="/Weight" component={Weight} />
                    <Route path="/Explanation" component={Explanation} />
                </BrowserRouter>
            </div>
        )
    }
}
