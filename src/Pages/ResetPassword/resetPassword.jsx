import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Services from "C:/ReactProject2/fundoonotes/src/Services/userService.js";
import Snackbar from "@material-ui/core/Snackbar";
import "./resetPassword.css";
import Checkbox from "@material-ui/core/Checkbox";
import MuiAlert from "@material-ui/lab/Alert";
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
      confirmPassword: "",
      confirmPasswordError: "",
      confirmPasswordFlag: false,
      setOpen: false,
      open: false,
      snackMessage: "",
      snackType: ""
    };
  }
  token = this.props.match.params.token;

clickShowPass = () => {
  this.setState({
    ...this.state,
    showPassword: !this.state.showPassword,
  });
};

change = (e) => {
  this.setState({
    [e.target.name]: e.target.value,
  });
};

validate = () => {
  let isError = false;
  const errors = {
    passwordError: "",
    passwordFlag: false,
    confirmPasswordError: "",
    confirmPasswordFlag: false,
  };

  if (this.state.password.length === 0) {
    errors.passwordFlag = true;
    errors.confirmPasswordFlag = true;
    isError = true;
    errors.passwordError = "Enter Password";
  }

  if (this.state.confirmPassword !== this.state.password) {
    errors.confirmPasswordFlag = true;
    isError = true;
    errors.confirmPasswordError = "Passwords didn't match.";
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
      confirmPasswordFlag: false,
      confirmPasswordError: "",
      passwordFlag: false,
      passwordError: "",
      password: "",
      confirmPassword: "",
    });
    let resetPasswordData = {
      newPassword: this.state.password,
    
    };
    service
      .resetPassword(resetPasswordData, this.token).then((result) => {
        let obj = JSON.stringify(result);
      console.log("Password reset successful" , obj);
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
        <div  className="page">
        <div className="header">
                        <div className="fundooContainerReset">
                            <div className="blue">F</div>
                            <div className="red">u</div>
                            <div className="yellow">n</div>
                            <div className="blue">d</div>
                            <div className="green">o</div>
                            <div className="red">o</div>
                        </div>
          </div>
          <span className="titleR">Reset Password</span>
          <div className="headerTextR">Use your Fundoo Account</div>
          <form className="Form">
          <div className="inputField">
              <TextField
                size="small"
                className="input"
                label="Password"
                type="password"
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
                label="Confirm"
                variant="outlined"
                type="password"
                name="confirmPassword"
                type={this.state.showPassword ? "text" : "password"}
                value={this.state.confirmPassword}
                helperText={this.state.confirmPasswordError}
                error={this.state.confirmPasswordFlag}
                onChange={(e) => this.change(e)}
              />
            </div>
            <span className="checkBoxInputs">
                <Checkbox
                  onClick={this.clickShowPass}
                  color="primary"
                  className="showPass"
                />
                Show Password
              </span>
            <span className="resetFooter">
              <div className="button">
                <Button
                  size="small"
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