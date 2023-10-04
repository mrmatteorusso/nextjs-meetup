import MeetupDetail from "@/components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";

export default function MeetupDetails(props) {
  console.log("MeetupDetails props:", props);

  return (
    <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://mrmatteorusso:pass@cluster0.j5002b2.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  console.log("this is meetupId", meetupId);

  const client = await MongoClient.connect(
    "mongodb+srv://mrmatteorusso:pass@cluster0.j5002b2.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

// In the provided code, you have a React component named MeetupDetails that appears to display details of a meetup. Additionally, you've implemented two special functions: getStaticPaths and getStaticProps. These functions are used in Next.js for server-side rendering and static site generation, and they serve specific purposes:

// getStaticPaths: This function is used to specify which dynamic routes should be pre-rendered as static HTML pages at build time. It provides an array of possible values for dynamic route parameters. In your example, you've hardcoded two possible values for the meetupId parameter: "m1" and "m2". When you run next build, Next.js will generate static HTML pages for both /meetups/m1 and /meetups/m2.

// The fallback property is set to false, which means that if someone tries to access a meetup with an meetupId that's not in the paths array, they will receive a 404 error because those pages won't be generated dynamically during runtime.

// getStaticPaths is useful when you have a large number of dynamic routes or when you want to pre-generate only specific pages based on certain criteria, such as existing meetup IDs.

// getStaticProps: This function is used to fetch data for a specific dynamic route before rendering the page. It receives a context object that contains information about the current route, including dynamic route parameters. In your code, it fetches data for a specific meetup based on the meetupId obtained from context.params.meetupId.

// The fetched data, in this case, is hardcoded, but in a real-world scenario, you would typically make an API request or fetch data from a database based on the meetupId. The data is then passed as props to the MeetupDetails component.

// getStaticProps is useful for providing dynamic content to your statically generated pages. It ensures that each meetup detail page has the correct data when pre-rendered as static HTML.

// In summary, getStaticPaths and getStaticProps are crucial for Next.js applications that need to generate dynamic pages at build time. They allow you to define which routes should be pre-rendered, fetch data for those routes, and ensure that your pages have the required data when they are statically generated. This approach improves performance and SEO, making your Next.js application efficient and search engine-friendly.
