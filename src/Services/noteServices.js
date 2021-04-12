import Axios from "./axiosServices.js";
const http = new Axios();
const baseUrl = "http://fundoonotes.incubation.bridgelabz.com/api";

export default class noteServices {
  addNote = (data, token) => {
    const user = localStorage.getItem("fundooToken");
    return http.Post(`${baseUrl}/notes/addNotes`, data, {
      headers: {
        Authorization: `${user}`,
      },
    });
  };

  getNotes = () => {
    const user = localStorage.getItem("fundooToken");
    return http.Get(`${baseUrl}/notes/getNotesList`, {
      headers: {
        Authorization: `${user}`,
      },
    });
  };

  changeColor = (data) => {
    const user = localStorage.getItem("fundooToken");
    console.log(data);
    return http.Post(`${baseUrl}/notes/changesColorNotes`, data, {
      headers: {
        Authorization: `${user}`,
      },
    });
  };
  updateNotes = (data) => {
    const user = localStorage.getItem("fundooToken");
    // console.log(data);
    return http.Post(`${baseUrl}/notes/updateNotes`, data, {
        headers: {
          Authorization: `${user}`,
        },
      });
  };
  deleteNotes = (data) => {
    const user = localStorage.getItem("fundooToken");
    console.log(data);
    return http.Post(`${baseUrl}/notes/trashNotes`, data, {
      headers: {
        Authorization: `${user}`,
      },
    });
  };
  
 getTrashNotes = () => {
    const user = localStorage.getItem("fundooToken");
    return http.Get(`${baseUrl}/notes/getTrashNotesList`, {
      headers: {
        Authorization: `${user}`,
      },
    });
  }
  archiveNote = (data) => {
      const user = localStorage.getItem("fundooToken");
      console.log(data);
      return http.Post(`${baseUrl}/notes/archiveNotes`, data, {
        headers: {
          Authorization: `${user}`,
        },
      });
  }
  
    getArchiveNotes = () => {
      const user = localStorage.getItem("fundooToken");
      return http.Get(`${baseUrl}/notes/getArchiveNotesList`, {
        headers: {
          Authorization: `${user}`,
        },
      });
    }
 
}
