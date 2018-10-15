import React from "react";
import { Container, Form, Message } from "semantic-ui-react";
import { connect } from "react-redux";
import { changeTab, saveChange } from "./formActionCreator";

const options = [
  { key: "eth", text: "ETH", value: "ETH" },
  { key: "usd", text: "USD", value: "USD" }
];

const mapStateToProps = state => ({
  items: state.form.items,
  isLogin: state.auth.isLogin
});

const mapDispatchToProps = dispatch => ({
  onTabChange(data) {
    dispatch(changeTab(data))
  },
  onButtonClick(data) {
    dispatch(saveChange(data))
  }
})

class TargetForm extends React.Component {
  state = this.props.items;

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSelectChange = (e, { value }) => {
    this.setState({ currency: value });
  };

  handleClick = e => {
    e.preventDefault();
    if (this.state.title !== "" && this.props.isLogin) {
      this.props.onButtonClick(this.state);
      this.props.onTabChange(1);
    }
  };

  render() {
    const { target, title, currency } = this.state;
    const isLogin = this.props.isLogin;

    return (
      <Container textAlign="left">
        <h2>Start a Campaign</h2>
        <Form>
          <Form.Field label="How much money would you like to raise?" />
          <Form.Group>
            <Form.Input
              name="target"
              placeholder="minimum 50"
              type="number"
              onChange={this.handleChange}
              value={target}
            />
            <Form.Select
              options={options}
              value={currency}
              onChange={this.handleSelectChange}
            />
          </Form.Group>
          <label>50 ETH Min</label>
          <p />
          <p />
          <Form.Input
            name="title"
            label="What is the title of your campaign?"
            required
            fluid
            onChange={this.handleChange}
            value={title}
            placeholder="Campaign title..."
          />
          {isLogin ? "" :
            <Message
              negative
              compact
              content='Please Log In before continue'
            />}
          <Form.Button type="submit" color="green" onClick={this.handleClick}>
            Save & Continue
          </Form.Button>
        </Form>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TargetForm);
