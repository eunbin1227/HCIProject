import './App.css';
import {Component} from "react";
import {BrowserRouter, Route} from 'react-router-dom';
import Main from './Main';
import ChooseData from './ChooseData';
import EditData from './EditData';
import WeightData from './WeightData';
import Explanation from './Explanation';
import Feedback from './Feedback';
import SelectData from './SelectData';
import MakeModel from './MakeModel';
import WrapUp from './WrapUp';

export default class App extends Component {
    render() {
        return(
            <div>
                <BrowserRouter>
                    <Route path="/" exact component={Main} />
                    <Route path="/ChooseData" component={ChooseData} />
                    <Route path="/EditData" component={EditData} />
                    <Route path="/WeightData" component={WeightData} />
                    <Route path="/Explanation" component={Explanation} />
                    <Route path="/Feedback" component={Feedback} />
                    <Route path='/SelectData' component={SelectData} />
                    <Route path='/MakeModel' component={MakeModel} />
                    <Route path='/WrapUp' component={WrapUp} />
                </BrowserRouter>
            </div>
        )
    }
}
