const express = require("express");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
app.use(bodyParser.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.q43xx.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get("/", (req, res) => {
	res.send("You're not supposed to be here!");
});

client.connect((err) => {
	const appointmentCollection = client.db("healthyTeeth").collection("appointments");

	//POST
	app.post("/addAppointment", (req, res) => {
		const appointment = req.body;
		appointmentCollection.insertOne(appointment).then((result) => {
			res.send(result.insertedCount > 0);
		});
	});

	//GET
	app.get("/appointments", (req, res) => {
		appointmentCollection.find({}).toArray((err, documents) => {
			res.send(documents);
		});
	});
});

app.listen(4000);
