import React, { Component } from 'react';


class academics extends Component {
    constructor(props)
    {
        super(props)
        this.state={
            isCollegeHead:false,
            isAcademicsHead:false,
            isClickedclg:false,
            isClickedacd:false,
            balcol:0,
            balacd:0,
            amount:0,
            amountacd:0,
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
        else if(user==="academics")
        this.setState({isAcademicsHead:true});
        else if(user !== "")
        console.log(user);
        const balacd = await contract.methods.getBalance("academics").call();
        this.setState({balacd})
        
    }
    handleChange = (e) => {
        e.preventDefault();
        this.setState({amount:e.target.value})
        console.log(e.target.value)
    }
    handleChangeacd = (e) => {
        e.preventDefault();
        this.setState({amountacd:e.target.value})
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
            await this.extractLogs("academics");
        }

        
    }
    handleTransaction = async (e) => {
        e.preventDefault();
        const account = this.props.passedStates.account;
        const contract = this.props.passedStates.contract;
        const amt = this.state.amount;
        let rec1 = `Funds allotted from College: Rs.${amt}`;
        let rec2 = `Funds received to Academics: Rs.${amt}`;
        await contract.methods.coltoacd(rec1,rec2,amt).send({from:account});
        const balcol = await contract.methods.getBalance("college").call();
        const balacd = await contract.methods.getBalance("sports").call();
        this.setState({balcol})
        this.setState({balacd})
        console.log("Academics balance is",balacd);
         console.log("College balance is",balcol);
    }
    handleTransactionacd = async (e) => {
        e.preventDefault();
        const account = this.props.passedStates.account;
        const contract = this.props.passedStates.contract;
        const amt = this.state.amountacd;
        let rec1 = `Funds updated by Sports: Rs.${amt}`;
        let rec2 = `academics`;
        await contract.methods.updateBalance(rec1,rec2,amt).send({from:account});
        //const balcol = await contract.methods.getBalance("college").call();
        const balacd = await contract.methods.getBalance("academics").call();
        //this.setState({balcol})
        this.setState({balacd})
        console.log("Sports balance is",balacd);
         //console.log("College balance is",balcol);
    }
    render() {
        return (
            <div>
            {
                ( this.props.passedStates.isChildPage===true ) && 
            (   <div>
                <h1>Amount allotted : {this.state.balacd}</h1>
                <button type="button" value="view_log" onClick={this.handleLogs}>View logs</button>
                {(this.state.isViewLog===true) && (
                    <div className="grid-container">{this.state.allLogs}</div>
                )}

                {(this.state.isCollegeHead===true) &&
                    (<div><input type="number" id="coltnsfund" onChange={this.handleChange} placeholder="0.00"></input>
                        <button type="submit" value="Transfer Fund" onClick={this.handleTransaction}>Transfer Fund</button>
                    </div>)
                }

                {(this.state.isAcademicsHead===true) &&
                    (<div><input type="number" id="coltnsfundacd" onChange={this.handleChangeacd} placeholder="0.00"></input>
                <button type="submit" value="Update Fund" onClick={this.handleTransactionacd}>Update Fund</button>
                </div>)
            
            }
            
            </div>)
        };
        </div>
        )
    }
}

export default academics;