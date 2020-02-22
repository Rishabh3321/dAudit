import React, { Component } from 'react';


class maintenance extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            isCollegeHead:false,
            isMaintenanceHead:false,
            isClickedclg:false,
            isClickedmnt:false,
            balcol:0,
            balmnt:0,
            amount:0,
            amountmnt:0,
            isViewLog:false,
            allLogs :[]
        }
    }
    componentDidMount = async () => {
        await this.setUser();
    }
    setUser = async () => {
        
        const account = this.props.passedStates.account;
        const contract = this.props.passedStates.contract;
        const user = await contract.methods.checkUser(account).call();
        if(user==="college")
        {
            this.setState({isCollegeHead:true});
            this.setState({isMaintenanceHead:false})
        }
        else if(user==="maintenance")
        {
            this.setState({isMaintenanceHead:true});
            this.setState({isCollegeHead:false});
        }
        
        else if(user !== "")
        console.log(user);
        const balmnt = await contract.methods.getBalance("maintenance").call();
        this.setState({balmnt})

        
    }
    handleChange = (e) => {
        e.preventDefault();
        this.setState({amount:e.target.value})
        console.log(e.target.value)
    }
    handleChangemnt = (e) => {
        e.preventDefault();
        this.setState({amountmnt:e.target.value})
        console.log(e.target.value)
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
            await this.extractLogs("maintenance");
        }

        
    }
    
    handleTransaction = async (e) => {
        e.preventDefault();
        const account = this.props.passedStates.account;
        const contract = this.props.passedStates.contract;
        const amt = this.state.amount;
        let rec1 = `Funds allotted from College: Rs.${amt}`;
        let rec2 = `Funds received to Maintenance: Rs.${amt}`;
        await contract.methods.coltomnt(rec1,rec2,amt).send({from:account});
        const balcol = await contract.methods.getBalance("college").call();
        const balmnt = await contract.methods.getBalance("maintenance").call();
        this.setState({balcol})
        this.setState({balmnt})
        console.log("Maintenance balance is",balmnt);
        console.log("College balance is",balcol);
    }
    handleTransactionmnt = async (e) => {
        e.preventDefault();
        const account = this.props.passedStates.account;
        const contract = this.props.passedStates.contract;
        const amt = this.state.amountmnt;
        let rec1 = `Funds updated by Maintenance: Rs.${amt}`;
        let rec2 = "maintenance";
        await contract.methods.updateBalance(rec1,rec2,amt).send({from:account});
        //const balcol = await contract.methods.getBalance("college").call();
        const balmnt = await contract.methods.getBalance("maintenance").call();
        //this.setState({balcol})
        this.setState({balmnt})
        console.log("Maintenance balance is",balmnt);
         //console.log("College balance is",balcol);
    }
    render() {
        return (
            <div>
            {
                ( this.props.passedStates.isChildPage===true ) && 
            (   <div>
                <h1>Amount allotted : {this.state.balmnt}</h1>
                <button type="button" value="view_log" onClick={this.handleLogs}>View logs</button>
                {(this.state.isViewLog===true) && (
                    <div className="grid-container">{this.state.allLogs}</div>
                )}

                {(this.state.isCollegeHead===true) &&
                    (<div><input type="number" id="coltnsfund" onChange={this.handleChange} placeholder="0.00"></input>
                        <button type="submit" value="Transfer Fund" onClick={this.handleTransaction}>Transfer Fund</button>
                    </div>)
                }

                {(this.state.isMaintenanceHead===true) &&
                    (<div><input type="number" id="coltnsfundmnt" onChange={this.handleChangemnt} placeholder="0.00"></input>
                <button type="submit" value="Update Fund" onClick={this.handleTransactionmnt}>Update Fund</button>
                </div>)
            
            }
            
            </div>)
        };
        </div>
        )
    }
}

export default maintenance;