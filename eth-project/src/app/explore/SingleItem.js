import React from 'react';
import ItemMain from './ItemMain'
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom'
import { Container, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import { ContributeContract } from "../../utils/web3/Web3ActionCreator";

const mapStateToProps = state => ({
  items: state.items,
  token: state.auth.token,
  isLogin: state.auth.isLogin
});

const mapDispatchToProps = dispatch => ({
  onContributeToContract(id, address, value, token) {
    dispatch(ContributeContract(id, address, value, token));
  }
});

class SingleItem extends React.Component {
  state = {
    amount: 5
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleBack = (id, contractAddress) => {
    if(this.state.amount > 0){
      this.props.onContributeToContract(id, contractAddress, this.state.amount, this.props.token);
    }
  };

  render() {
    const { items } = this.props.items;

    const item = items.filter(item => {
      return item.id === this.props.match.params.id;
    });

    const isLogin = this.props.isLogin

    const pending = this.props.items.pending
    const { amount } = this.state;

    return (
      <div>
        <NavBar active="explore" fixed={true} />
        <Container textAlign="left" style={{ padding: "6em 0" }}>
          <Container textAlign="left" style={{ paddingBottom: "2em" }}>
            <Link to="/explore">
              <Icon name="long arrow left" />
              {"Back to Main Page"}
            </Link>
          </Container>
          <ItemMain
            {...item[0]}
            demo={isLogin ? false : true}
            onChange={this.handleChange}
            value={amount}
            loading={pending}
            onClick={() => this.handleBack(item[0].id, item[0].contractAddress)}
          />
        </Container>
        <Footer fixed={true}/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleItem);
