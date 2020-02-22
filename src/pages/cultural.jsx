import React, { Component } from 'react';


class cultural extends Component {
    constructor(props)
    {
        super(props)
        this.state={
            isCollegeHead:false,
            isCulturalHead:false,
            isClickedclg:false,
            isClickedcul:false,
            balcol:0,
            balcul:0,
            amount:0,
            amountcul:0,
            allLogs : []
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
        this.setState({isCollegeHead:true});
        else if(user==="cultural")
        this.setState({isCulturalHead:true});
        else if(user !== "")
        console.log(user);
        const balcul = await contract.methods.getBalance("cultural").call();
        this.setState({balcul})
        
    }
    handleChange = (e) => {
        e.preventDefault();
        this.setState({amount:e.target.value})
        console.log(e.target.value)
    }
    handleChangecul = (e) => {
        e.preventDefault();
        this.setState({amountcul:e.target.value})
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
            await this.extractLogs("cultural");
        }

        
    }
    handleTransaction = async (e) => {
        e.preventDefault();
        const account = this.props.passedStates.account;
        const contract = this.props.passedStates.contract;
        const amt = this.state.amount;
        let rec1 = `Funds allotted from College: Rs.${amt}`;
        let rec2 = `Funds received to Cultural: Rs.${amt}`;
        await contract.methods.coltocul(rec1,rec2,amt).send({from:account});
        const balcol = await contract.methods.getBalance("college").call();
        const balcul = await contract.methods.getBalance("cultural").call();
        this.setState({balcol})
        this.setState({balcul})
        console.log("Cultural balance is",balcul);
         console.log("College balance is",balcol);
    }
    handleTransactioncul = async (e) => {
        e.preventDefault();
        const account = this.props.passedStates.account;
        const contract = this.props.passedStates.contract;
        const amt = this.state.amountcul;
        let rec1 = `Funds updated by Sports: Rs.${amt}`;
        let rec2 = `cultural`;
        await contract.methods.updateBalance(rec1,rec2,amt).send({from:account});
        //const balcol = await contract.methods.getBalance("college").call();
        const balcul = await contract.methods.getBalance("cultural").call();
        //this.setState({balcol})
        this.setState({balcul})
        console.log("Cultural balance is",balcul);
         //console.log("College balance is",balcol);
    }
    render() {
        return (
            <div>
            {
                ( this.props.passedStates.isChildPage===true ) && 
            (   <div>
                <h1>Amount allotted : {this.state.balcul}</h1>
                <button type="button" value="view_log" onClick={this.handleLogs}>View logs</button>
                {(this.state.isViewLog===true) && (
                    <div className="grid-container">{this.state.allLogs}</div>
                )}

                {(this.state.isCollegeHead===true) &&
                    (<div><input type="number" id="coltnsfund" onChange={this.handleChange} placeholder="0.00"></input>
                        <button type="submit" value="Transfer Fund" onClick={this.handleTransaction}>Transfer Fund</button>
                    </div>)
                }

                {(this.state.isCulturalHead===true) &&
                    (<div><input type="number" id="coltnsfundcul" onChange={this.handleChangecul} placeholder="0.00"></input>
                <button type="submit" value="Update Fund" onClick={this.handleTransactioncul}>Update Fund</button>
                </div>)
            
            }
            
            </div>)
        };
        </div>
        )
    }
}

export default cultural;