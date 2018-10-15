import React from "react";
import { connect } from "react-redux";
import NavBar from "../components/NavBar";
import { Input, Button, Statistic, Grid, Modal, Message, Segment, Container } from "semantic-ui-react";
import { web3 } from "../../utils/web3/getWeb3"
import { web3GetBalance, web3SendTransaction, web3GetAccount } from "../../utils/web3/Web3ActionCreator";
import Footer from "../components/Footer";

const mapStateToProps = state => ({
  balance: state.web3.balance,
});

const mapDispatchToProps = dispatch => ({
  onBalanceCheck(account) {
    dispatch(web3GetBalance(account));
  },
  onAccountLink(account) {
    dispatch(web3GetAccount(account));
  },
  onMakeTransaction(receipt) {
    dispatch(web3SendTransaction(receipt));
  }
});

class Wallet extends React.Component {
  state = {
    isLinked: false,
    key: "",
    account: "",
    receipient: "",
    amount: 0,
    message: null,
    clicked: false
  };

  componentDidMount() {
    web3.eth.getAccounts().then(res => {
      if (res.length > 0) {
        this.setState({ account: res[0].toString(), isLinked: true });
        this.props.onAccountLink(res[0].toString())
        setTimeout(() => {
          this.props.onBalanceCheck(this.state.account);
        }, 1000);
      }
    });

  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleClick = () => {
    this.props.onBalanceCheck(this.state.account);
  };

  handleTransfer = () => {
    if(this.state.account && this.state.receipient && this.state.amount > 0){
      this.setState({ clicked: true });
      web3.eth.sendTransaction({
        from: this.state.account,
        to: this.state.receipient,
        value: web3.utils.toWei(this.state.amount, "ether")
      })
      .on('error', err => {
        console.log(err)
        return this.setState({ clicked: false });
      }) // If a out of gas error, the second parameter is the receipt.
      .then(receipt => {
        this.props.onMakeTransaction(receipt);
        this.setState({receipient: "", amount: 0, message: "Transaction Completed!", clicked: false})
        setTimeout(() => {
          this.setState({message: null});
          this.props.onBalanceCheck(this.state.account);
        }, 5000);
      })
    }
  }

  render() {
    const { isLinked, receipient, amount, message, clicked } = this.state;
    const { balance } = this.props;

    return <div>
        <NavBar active="" fixed={true} />
        <Container style={{ paddingTop: "8em" }}>
          <Grid centered columns={3}>
            <Segment raised color="grey">
              {isLinked ? "" : <Input name="key" label="Link to your private key" onChange={this.handleChange} placeholder="Search..." />}
              <Button secondary onClick={this.handleClick}>
                {isLinked ? "Linked" : "Link"} To Your Account
              </Button>
              <p />
              <div>
                <Statistic size="tiny">
                  <Statistic.Label>Balance</Statistic.Label>
                  <Statistic.Value>{balance} ETH</Statistic.Value>
                </Statistic>
              </div>
              <p />
              <Modal size="tiny" trigger={<Button compact color="orange" content="Send" />}>
                <Modal.Header>Transaction</Modal.Header>
                <Modal.Content>
                  {message ? <Message info>{message}</Message> : ""}
                  <Grid>
                    <Grid.Row columns={2}>
                      <Grid.Column>
                        <Input required placeholder="Receipient Address" fluid name="receipient" value={receipient} onChange={this.handleChange} />
                      </Grid.Column>
                      <Grid.Column>
                        <Input required placeholder="Amount" fluid type="number" name="amount" value={amount} onChange={this.handleChange} />
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column>
                        <Button color="red" onClick={this.handleTransfer} loading={clicked} disabled={clicked} content="Submit" fluid />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Modal.Content>
              </Modal>
            </Segment>
          </Grid>
        </Container>
        <Footer fixed={true}/>
      </div>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
