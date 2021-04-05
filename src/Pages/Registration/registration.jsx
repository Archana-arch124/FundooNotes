import React from "react";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import "./registration.css";
import Img from "C:/ReactProject2/fundoonotes/src/Assets/logo.svg";
import Services from "C:/ReactProject2/fundoonotes/src/Services/userService.js";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const service = new Services();

function Alert(props) {
  return <MuiAlert variant="filled" {...props} />;
}
export default class Register extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      firstName: "",
      firstNameFlag: false,
      firstNameError: "",
      lastName: "",
      lastNameFlag: false,
      lastNameError: "",
      email: "",
      emailFlag: false,
      emailError: "",
      password: "",
      passwordFlag: false,
      passwordError: "",
      confirmPassword: "",
      confirmPasswordFlag: false,
      confirmPasswordError: "",
      showPassword: false,
      setOpen: false,
      open: false,
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
      firstNameError: "",
      firstNameFlag: false,
      lastNameError: "",
      lastNameFlag: false,
      emailError: "",
      emailFlag: false,
      passwordError: "",
      passwordFlag: false,
      confirmPasswordError: "",
      confirmPasswordFlag: false,
    };

    if (this.state.firstName.length === 0) {
      errors.firstNameFlag = true;
      isError = true;
      errors.firstNameError = "Enter first name";
    }
    if (this.state.lastName.length === 0) {
      errors.lastNameFlag = true;
      isError = true;
      errors.lastNameError = "Enter last name";
    }

    

    if (
      !/[a-zA-Z0-9._]+[@]{1}[a-zA-Z120-9]*[.]{1}[a-zA-Z]*$/.test(
        this.state.email
      )
    ) {
      errors.emailFlag = true;
      isError = true;
      errors.emailError = "Enter proper Email Id";
    }

    if (this.state.email.length === 0) {
      errors.emailFlag = true;
      isError = true;
      errors.emailError = "Enter Email ";
    }

    if (this.state.password.length === 0) {
      errors.passwordFlag = true;
      isError = true;
      errors.passwordError = "Enter a password";
    }

    if (this.state.confirmPassword !== this.state.password) {
      errors.confirmPasswordFlag = true;
      isError = true;
      errors.confirmPasswordError = "Passwords didn't match.";
    }

    if (this.state.confirmPassword.length === 0) {
      errors.confirmPasswordFlag = true;
      isError = true;
      errors.passwordError = "";
      errors.confirmPasswordError = "Confirm your password";
    }

    if (
      this.state.confirmPassword.length === 0 &&
      this.state.password.length === 0
    ) {
      errors.passwordFlag = true;
      errors.confirmPasswordFlag = true;
      isError = true;
      errors.passwordError = "Enter a password";
      errors.confirmPasswordError = "Enter a password";
    }

    this.setState({
      ...this.state,
      ...errors,
    });

    return isError;
  };

  onSubmit = (e) => {
    e.preventDefault();
    const err = this.validate();
    if (!err) {
      this.setState({
        firstName: "",
        firstNameError: "",
        firstNameFlag: false,
        lastName: "",
        lastNameError: "",
        lastNameFlag: false,
        email: "",
        emailFlag: false,
        emailError: "",
        password: "",
        passwordFlag: false,
        passwordError: "",
        confirmPassword: "",
        confirmPasswordFlag: false,
        confirmPasswordError: "",
      });
      let data = {
        "firstName": this.state.firstName,
        "lastName": this.state.lastName,
        "email": this.state.email,
        "service": "advance",
        "password": this.state.password,
      }       
       console.log("Data entered is" ,data);

      service.Registration(data).then((result) => {
        console.log("Registration successful" ,result);
          this.setState({snackType: "success", snackMessage: "Registration successful", open: true, setOpen: true})
          setTimeout(() => {  this.nextPath("../login"); }, 2000);

        })
        .catch((error) => {
          console.log("Registration Failed" + error);
          this.setState({snackType: "error", snackMessage: "Registration Failed", open: true, setOpen: true})
        });
    } else {
      this.setState({snackType: "error", snackMessage: "User already", open: true, setOpen: true})
      console.log("Registration Failed");
    }
  };
  render() {
    return (
      <div className="main">
        <div className="signupPage">
        <div className="regHeader">
                        <div className="fundooContainer1">
                            <div className="blue">F</div>
                            <div className="red">u</div>
                            <div className="yellow">n</div>
                            <div className="blue">d</div>
                            <div className="green">o</div>
                            <div className="red">o</div>
                        </div>
                        <div className="headerText">Create your Fundoo Account </div>
          </div>
          <div className="container">
            <form className="form">
              <div className="inputs">
                <div className="inputField1">
                  <TextField
                    autoCapitalize="off"
                    name="firstName"
                    onChange={(e) => this.change(e)}
                    value={this.state.firstName}
                    error={this.state.firstNameFlag}
                    helperText={this.state.firstNameError}
                    size="small"
                    label="First name"
                    variant="outlined"
                    fullWidth
                  />
                </div>
                <div className="inputField1">
                  <TextField
                    size="small"
                    name="lastName"
                    label="Last name"
                    onChange={(e) => this.change(e)}
                    variant="outlined"
                    value={this.state.lastName}
                    error={this.state.lastNameFlag}
                    helperText={this.state.lastNameError}
                    fullWidth
                  />
                </div>
              </div>
              <div className="inputs">
                <div className="inputField1">
                  <TextField
                    size="small"
                    variant="outlined"
                    fullWidth
                    className="emailField"
                    name="email"
                    value={this.state.email}
                    helperText={this.state.emailError}
                    error={this.state.emailFlag}
                    onChange={(e) => this.change(e)}
                    label="Email"
                  />
                </div>
              </div>
              <span className='helpTxt'>You can use letters, numbers & periods</span>

              <div className="inputs">
                <div className="inputField1">
                  <TextField
                    size="small"
                    id="password"
                    label="Password"
                    name="password"
                    onChange={(e) => this.change(e)}
                    value={this.state.password}
                    error={this.state.passwordFlag}
                    helperText={this.state.passwordError}
                    fullWidth
                    type={this.state.showPassword ? "text" : "password"}
                    variant="outlined"
                  />
                </div>
                <div className="inputField1">
                  <TextField
                    size="small"
                    id="cpassword"
                    label="Confirm"
                    name="confirmPassword"
                    onChange={(e) => this.change(e)}
                    value={this.state.confirmPassword}
                    helperText={this.state.confirmPasswordError}
                    error={this.state.confirmPasswordFlag}
                    fullWidth
                    type={this.state.showPassword ? "text" : "password"}
                    variant="outlined"
                  />
                </div>
              </div>
              <span className="message">Use 8 or more characters with a mix of letters, numbers & symbols</span>

              <span className="checkBoxInputs">
                <Checkbox
                  onClick={this.clickShowPass}
                  color="primary"
                  className="showPass"
                />
                Show Password
              </span>
              <div className="footerButtons">
                <div className="signInLink">
                  <Button
                    color="primary"
                   onClick={() => this.nextPath("../login")}
                 >
                    Sign In insted
                  </Button>
                </div>
                <div className="nextButton">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(e) => this.onSubmit(e)}
                    primary
                  >
                    Next
                  </Button>
                </div>
              </div>
            </form>
            <div className="regImg">
              <img src={Img} alt="" />
              <p className="ImgText">
                One account. All of Fundoo working for you.
                </p>
            </div>
          </div>
        </div>
        <div>
        <Snackbar open={this.state.open} >
          <Alert severity={this.state.snackType}>
            {this.state.snackMessage}
          </Alert>
        </Snackbar>
        </div>
      </div>
    );
  }
}