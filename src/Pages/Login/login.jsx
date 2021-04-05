import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Services from "C:/ReactProject2/fundoonotes/src/Services/userService.js";
import Checkbox from "@material-ui/core/Checkbox";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import "./login.css";
const service = new Services();

 function Alert(props) {
  return <MuiAlert variant="filled" {...props} />;
} 

export default class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    email: "",
    password: "",
    emailError: "",
    emailFlag: false,
    passwordError: "",
    passwordFlag: false,
    showPassword: false,
    snackMessage: "",
    snackType: ""
  };
  }

  nextPath(path) {
    this.props.history.push(path);
  }

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
      emailError: "",
      emailFlag: false,
      passwordError: "",
      passwordFlag: false,
    };

    if (this.state.email.length === 0) {
      errors.emailFlag = true;
      isError = true;
      errors.emailError = "Enter your Email ";
    }
    if (!/[a-zA-Z0-9._]+[@]{1}[a-zA-Z120-9]*[.]{1}[a-zA-Z]*$/.test(this.state.email)) {
      errors.emailFlag = true;
      isError = true;
      errors.emailError = "Enter email Address";
    }
    if (this.state.password.length === 0) {
      errors.passwordFlag = true;
      isError = true;
      errors.passwordError = "Enter Password";
    }

    this.setState({
      ...errors,
    });

    return isError;
  };

  handleClose = () => {
    this.setState({
      open: false,
      setOpen: false
    })
  };

  onSubmit = (e) => {
    e.preventDefault();
    const err = this.validate();
    if (!err) {
      this.setState({
        email: "",
        emailFlag: false,
        emailError: "",
        password: "",
        passwordFlag: false,
        passwordError: "",
      });
      let loginData = {
        email: this.state.email,
        password: this.state.password,
      };
      service.login(loginData).then((Data) => {
       console.log("Login Successful ",Data)
        this.setState({snackType: "success", snackMessage: "Login successful", open: true, setOpen: true})
        this.nextPath("../dashboard");
        })
        .catch((loginData) => {
          console.log("Login Failed" + loginData);
          this.setState({snackType: "error", snackMessage: "Login Failed", open: true, setOpen: true})
        });
    } else {
      console.log("Login Failed");
    }
  };

  render() {
    return (
      <div className="main">
        <div  className="pageL">
        <div className="regHeader">
                        <div className="fundooContainerL">
                            <div className="blue">F</div>
                            <div className="red">u</div>
                            <div className="yellow">n</div>
                            <div className="blue">d</div>
                            <div className="green">o</div>
                            <div className="red">o</div>
                        </div>
          <span className="signIn">Sign in</span>
          <div className="headerText1"> Use your Fundoo Account</div>
          </div>
          <form className="loginForm">
            <div className="inputfield">
              <TextField
                size="small"
                className="input"
                label="Email"
                variant="outlined"
                fullWidth
                name="email"
                value={this.state.email}
                helperText={this.state.emailError}
                error={this.state.emailFlag}
                onChange={(e) => this.change(e)}
              />
            </div>
            <div className="passField">
              <TextField
                size="small"
                className="input"
                label="Password"
                type={this.state.showPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                name="password"
                value={this.state.password}
                onChange={(e) => this.change(e)}
                error={this.state.passwordFlag}
                helperText={this.state.passwordError}
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
            <div className="forgetPassword">
              <Button color="primary" onClick={() => this.nextPath('../forgotPassword')} >Forgot password?</Button>
            </div>
            <span className="footer">
              <div className="button">
                <Button color="primary" size="small"  onClick={() => this.nextPath('../registration')} >
                  Create account
                </Button>

              </div>
              <div className="button">
                <Button
                   size="small"
                  variant="contained"
                  color="primary"
                  onClick={(e) => this.onSubmit(e)}>
                  Sign In
                </Button>
              </div>
            </span>
          </form>
        </div>
        <div>
        <Snackbar open={this.state.open} autoHideDuration={3000} onClose={this.handleClose}  >
          <Alert severity={this.state.snackType}>
            {this.state.snackMessage}
          </Alert>
        </Snackbar >
      </div>
      </div>
    );
  }
}