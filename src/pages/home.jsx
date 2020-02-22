import React, { Component } from 'react';
import {BrowserRouter as Router,Switch,Link,Route} from 'react-router-dom';
class home extends Component {
    constructor (props) {
            super(props)
            this.state={
            page:true
            }
    }
    render() {
        return (
            <div>
             <h1>Home page!</h1>
            </div>
        );
    }
}

export default home;