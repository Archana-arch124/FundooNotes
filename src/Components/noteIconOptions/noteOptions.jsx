import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddAlertIcon from "@material-ui/icons/AddAlertOutlined";
import PersonAddIcon from "@material-ui/icons/PersonAddOutlined";
import IconButton from "@material-ui/core/IconButton";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import ColorLensOutlinedIcon from "@material-ui/icons/ColorLensOutlined";
import SystemUpdateAltOutlinedIcon from "@material-ui/icons/SystemUpdateAltOutlined";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Services from "../../Services/noteServices";
import "./noteOptions.css";
const service = new Services();

const useStyles = makeStyles((theme) => ({

  optionButton: {
    width: "100%"
  },
  colorPaper: {
    marginLeft: theme.spacing(5),
  },
  button: {
    padding: "6px",
  },
  icon: {
    height: "15px",
    width: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  colorMenu: {
    width: "130px",
    height: "90px",
    display: "flex",
    flexFlow: " column wrap",
  },
  colorButton: {
    margin: "2px",
    width: "5px",
    height: "5px",
    "&:hover": {
      border: "black 2px solid",
    },
  },

  paper: {
    marginRight: theme.spacing(2),
  },
}));

export default function NoteOptions(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorE2, setAnchorE2] = React.useState(null);
  const [noteId, setNoteId] = React.useState(props.editId);
  const [edit, setEdit] = React.useState(props.setEdited);
  const [archive, setArchive] = React.useState(props.archive);
  const [trash, setTrash] = React.useState(props.trash);

  const colors = [
    { color: "#fafafa" },
    { color: "#ef9a9a" },
    { color: "#ffcc80" },
    { color: "#fff59d" },
    { color: "#dcedc8" },
    { color: "#b2dfdb" },
    { color: "#e0f7fa" },
    { color: "#4fc3f7" },
    { color: "#b39ddb" },
    { color: "#f8bbd0" },
    { color: "#a1887f" },
    { color: "#cfd8dc" },
  ];

  const deleteHandleOpen = (event) => {
    setAnchorE2(event.currentTarget);
  };

  const deletesHandleClose = () => {
    setAnchorE2(null);
  };

  const deleted = () => {
    let data = {
      noteIdList: [noteId],
      isDeleted: true,
      isArchived: false,
    };
  service.deleteNotes(data).then((data) => {
        console.log(data);
        props.getall();
      })
      .catch((err) => {
        console.log("error = " + err);
      });
    setAnchorE2(null);
    // props.setDelete();
  };
  const colorsHandleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const colorsHandleClose = () => {
    setAnchorEl(null);
  };

  const passColor = (e, colr) => {
    e.stopPropagation();
    if (edit) {
      let data = {
        color: colr,
        noteIdList: [noteId],
      };
      service.changeColor(data).then((data) => {
          console.log("Update Color: " + data);
          props.getall();
        })
        .catch((err) => {
          console.log("Error  " + err);
        });
    }
      props.setClr(colr);
  };


  const ColorBlock = () => {
    return (
      <div className={classes.colorMenu} onMouseLeave={colorsHandleClose}>
        {colors.map((color) => (
          <IconButton
            className={classes.colorButton}
            onClick={(e) => passColor(e, color.color)}
            style={{ backgroundColor: color.color }}
          ></IconButton>
        ))}
      </div>
    );
  };
 
  const archiveNote = () => {
    let data = {
      noteIdList: [noteId],
      isArchived: true,
      isDeleted: false,
    };
    service
      .archiveNote(data)
      .then((data) => {
        props.getall();
        console.log("Archived Note: " + data);
      })
      .catch((err) => {
        console.log("Archived Note err = " + err);
      });
  };
  return (
    <div className={classes.optionButton}>
      <div>
        {trash ? (
          <div>
            <IconButton className={classes.button}>
            </IconButton>
          </div>
        ) : (
          <div className='optionfield'>
            <IconButton className={classes.button} title="Reminder">
              <AddAlertIcon  className={classes.icon}/>
            </IconButton>
            <IconButton className={classes.button} title="Collaborator">
              <PersonAddIcon  className={classes.icon}/>
            </IconButton>
            <IconButton className={classes.button} title="ChangeColor" onMouseOver={colorsHandleClick}>
              <ColorLensOutlinedIcon  className={classes.icon}/>
            </IconButton>
            <IconButton className={classes.button} title="AddImage">
              <ImageOutlinedIcon  className={classes.icon}/>
            </IconButton>
            <IconButton className={classes.button} title="Archive">
              {archive ? "" : (
                <SystemUpdateAltOutlinedIcon className={classes.icon} onClick={archiveNote} />
              )}
            </IconButton>
            <IconButton className={classes.button} title="More" onClick={deleteHandleOpen}>
              <MoreVertOutlinedIcon  className={classes.icon}/>
            </IconButton>
          </div>
        )}
      </div>
      <div
        className={classes.colorWindow}
        style={{ display: open ? "block" : "none" }}
        onClick={colorsHandleClose}  >
        <Paper open={Boolean(open)}>
          <Menu
            className={classes.colorPaper}
            anchorEl={anchorEl}
            open={Boolean(anchorEl)} >
            <ColorBlock className="colorBlock" />
          </Menu>
        </Paper>
      </div>
      <div>
        <Paper>
          <Menu
            anchorEl={anchorE2}
            open={Boolean(anchorE2)}
            onClose={deletesHandleClose} >
            <MenuItem onClick={deleted}>Delete Note</MenuItem>
          </Menu>
        </Paper>
      </div>
    </div>
  );
}
