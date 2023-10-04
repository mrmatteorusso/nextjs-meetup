import NewMeetupForm from "@/components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
export default function Newmeeting() {
  const router = useRouter();
  async function onAddMeetupHandler(enteredMeetupData) {
    console.log(enteredMeetupData);
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    router.push("/");
  }
  return (
    <>
      <h1>test some stuff</h1>
      <NewMeetupForm onAddMeetup={onAddMeetupHandler} />
    </>
  );
}
