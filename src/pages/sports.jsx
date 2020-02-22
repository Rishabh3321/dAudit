import React, { Component } from 'react';


class sports extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            isCollegeHead:false,
            isSportsHead:false,
            isClickedclg:false,
            isClickedspt:false,
            balcol:0,
            balspt:0,
            amount:0,
            amountspt:0,
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
            this.setState({isSportsHead:false})
        }
        else if(user==="sports")
        {
            this.setState({isSportsHead:true});
            this.setState({isCollegeHead:false});
        }
        
        else if(user !== "")
        console.log(user);
        const balspt = await contract.methods.getBalance("sports").call();
        this.setState({balspt})
        
    }
    handleChange = (e) => {
        e.preventDefault();
        this.setState({amount:e.target.value})
        console.log(e.target.value)
    }
    handleChangespt = (e) => {
        e.preventDefault();
        this.setState({amountspt:e.target.value})
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
            await this.extractLogs("sports");
        }

        
    }
    
    handleTransaction = async (e) => {
        e.preventDefault();
        const account = this.props.passedStates.account;
        const contract = this.props.passedStates.contract;
        const amt = this.state.amount;
        let rec1 = `Funds allotted from College: Rs.${amt}`;
        let rec2 = `Funds received to Sports: Rs.${amt}`;
        await contract.methods.coltospt(rec1,rec2,amt).send({from:account});
        const balcol = await contract.methods.getBalance("college").call();
        const balspt = await contract.methods.getBalance("sports").call();
        this.setState({balcol})
        this.setState({balspt})
        console.log("Sports balance is",balspt);
        console.log("College balance is",balcol);
    }
    handleTransactionspt = async (e) => {
        e.preventDefault();
        const account = this.props.passedStates.account;
        const contract = this.props.passedStates.contract;
        const amt = this.state.amountspt;
        let rec1 = `Funds updated by Maintenance: Rs.${amt}`;
        let rec2 = "sports";
        await contract.methods.updateBalance(rec1,rec2,amt).send({from:account});
        //const balcol = await contract.methods.getBalance("college").call();
        const balspt = await contract.methods.getBalance("sports").call();
        //this.setState({balcol})
        this.setState({balspt})
        console.log("Sports balance is",balspt);
         //console.log("College balance is",balcol);
    }
    render() {
        return (
            <div>
            {
                ( this.props.passedStates.isChildPage===true ) && 
            (   <div>
                <h1>Amount allotted : {this.state.balspt}</h1>
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
                    (<div><input type="number" id="coltnsfundspt" onChange={this.handleChangespt} placeholder="0.00"></input>
                <button type="submit" value="Update Fund" onClick={this.handleTransactionspt}>Update Fund</button>
                </div>)
            
            }
            
            </div>)
        };
        </div>
        )
    }
}

export default sports;