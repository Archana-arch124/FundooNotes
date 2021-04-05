import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./forgot.css";
import Services from "C:/ReactProject2/fundoonotes/src/Services/userService.js";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
const service = new Services();

function Alert(props) {
  return <MuiAlert variant="filled" {...props} />;
}

export default class ForgotPassword extends React.Component {
  
  nextPath(path) {
    this.props.history.push(path);
  }
  constructor(props){
    super(props)
    this.state = {
      email: "",
      emailError: "",
      emailFlag: false,
      setOpen: false,
      open: false,
      showPassword: false,
      snackMessage: "",
      snackType: ""
    };
  }

 
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
    };
    if (this.state.email.length === 0) {
      errors.emailFlag = true;
      isError = true;
      errors.emailError = "Enter your Email ";
    }
    if (
      !/[a-zA-Z0-9._]+[@]{1}[a-zA-Z120-9]*[.]{1}[a-zA-Z]*$/.test(
        this.state.email
      )
    ) {
      errors.emailFlag = true;
      isError = true;
      errors.emailError = "Email is not proper";
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
        emailFlag: false,
        emailError: "",
        email: ""
      });
      let data = {
        email: this.state.email,
      };
      service
        .forgotPassword(data).then((result) => {
          console.log("Mail Sent to given email" + result);
          this.setState({snackType: "success", snackMessage: "Mail Sent to given email", open: true, setOpen: true})
        })
        .catch((err) => {
          this.setState({snackType: "error", snackMessage: "Request Failed", open: true, setOpen: true})
        });
    } else {
      console.log("Request Failed");
    }
  };

  render() {
    return (
      <div className="main">
        <div  className="ForgetPassPage">
        <div className="regHeader">
                        <div className="fundooContainerF">
                            <div className="blue">F</div>
                            <div className="red">u</div>
                            <div className="yellow">n</div>
                            <div className="blue">d</div>
                            <div className="green">o</div>
                            <div className="red">o</div>
                        </div>
          </div>
          <span className="titleF">Forgot Password</span>
          <div className="headerTextE">Enter your  Email Address</div>

          <form className="Form">
            <div className="inputField">
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
            
            <span className="buttonFooter">
            <div className="signInLink">
                  <Button
                    color="primary"
                    onClick={() => this.nextPath("../login")}>
                    Sign In insted
                  </Button>
                </div>
              <div className="button">
                <Button
                  variant="contained"
                  onClick={(e) => this.onSubmit(e)}
                  color="primary"
                  >
                  Send
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