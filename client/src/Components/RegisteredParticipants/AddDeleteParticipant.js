import React from "react";
import Axios from "axios";

const AddDeleteParticipant = (props) => {
  const [data, setData] = React.useState({
    id: undefined,
    email: "",
    first_name: "",
    last_name: "",
    password: "",
  });
  const [id, setID] = React.useState("");
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    handleRead();
  });

  const handleRead = () => {
    try {
      Axios.get("/regparticipant").then((res) => {
        setItems(res.data.data);
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
    const endpoint = "/regparticipant/" + id;
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
    const password =
      "0x" + Math.floor(Math.random() * (100000 + 1)).toString(16);
    try {
      Axios.post("/regparticipant", {
        id: parseInt(data.id),
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        password: password,
      }).then((res) => {
        handleRead();
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h2>Registered Participants</h2>
      <div id="addParticipant">
        <h3>Manually Add Participant</h3>
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
            id="email"
            value={data.email}
            placeholder="email"
            type="text"
          ></input>
          <input
            onChange={(e) => handleAdd(e)}
            id="first_name"
            value={data.first_name}
            placeholder="first name"
            type="text"
          ></input>
          <input
            onChange={(e) => handleAdd(e)}
            id="last_name"
            value={data.last_name}
            placeholder="last name"
            type="text"
          ></input>
          <button>Add</button>
        </form>
      </div>
      <br />
      <div id="deleteParticipant">
        <h3>Manually Remove Participant</h3>
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
      <div id="viewParticipants">
        <h3>View Registered Participants</h3>
        <div id="dataTable">
          <span>id</span>
          <span>email</span>
          <span>first name</span>
          <span>last name</span>
          <span>password</span>
          {items.map((item, index) => (
            <div key={index}>
              <span>{item.id}</span>
              <span>{item.email}</span>
              <span>{item.first_name}</span>
              <span>{item.last_name}</span>
              <span>{item.password}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddDeleteParticipant;
