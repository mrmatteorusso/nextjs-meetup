import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    //const { title, image, address, description } = data;
    const client = await MongoClient.connect(
      "mongodb+srv://mrmatteorusso:pass@cluster0.j5002b2.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp"
    );
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);
    console.log("this is the result from new meetup handler", result);
    client.close();
    res.status(201).json({ message: "ALL GOOD" });
  }
}
