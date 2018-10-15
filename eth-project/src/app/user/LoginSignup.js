import React from 'react'
import { Button, Form, Grid, Header, Message, Segment, Label } from 'semantic-ui-react'
import { connect } from "react-redux";
import { login, signup } from "./userActionCreator";
import { validateSignupForm, validateLoginForm } from "../../utils/validation"

const mapStateToProps = state => ({
  response: state.user.message,
  success: state.user.success
});

const mapDispatchToProps = dispatch => ({
  onSignupClick(user) {
    dispatch(signup(user))
  },
  onLoginClick(user) {
    dispatch(login(user))
  }
});

const initialState = {
  email: "",
  password: "",
  firstName: "",
  lastName: ""
}

class LoginSignup extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      isLogin : props.isLogin,
      message : null,
      errors : null,
      ...initialState
    }
  }

  handleClick = () => {
    this.setState({
      isLogin : !this.state.isLogin
    })
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSignup = () => {
    this.setState({ message: null, errors: null });
    const userForm = {...this.state}
    const validationResult = validateSignupForm(userForm);
    if (!validationResult.success) {
      return this.setState({
        message: validationResult.message,
        errors: validationResult.errors
      });
    }
    this.props.onSignupClick(userForm);
    this.setState({ ...initialState })
  }

  handleLogin = () => {
    this.setState({ message: null, errors: null });
    const userForm = {...this.state}
    const validationResult = validateLoginForm(userForm);
    if (!validationResult.success) {
      return this.setState({
        message: validationResult.message,
        errors: validationResult.errors
      });
    }
    this.props.onLoginClick(userForm);
    this.setState({ ...initialState });
  }

  render() {
    const { isLogin, message, errors } = this.state
    const { email, password, firstName, lastName } = this.state
    const { response, success } = this.props

    return <div className="signup-form">
        <Grid textAlign="center" style={{ padding: "4em 4em" }} verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" textAlign="center">
              {isLogin ? "Log in to your account" : "Sign up new account"}
            </Header>
            <Form size="large">
              <Segment stacked>
                {success ? <Message positive content={response} /> : ""}
                {success === false ? <Message negative list={Object.values(response)} /> : ""}
                {isLogin ? "" : <Form.Input fluid icon="user" iconPosition="left" placeholder="First Name" name="firstName" value={firstName} onChange={this.handleChange} />}
                {isLogin ? "" : <Form.Input fluid icon="user" iconPosition="left" placeholder="Last Name" name="lastName" value={lastName} onChange={this.handleChange} />}
                <Form.Input fluid icon="mail" iconPosition="left" placeholder="E-mail address" name="email" value={email} onChange={this.handleChange} />
                <Form.Input fluid icon="lock" iconPosition="left" placeholder="Password" type="password" name="password" onChange={this.handleChange} value={password} />
                {errors ? <Message negative header={message} list={Object.values(errors)} /> : ""}
                {isLogin ? <Button color="blue" fluid size="large" onClick={this.handleLogin}>
                    LOG IN
                  </Button> : <div>
                    <Button color="blue" fluid size="large" onClick={this.handleSignup}>
                      CREATE AN ACCOUNT
                    </Button>
                    <br />
                    <p>
                      By signing up you agree to our Terms of Use and
                      Privacy Policy.
                    </p>
                  </div>}
              </Segment>
            </Form>
            <Message warning>
              {isLogin ? <div>
                  New to us? <Label onClick={this.handleClick}>
                    Sign Up
                  </Label>
                </div> : <div>
                  Already have an account? <Label
                    onClick={this.handleClick}
                  >
                    Log In
                  </Label>
                </div>}
            </Message>
          </Grid.Column>
        </Grid>
      </div>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginSignup)
