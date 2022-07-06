import React from "react";
import Axios from "axios";

const Announcements = (props) => {
  const [data, setData] = React.useState({
    id: undefined,
    message: "",
    timestamp: "",
  });
  const [id, setID] = React.useState("");
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    handleRead();
  });

  const compareFunction = (a, b) => {
    if (a.timestamp >= b.timestamp) {
      return -1;
    }
    return 1;
  };

  const handleRead = () => {
    try {
      Axios.get("/announcement").then((res) => {
        setItems(res.data.data.sort(compareFunction));
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
        console.log(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  function handleAddSubmit(e) {
    e.preventDefault();

    const date = new Date();
    let currTime = date.getHours();
    if (parseInt(currTime) === 0) {
      currTime =
        (parseInt(currTime) + 12).toString() + ":" + date.getMinutes() + "AM";
    } else if (parseInt(currTime) < 12) {
      currTime = currTime + ":" + date.getMinutes() + "AM";
    } else {
      currTime =
        (parseInt(currTime) - 12).toString() + ":" + date.getMinutes() + "PM";
    }

    console.log(currTime);
    try {
      Axios.post("/announcement", {
        id: parseInt(data.id),
        message: data.message,
        timestamp: currTime,
      }).then((res) => {
        handleRead();
        console.log(res.data);
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
            <div key="index">
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
