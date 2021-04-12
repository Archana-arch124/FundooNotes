import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Services from "../../Services/userServices";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import "./resetPassword.css";
import { Checkbox } from "@material-ui/core";
const service = new Services();

function Alert(props) {
  return <MuiAlert variant="filled" {...props} />;
}

export default class forgotPassword extends React.Component {
  nextPath(path) {
    this.props.history.push(path);
  }

  constructor(props) {
    super(props);
    this.state = {
      password: "",
      passwordError: "",
      passwordFlag: false,
      conformPassword: "",
      conformPasswordError: "",
      conformPasswordFlag: false,
      setOpen: false,
      open: false,
      showPassword: false,
      snackMessage: "",
      snackType: ""
    };
  }
  token = this.props.match.params.token;
  
  change = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  clickShowPass = () => {
    this.setState({
      ...this.state,
      showPassword: !this.state.showPassword,
    });
  };

  validate = () => {
    let isError = false;
    const errors = {
      passwordError: "",
      passwordFlag: false,
      conformPasswordError: "",
      conformPasswordFlag: false,
    };

    if (this.state.password.length === 0) {
      errors.passwordFlag = true;
      errors.conformPasswordFlag = true;
      isError = true;
      errors.passwordError = "Enter Password";
    }

    if (this.state.conformPassword !== this.state.password) {
      errors.conformPasswordFlag = true;
      isError = true;
      errors.conformPasswordError = "Passwords didn't match.";
    }

    this.setState({
      ...errors,
    });

    return isError;
  };

  onSubmit = (e) => {
    e.preventDefault();
    const err = this.validate();
    if (!err) {
      this.setState({
        conformPasswordFlag: false,
        conformPasswordError: "",
        passwordFlag: false,
        passwordError: "",
        password: "",
        conformPassword: "",
      });
      let resetPasswordData = {
        newPassword: this.state.password,
      
      };
      service
        .resetPassword(resetPasswordData, this.token).then((result) => {
          let obj = JSON.stringify(result);
          console.log("Password reset successful" + obj);
          this.setState({snackType: "success", snackMessage: "Password reset successful", open: true, setOpen: true})
          this.nextPath("../login");
        })
        .catch((error) => {
          console.log("Password reset Failed" + error);
          this.setState({snackType: "error", snackMessage: "Password reset Failed", open: true, setOpen: true})
        });
    } else {
      console.log("Reset Failed");
    }
  };

  render() {
    return (
      <div className="main">
        <div elevation={0} className="page">
          <span className="inlineTitle">
            <b>
              <font color="#1976d2">F</font>
              <font color="#e53935">u</font>
              <font color="#ffb74d">n</font>
              <font color="#1976d2">d</font>
              <font color="#388e3c">o</font>
              <font color="#e53935">o</font>
            </b>
          </span>
          <span className="signIn1">Reset Password</span>
          Use your Fundoo Account
          <form className="Form">
            <div className="inputField">
              <TextField
                size="small"
                className="input"
                label="Password"
                variant="outlined"
                name="password"
                type={this.state.showPassword ? "text" : "password"}
                value={this.state.password}
                onChange={(e) => this.change(e)}
                error={this.state.passwordFlag}
                helperText={this.state.passwordError}
              />
            </div>
            <div className="inputField">
              <TextField
                size="small"
                className="input"
                label="Conform"
                variant="outlined"
                type={this.state.showPassword ? "text" : "password"}
                name="conformPassword"
                value={this.state.conformPassword}
                helperText={this.state.conformPasswordError}
                error={this.state.conformPasswordFlag}
                onChange={(e) => this.change(e)}
              />
            </div>
            <span className="checkBox">
                <Checkbox
                  onClick={this.clickShowPass}
                  color="primary"
                  className="showPass"
                />
                Show Password
              </span>
            <span className="buttonFooter">
              <div className="button">
                <Button
                  variant="contained"
                  onClick={(e) => this.onSubmit(e)}
                  color="primary"
                >
                  Set Password
                </Button>
              </div>
            </span>
          </form>
        </div>
        <div>
        <Snackbar open={this.state.open} autoHideDuration={3000} >
          <Alert severity={this.state.snackType}>
            {this.state.snackMessage}
          </Alert>
        </Snackbar>
      </div>
      </div>
    );
  }
}
