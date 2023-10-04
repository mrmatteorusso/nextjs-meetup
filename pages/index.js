import MeetupList from "@/components/meetups/MeetUpList";
import { useEffect, useState } from "react";
import { MongoClient } from "mongodb";

export default function Home(props) {
  return <MeetupList meetups={props.meetups} />;
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://mrmatteorusso:pass@cluster0.j5002b2.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    //revalidate: 10, //seconds
  };
}
