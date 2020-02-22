import React, { Component } from 'react';
import {BrowserRouter as Router,Switch,Link,Route} from 'react-router-dom';
import getWeb3 from './getWeb3';
import Home from './pages/home';
import College from './pages/college';
import dAudit from './dAudit';
class App extends Component {

  constructor (props) {
      super(props);
      this.state={
        web3:null,
        contract:null,
        account:null,
        accounts:null,
        isCollegePageClicked:false,
        isChildPage:false
      }
      this.handleCollegePageFalse.bind(this);
  }
componentDidMount = async ()=> {
  try{
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = dAudit.networks[networkId];
        const instance = new web3.eth.Contract(dAudit.abi, deployedNetwork.address);
        console.log(deployedNetwork)
        this.setState({
          web3,
          accounts,
          contract: instance
        });
        this.setState({account:accounts[0]})
        
        } catch (error) {
        alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      }
}
  handleCollegePageFalse = ()=>{
    this.setState({isCollegePageClicked:false});
    this.setState({isChildPage:true});
    console.log("hiii",this.state.isCollegePageClicked);
  }

  handleCollegePageTrue = ()=>{
    this.setState({isCollegePageClicked:true});
    this.setState({isChildPage:false});
    console.log("hello",this.state.isCollegePageClicked);
  }

  getAccount = async () => {
      const web3=this.state.web3;
      const accounts=this.state.accounts;
      this.setState({account:accounts[0]});
  }
  render() {
    if(!this.state.web3)
    return <div><p>Failed to load web3, accounts, or contract.</p></div>
    else
    {
      return (
        <Router>
          <div>
          <ul class="nav nav-tabs">
            <li class="nav-item">
              <button class="nav-link active"><Link to='/home'>Home</Link></button>
            </li>
            <li class="nav-item">
            <button class="nav-link active"><Link to='/college' onClick={this.handleCollegePageTrue} >College</Link></button>
            </li>
          </ul>
          <Switch>
            <Route path='/home'>
              <Home passedStates={this.state} />
            </Route>
            <Route path='/college'>
              <College passedStates={this.state} colPage={this.handleCollegePageFalse} />
            </Route>
            </Switch>
          </div>
        </Router>
      );}
  }

}

export default App;