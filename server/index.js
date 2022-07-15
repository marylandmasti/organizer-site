import express from "express";
import AWS from "aws-sdk";
import bodyParser from "body-parser";
import "dotenv/config";

const PORT = process.env.PORT || 3001;
const app = express();

const ddb = new AWS.DynamoDB.DocumentClient({
  region: "us-west-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const REG_TABLE_NAME = process.env.REG_TABLE;
const ANNOUNCE_TABLE_NAME = process.env.ANNOUNCE_TABLE;

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
    return { success: false };
  }
};

const deleteItem = async (value, table, key = "id") => {
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
  const { success, data } = await addItem(req.body, REG_TABLE_NAME);
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
  const { success, data } = await addItem(req.body, ANNOUNCE_TABLE_NAME);
  if (success) {
    return res.json({ success, data });
  }
  return res.status(500).json({ success: false, message: "Error Occured !!!" });
});

app.delete("/announcement/:id", async (req, res) => {
  const { success, data } = await deleteItem(
    parseInt(req.params.id),
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
    return res.json({ success, data });
  }
  return res.status(500).json({ success: false, message: "Error Occured !!!" });
});

// LOGIN

// const loginState = false;

// app.post("/login", async (req, res) => {
//   if (
//     (req.body.username === "masti@gmail.com") &
//     (req.body.password === "123")
//   ) {
//     loginState = true;
//     return res.send({ result: true });
//   }
//   loginState = false;
//   return res.send({ result: false });
// });

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
