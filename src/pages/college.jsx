import React, { Component } from 'react';
import {BrowserRouter as Router,Switch,Link,Route} from 'react-router-dom';
import Cultural from './cultural';
import Sports from './sports';
import Academics from './academics';
import Maintenance from './maintenance';

class college extends Component {
    render() {
        return (<Router>
            <div>

            <button class="btn btn-success"><Link to='/cultural'>Cultural</Link></button>
            <button class="btn btn-danger"><Link to='/sports'>Sports</Link></button>
            <button class="btn btn-success"><Link to='/academics'>Academics</Link></button>
            <button class="btn btn-warning"><Link to='/maintenance'>Maintenance</Link></button>


                <Switch>
                <Route path='/cultural'><Cultural /></Route>
                <Route path='/sports'><Sports /></Route>
                <Route path='/academics'><Academics /></Route>
                <Route path='/maintenance'><Maintenance /></Route>
                </Switch>
            </div>
            </Router>
        );
    }
}

export default college;