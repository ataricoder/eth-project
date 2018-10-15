import React from "react";
import { Container, Button, Icon, Header, Table } from "semantic-ui-react";
import { connect } from "react-redux";
import ItemMain from "../explore/ItemMain"
import { postCampaign, resetForm } from "./formActionCreator";
import { deployContract } from "../../utils/web3/Web3ActionCreator";

const mapStateToProps = state => ({
  items: state.form.items,
  images: state.form.images,
  postStatus: state.form.postStatus,
  token: state.auth.token,
  runner_id: state.auth.userInfo.userId,
  campaignId: state.form.campaignId,
  campaignAddress: state.form.campaignAddress,
  isLoading: state.web3.isLoading
});

const mapDispatchToProps = dispatch => ({
  onSubmitClick(data, token) {
    dispatch(postCampaign(data, token));
  },
  onDeployContract(data, token) {
    dispatch(deployContract(data, token));
  },
  onReset() {
    dispatch(resetForm());
  }
});

class PreviewForm extends React.Component {

  handleClick = (e) => {
    e.preventDefault()
    const item = {...this.props.items, ...this.props.images, runner_id: this.props.runner_id}
    this.props.onSubmitClick(item, this.props.token)
  }

  handleDeploy = (e) => {
    e.preventDefault()
    const initOption = [this.props.items.duration, this.props.campaignId, this.props.items.beneAccount, this.props.items.target];
    this.props.onDeployContract(initOption, this.props.token);
  }

  handleReset = () => {
    this.props.onReset();
  }

  render() {
    const status = this.props.postStatus;
    const contractAddress = this.props.campaignAddress;
    const isLoading = this.props.isLoading;

    if(status === "deployed") {
      return <Container textAlign="left">
          <Header as="h2" content="Contract Deployment Success!" subheader={"Congratulations! Your smart contract is created. Contract Address: " + contractAddress} />
          <Button primary onClick={this.handleReset}>OK</Button>
        </Container>;
    }

    if(status === "posted") {
      return <Container textAlign="left">
          <Header as="h2" content="Submission Success!" subheader="Congratulations! Your campaign has been posted. Deploy your contract to blockchain now!" />
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan="2">
                  Contract Overview
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Campaign ID</Table.Cell>
                <Table.Cell>{this.props.campaignId}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Beneficiary Account</Table.Cell>
                <Table.Cell>{this.props.items.beneAccount}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Target</Table.Cell>
                <Table.Cell>{this.props.items.target} ETH</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Duration</Table.Cell>
                <Table.Cell>{this.props.items.duration} Days</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <Button primary onClick={this.handleDeploy} disabled={isLoading ? true : false}>
            {isLoading ? <span><Icon loading name="spinner" />{"Deploying"}</span> : <span><Icon name="cube" />{"Deploy Contract"}</span> }
          </Button>
        </Container>;
    }

    return <Container textAlign="left">
        <ItemMain { ...this.props.items} { ...this.props.images } demo={true}  />

        <Button color="green" onClick={this.handleClick}>
          { status === "started" ?
            <Icon loading name='spinner' />
            :
            <Icon name='send' /> } Submit
        </Button>
      </Container>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PreviewForm);
