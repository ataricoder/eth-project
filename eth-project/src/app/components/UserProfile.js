import React from "react";
import { Link } from "react-router-dom";
import LoginSignup from "../user/LoginSignup";
import { connect } from "react-redux";
import { Modal, Button, Dropdown } from "semantic-ui-react";
import { logout } from "../user/userActionCreator";
import jwt from "jsonwebtoken";
import config from "../../utils/config";
import history from "../../utils/history"


const mapStateToProps = state => ({
  isLogin: state.auth.isLogin,
  token: state.auth.token,
  user: state.auth.userInfo
});

const mapDispatchToProps = dispatch => ({
  onLogoutClick() {
    dispatch(logout());
  },
  onUserVerifyFailure() {
    dispatch(logout());
  }
});

class UserProfile extends React.Component {
  handleClick = () => {
    this.props.onLogoutClick();
    history.push("/");
  };

  componentDidMount = () => {
    if (this.props.isLogin) {
      jwt.verify(this.props.token, config.jwtSecret, (err, decoded) => {
        if (err) {
          console.error(err)
          this.props.onUserVerifyFailure();
        }
        const date = decoded.expiry;

        if (date !== new Date().getMonth()) {
          this.props.onUserVerifyFailure();
        }
      });
    }
  };

  render() {
    const { fixed, isLogin } = this.props;

    switch (isLogin) {
      case true:
        const { firstName, lastName } = this.props.user;
        return (
          <div className="down">
            <Dropdown text={"Hello, " + firstName}>
              <Dropdown.Menu>
                <Dropdown.Item disabled>
                  <span>
                    Signed in as{" "}
                    <strong>
                      {firstName} {lastName}
                    </strong>
                  </span>
                </Dropdown.Item>
                <Link className="item" to="/explore">
                  {"My Campaigns"}
                </Link>
                <Link className="item" to="/explore">
                  {"My Contributions"}
                </Link>
                <Link className="item" to="/wallet">
                  {"My Wallet"}
                </Link>
                <Link className="item" to="/explore">
                  {"Profile"}
                </Link>
                <Dropdown.Divider />
                <Dropdown.Item onClick={this.handleClick}>
                  {"Sign Out"}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        );

      default:
        return (
          <div>
            <Modal
              size="tiny"
              trigger={
                <Button
                  size="medium"
                  compact
                  className={!fixed ? "inverted" : "google plus"}
                >
                  Log In
                </Button>
              }
            >
              <LoginSignup isLogin={true} />
            </Modal>
            <Modal
              size="tiny"
              trigger={
                <Button
                  size="medium"
                  compact
                  className={!fixed ? "inverted" : "primary"}
                  style={{ marginLeft: "0.5em" }}
                >
                  Sign Up
                </Button>
              }
            >
              <LoginSignup isLogin={false} />
            </Modal>
          </div>
        );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
