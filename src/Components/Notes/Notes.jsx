import React from "react";
import AddNotes from "../addNotes/addNotes";
import DisplayNotes from "../displayNotes/displayNotes";
import Services from "../../Services/noteServices";
import "./Notes.css";
const service = new Services();

export default function Notes(props) {
  const [show, setShow] = React.useState([]);

  React.useEffect(() => {
    getAllNotes();
  }, []);

  const getAllNotes = () => {
    service.getNotes().then((data) => {
      let arrayData = data.data.data.data;
      let array = arrayData.reverse();
      setShow(array);
    })
      .catch((err) => {
        console.log("error " + err);
      });
  };


  return (
    <div className="mainContent">
      <AddNotes getall={getAllNotes} />
      <DisplayNotes notes={show} getall={getAllNotes} />
      <div>
      </div>
    </div>
  );
}
