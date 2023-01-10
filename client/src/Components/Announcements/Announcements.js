import React from "react";
import Axios from "axios";

const Announcements = (props) => {
  const [data, setData] = React.useState({
    id: null,
    message: "",
    timestamp: "",
  });
  const [id, setID] = React.useState("");
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    handleRead();
  });

<<<<<<< HEAD
=======
  const compareFunction = (a, b) => {
    if (a.timestamp >= b.timestamp) {
      return -1;
    }
    return 1;
  };

>>>>>>> c2d8ac2911287d0f2adb4dd4d4390b297af004d9
  const handleRead = () => {
    try {
      Axios.get("/announcement").then((res) => {
        setItems(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  function handleDelete(e) {
    setID(e.target.value);
  }

  function handleAdd(e) {
    // copies current data
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  }

  const handleDeleteSubmit = (e) => {
    e.preventDefault();
    const endpoint = "/announcement/" + id;
    try {
      Axios.delete(endpoint).then((res) => {
        handleRead();
      });
    } catch (error) {
      console.log(error);
    }
  };

  function handleAddSubmit(e) {
    e.preventDefault();

<<<<<<< HEAD
=======
    const date = new Date();
    let currTime = date.getHours();
    let currMin = date.getMinutes();

    if (parseInt(currMin) < 10) {
      currMin = "0" + currMin;
    }

    if (parseInt(currTime) === 0) {
      currTime = (parseInt(currTime) + 12).toString() + ":" + currMin + "AM";
    } else if (parseInt(currTime) < 12) {
      currTime = currTime + ":" + date.getMinutes() + "AM";
    } else {
      currTime = (parseInt(currTime) - 12).toString() + ":" + currMin + "PM";
    }
    currTime =
      parseInt(date.getMonth()) + 1 + "/" + date.getDate() + " " + currTime;

    console.log(currTime);
>>>>>>> c2d8ac2911287d0f2adb4dd4d4390b297af004d9
    try {
      Axios.post("/announcement", {
        message: data.message,
      }).then((res) => {
        handleRead();
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h2>Announcements</h2>
      <div id="addAnnouncement">
        <h3>Add Announcement</h3>
        <form onSubmit={(e) => handleAddSubmit(e)}>
          <input
            onChange={(e) => handleAdd(e)}
            id="id"
            value={data.id}
            placeholder="id"
            type="number"
          ></input>
          <input
            onChange={(e) => handleAdd(e)}
            id="message"
            value={data.message}
            placeholder="message"
            type="text"
          ></input>
          <button>Add</button>
        </form>
      </div>
      <br />
      <div id="deleteAnnouncement">
        <h3>Remove Announcement</h3>
        <form onSubmit={(e) => handleDeleteSubmit(e)}>
          <input
            onChange={(e) => handleDelete(e)}
            id="id"
            value={id}
            placeholder="id"
            type="number"
          ></input>
          <button>Delete</button>
        </form>
      </div>
      <br />
      <div id="viewAnnouncements">
        <h3>View Announcements</h3>
        <div id="dataTable">
          <span>id</span>
          <span>message</span>
          <span>timestamp</span>
          {items.map((item, index) => (
            <div key={index}>
              <span>{item.id}</span>
              <span>{item.message}</span>
              <span>{item.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Announcements;
