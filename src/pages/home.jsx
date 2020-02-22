import React, { Component } from 'react';
import {BrowserRouter as Router,Switch,Link,Route} from 'react-router-dom';
class home extends Component {
    constructor (props) {
            super(props)
            this.state={
                page:true,
                isUniversityHead:false,
                isCollegeHead:false,
                isClicked:false,
                amount:0,
                baluni:0,
                isViewLog:false,
                allLogs:[]
            }
    }

    componentDidMount = async () => {
        await this.setUser();
        const contract = this.props.passedStates.contract;
        const baluni = await contract.methods.getBalance("university").call();
        this.setState({baluni});
    }
    setUser = async () => {
        
        const account = this.props.passedStates.account;
        const contract = this.props.passedStates.contract;
        const web3 = this.props.passedStates.web3;
        const user = await contract.methods.checkUser(account).call();
        if(user==="university")
        this.setState({isUniversityHead:true});
        else if(user !== "")
        console.log(user);
        
    }
    handleClick = async (e) => {
        e.preventDefault();
        let click=this.state.isClicked;
        click=!click;
        this.setState({isClicked:click})
    }

    handleChange = async (e) => {
        this.setState({amount:e.target.value})
        console.log(e.target.value);
    }
    handleTransaction = async (e) => {
        e.preventDefault();
        const account = this.props.passedStates.account;
        const contract = this.props.passedStates.contract;
        const amt = this.state.amount;
        let rec1 = `Funds allotted to College: Rs.${amt}`;
        let rec2 = `Funds received from University: Rs.${amt}`;
        await contract.methods.unitocol(rec1,rec2,amt).send({from:account});
        const baluni = await contract.methods.getBalance("university").call();
        this.setState({baluni})
        // console.log("University balance is",baluni);
        // console.log("College balance is",balcol);
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
            await this.extractLogs("university");
        }

        
    }
    
    render() {
        return (
            <div>

                <h1>Welcome to homepage!!</h1><br></br>
                <h3><b>Fund Allotted : {this.state.baluni}</b></h3>
                <br></br><br></br>
                <button type="button" value="view_log" onClick={this.handleLogs}>View logs</button>
                {(this.state.isViewLog===true) && (
                    <div className="grid-container">{this.state.allLogs}</div>
                )}
                {(this.state.isUniversityHead===true) &&
                
                    <div>
                
                    <button onClick={this.handleClick}>Want To Transfer Funds..</button>
                    {   (this.state.isClicked===true) &&
                        (<div><input type="number" id="unitnsfund" onChange={this.handleChange} placeholder="0.00"></input>
                        <button type="submit" value="Transfer Fund" onClick={this.handleTransaction}>Transfer Fund</button>
                        </div>
                        )}
                
                    </div>
                }
            </div>
        );
    }
}

export default home;