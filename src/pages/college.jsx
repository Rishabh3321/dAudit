import React, { Component } from 'react';
import {BrowserRouter as Router,Switch,Link,Route} from 'react-router-dom';
import Cultural from './cultural';
import Sports from './sports';
import Academics from './academics';
import Maintenance from './maintenance';

class college extends Component {
    constructor(props)
    {
        super(props)
        this.state={
            balclg:0,
            isViewLog:false,
            allLogs:[]
        }
    }
    componentDidMount = async () => {
        const contract = this.props.passedStates.contract;
        const balclg = await contract.methods.getBalance("college").call();
        this.setState({balclg});
        console.log(this.props);
    }
    extractLogs = async(acc)=>{
        const contract = this.props.passedStates.contract;
        let totalLogs = await contract.methods.getCount(acc).call();
        console.log("totalLogs",totalLogs);
        for(let i=totalLogs-1;i>=0;i--)
        {
            let log  = await contract.methods.getReciept(acc,i).call();
            let joined = this.state.allLogs.concat(<div class="grid-item"><b>{log}</b></div>)
			this.setState({allLogs:joined});
        }
    }

    handleLogs=async()=>
    {
        let click=this.state.isViewLog;
        click=!click;
        this.setState({isViewLog:click})
        if(click===true){
            this.setState({allLogs : []});
            await this.extractLogs("college");
        }

        
    }
    render() {
        return (<Router>
            
            {(this.props.passedStates.isCollegePageClicked===true) &&
        
            (<div>
            <h1>Welcome to Collegepage!!</h1><br></br>
            <h3><b>Fund Allotted : {this.state.balclg}</b></h3>
            <br></br><br></br>
            <button type="button" value="view_log" onClick={this.handleLogs}>View logs</button>
                {(this.state.isViewLog===true) && (
                    <div className="grid-container">{this.state.allLogs}</div>
                )}

            <button className="btn btn-secondary lb-2 float-left" onClick={this.props.colPage} ><Link to='/cultural'>Cultural</Link></button><br></br>
            <button className="btn btn-secondary lb-2 float-right" onClick={this.props.colPage} ><Link to='/sports'>Sports</Link></button><br></br>
            <button className="btn btn-secondary lb-2 float-left" onClick={this.props.colPage} ><Link to='/academics'>Academics</Link></button><br></br>
            <button className="btn btn-secondary lb-2 float-right" onClick={this.props.colPage} ><Link to='/maintenance'>Maintenance</Link></button><br></br>


            
            </div> )};
            <Switch>
            <Route path='/cultural' ><Cultural passedStates={this.props.passedStates}  /></Route>
            <Route path='/sports'><Sports passedStates={this.props.passedStates} /></Route>
            <Route path='/academics'><Academics passedStates={this.props.passedStates} /></Route>
            <Route path='/maintenance'><Maintenance passedStates={this.props.passedStates} check={this.props.colPage} /></Route>
            </Switch>
            </Router>
        );
    }
}

export default college;