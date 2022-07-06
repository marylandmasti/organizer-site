import express from "express";
import AWS from "aws-sdk";
import bodyParser from "body-parser";
import "dotenv/config";

const router = express.Router();
const ddb = new AWS.DynamoDB.DocumentClient({
  region: "us-west-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const TABLE_NAME = "csv-dynamodb-kc";

const addUser = async (data = {}) => {
  var params = {
    TableName: TABLE_NAME,
    Item: data,
  };
  try {
    await ddb.put(params).promise();
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

const deleteUser = async (value, key = "id") => {
  const params = {
    TableName: TABLE_NAME,
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

const readUsers = async () => {
  const params = {
    TableName: TABLE_NAME,
  };
  try {
    const { Items = [] } = await ddb.scan(params).promise();
    return { success: true, data: Items };
  } catch (error) {
    return { success: false, data: null };
  }
};

router.use(bodyParser.json());

router.post("/participant", async (req, res) => {
  const { success, data } = await addUser(req.body);
  if (success) {
    return res.json({ success, data });
  }
  return res.status(500).json({ success: false, message: "Error Occured !!!" });
});

router.delete("/participant/:id", async (req, res) => {
  const { success, data } = await deleteUser(parseInt(req.params.id));
  if (success) {
    return res.json({ success, data });
  }
  return res.status(500).json({ success: false, message: "Error Occured !!!" });
});

router.get("/participant", async (req, res) => {
  const { success, data } = await readUsers();
  if (success) {
    return res.json({ success, data });
  }
  return res.status(500).json({ success: false, message: "Error Occured !!!" });
});

// module.exports = router;
exports.default = router;
