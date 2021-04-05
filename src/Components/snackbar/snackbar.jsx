import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert variant="filled" {...props} />;
}

export default function SnackBars(props) {
  const [open, setOpen] = React.useState(false);

  const resultType = (type) => {
    return type;
  };
    

  const successMessage = (message) => {
     setOpen(true);
    return message;
  };

  return (
    <div>
      <div>
        <Snackbar open={open} autoHideDuration={3000} >
          <Alert severity={resultType}>
            <successMessage />
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}