import express from "express";
import AWS from "aws-sdk";
import bodyParser from "body-parser";
import "dotenv/config";
import { v4 as uuidv4 } from 'uuid';

const PORT = process.env.PORT || 3001;
const app = express();

const ddb = new AWS.DynamoDB.DocumentClient({
  region: "us-west-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const REG_TABLE_NAME = process.env.REG_TABLE;
const ANNOUNCE_TABLE_NAME = process.env.ANNOUNCE_TABLE;
const SCHEDULE_TABLE_NAME = process.env.SCHEDULE_TABLE;


// CRUD Functions to the provided DynamoDB table

const addItem = async (data = {}, table) => {
  var params = {
    TableName: table,
    Item: data,
  };
  try {
    await ddb.put(params).promise();
    return { success: true };
  } catch (error) {
    console.log(error)
    return { success: false };
  }
};

const deleteItem = async (value, table, key = "uuid") => {
  const params = {
    TableName: table,
    Key: {
      [key]: value,
    },
  };
  try {
    await ddb.delete(params).promise();
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

const readItems = async (table) => {
  const params = {
    TableName: table,
  };
  try {
    const { Items = [] } = await ddb.scan(params).promise();
    return { success: true, data: Items };
  } catch (error) {
    console.log(error);
    return { success: false, data: null };
  }
};

app.use(bodyParser.json());


// PARTICIPANT REGISTRATION APIs
// WILL TARGET THE REGISTERED USERS DATABASE

app.post("/regparticipant", async (req, res) => {
  // const item = {
  //   email: req.body.email,
  //   name: req.body.first_name,
  //   timestamp: new Date().toISOString()
  // };
  const { success, data } = await addItem(item, REG_TABLE_NAME);
  if (success) {
    return res.json({ success, data });
  }
  return res.status(500).json({ success: false, message: "Error Occured !!!" });
});

app.delete("/regparticipant/:id", async (req, res) => {
  const { success, data } = await deleteItem(
    parseInt(req.params.id),
    REG_TABLE_NAME
  );
  if (success) {
    return res.json({ success, data });
  }
  return res.status(500).json({ success: false, message: "Error Occured !!!" });
});

app.get("/regparticipant", async (req, res) => {
  const { success, data } = await readItems(REG_TABLE_NAME);
  if (success) {
    return res.json({ success, data });
  }
  return res.status(500).json({ success: false, message: "Error Occured !!!" });
});


// ANNOUNCEMENT APIs
// WILL TARGET THE ANNOUNCEMENTS DATABASE

app.post("/announcement", async (req, res) => {
  const item = {
    uuid: uuidv4(),
    message: req.body.message,
    timestamp: new Date().toISOString()
  };
  const { success, data } = await addItem(item, ANNOUNCE_TABLE_NAME);
  if (success) {
    return res.json({ success, data });
  }
  return res.status(500).json({ success: false, message: data });
});

app.delete("/announcement/:uuid", async (req, res) => {
  const { success, data } = await deleteItem(
    req.params.uuid,
    ANNOUNCE_TABLE_NAME
  );
  if (success) {
    return res.json({ success, data });
  }
  return res.status(500).json({ success: false, message: "Error Occured !!!" });
});

app.get("/announcement", async (req, res) => {
  const { success, data } = await readItems(ANNOUNCE_TABLE_NAME);
  if (success) {
    // Extract timestamp values from JSON objects
    let timestamps = data.map(obj => obj.timestamp);
    // Sort array in descending order based on timestamp values
    timestamps.sort((a, b) => b - a);
    // Use sorted timestamps array to sort JSON array
    let sortedData = data.sort((a, b) => timestamps.indexOf(a.timestamp) - timestamps.indexOf(b.timestamp));
    return res.json({ success, sortedData });
  }
  return res.status(500).json({ success: false, message: "Error Occured !!!" });
});


// SCHEDULE APIs
// WILL TARGET THE SCHEDULES DATABASE

app.post("/schedule", async (req, res) => {
  const item = {
    uuid: uuidv4(),
    team: req.body.team,
    event: req.body.event,
    timestamp: new Date().toISOString()
  };
  const { success, data } = await addItem(item, SCHEDULE_TABLE_NAME);
  if (success) {
    return res.json({ success, data });
  }
  console.log("hi")
  return res.status(500).json({ success: false, message: data });
});

app.delete("/schedule", async (req, res) => {
  let ret = false;
  let retData = [];
  if (req.query.event && req.query.team) {
    const { success, data } = await readItems(SCHEDULE_TABLE_NAME);
    if (success) {
      let event = req.query.event;
      let team = req.query.team;
      data.forEach(item => {
        ret = true
        if (item.event == event && item.team == team) {
          const params = {
            TableName: SCHEDULE_TABLE_NAME,
            Key: {
              uuid: item.uuid
            }
          };
          ddb.delete(params, (err, data) => {
            if (err) {
              res.status(500).send({ success: false, message: err.message });
            }
            // issue: data is empty
            retData = retData.concat(data);
          });
        }
      });
    }
  }
  else if (req.query.event) {
    const { success, data } = await readItems(SCHEDULE_TABLE_NAME);
    if (success) {
      let event = req.query.event;
      data.forEach(item => {
        ret = true
        if (item.event == event) {
          const params = {
            TableName: SCHEDULE_TABLE_NAME,
            Key: {
              uuid: item.uuid
            }
          };
          ddb.delete(params, (err, data) => {
            if (err) {
              res.status(500).send({ success: false, message: err.message });
            }
            // issue: data is empty
            retData = retData.concat(data);
          });
        }
      });
    }
  }
  let success = ret;
  let data = retData;
  if (success) {
    return res.json({ success, data });
  }
  return res.status(500).json({ success: false, message: "Error Occured !!!" });
});

app.get('/schedule', async (req, res) => {
  const { success, data } = await readItems(SCHEDULE_TABLE_NAME);
  if (success) {
    let team = req.query.team;
    let teamData = [];
    data.forEach(item => {
      if (item.team == team) {
        teamData.push(
          {
            uuid: item.uuid,
            team: item.team,
            event: item.event,
            timestamp: item.timestamp
          }
        )
      }
    });
    return res.json({ success, teamData });
  }
  return res.status(500).json({ success: false, message: "Error Occured !!!" });
});

<<<<<<< HEAD
=======
// LOGIN
>>>>>>> c2d8ac2911287d0f2adb4dd4d4390b297af004d9

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
