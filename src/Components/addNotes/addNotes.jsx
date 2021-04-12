import React from "react";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles } from "@material-ui/core/styles";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import BrushOutlinedIcon from "@material-ui/icons/BrushOutlined";
import IconButton from "@material-ui/core/IconButton";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import NoteOptions from "../noteIconOptions/noteOptions.jsx";
import Services from "../../Services/noteServices";
import "./addNotes.css";
const service = new Services();

const useStyles = makeStyles((theme) => ({
  titleInput: {
    padding: "10px 15px",
    fontSize: "1rem",
    fontWeight: "550",
    lineHeight: "1.5rem",
    color: "#211a1a",
    width: "100%"

  },
  input: {
    fontSize: "15px",
    fontWeight: "550",
  },
  noteInput: {
    padding: "10px 15px",
  },
  closeNotes: {
    padding: '10px 10px 10px 10px',
    fontSize: '15px',
    justifySelf: "flex-end",
    fontFamily: 'Google Sans ,Roboto,Arial,sans-serif',
    cursor: 'pointer',
  }
}));

export default function AddNote(props) {
  const classes = useStyles();
  var [showTitle, titleDisplay] = React.useState(props.editOpen);
  var [title, setTitle] = React.useState(props.editTitle);
  var [note, setNote] = React.useState(props.editDisc);
  const [edit] = React.useState(props.setEdited);
  const [clr, setClr] = React.useState(props.editColor);
  const [noteId] = React.useState(props.editId);
  const [trash] = React.useState(props.trash);
  const [archive, setArchive] = React.useState(props.archive);

  const clickedNote = () => {
    titleDisplay(true);
  };

  const closeNote = () => {
    let formData = new FormData();
    if (title === undefined && note === undefined) {
      console.log(" Enter Data");
      setClr("#fafafa");
      titleDisplay(false);
      return null;
    }
    formData.append("title", title);
    formData.append("description", note);

    if (edit) {
      setClr(props.editColor);
      formData.append("color", clr);
      formData.append("noteId", noteId);

      service.updateNotes(formData).then((data) => {
        console.log("Update Data: " + data);
        props.getall();
      })
        .catch((err) => {
          console.log("Error " + err);
        });
      titleDisplay(false);
      props.dialogOff();
    }
    else {
      formData.append("color", clr);
      service.addNote(formData).then((data) => {
        console.log("Add Notes: " + data);
        props.getall();
      })
        .catch((err) => {
          console.log("Error = " + err);
        });
      setTitle("");
      setNote("");
      setClr("#fafafa");
      titleDisplay(false);
    }
  };

  return (
    <div className="addNotesMain" onClickAway={closeNote} style={{ backgroundColor: clr }}>
      <div className="notesField" onClick={clickedNote}>
        <div
          className="addNoteField"
          style={{ display: showTitle ? "flex" : "none" }}
        >
          <div className={classes.titleInput}>
            <InputBase
              className={classes.input}
              placeholder="Title"
              value={title}
              fullWidth
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        <div class="simpleNoteShow">
          <div className="noteInput">
            <InputBase
              className={classes.input}
              placeholder="Take a note..."
              value={note}
              fullWidth
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
          <div style={{ display: showTitle ? "none" : "flex" }}>
            <IconButton>
              <CheckBoxOutlinedIcon />
            </IconButton>
            <IconButton>
              <BrushOutlinedIcon />
            </IconButton>
            <IconButton>
              <ImageOutlinedIcon />
            </IconButton>
          </div>
        </div>
      </div>
      <div className="addNoteField" style={{ display: showTitle ? "flex" : "none" }}>
        <div className="addNoteOptions">
          <NoteOptions
            setClr={setClr}
            setEdited={edit}
            getall={props.getall}
            editId={props.editId}
            trash={trash}
            archive={archive}
            dialogOff={props.dialogOff}
          />
           {trash ? " " :
          <div className="closeNotes">
            <IconButton className={classes.closeNotes} getall={closeNote} onClick={closeNote}>
              <b>Close</b>
            </IconButton></div>}
        </div>
      </div>
    </div>
  );
}
