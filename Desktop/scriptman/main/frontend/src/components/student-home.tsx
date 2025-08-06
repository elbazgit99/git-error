import { AutContext } from "@/context/userContext";
import { useContext } from "react";
import EventCard from "./eventCard";

export default function StudentHome() {
    const { user } = useContext(AutContext);

    return (
        <>
            <h2 className=" font-medium text-lg">
                Welcome , {user && user.username}! We're glad to see you.
            </h2>

            <h1 className="bg-amber-50 font-bold text-2xl px-4 py-2 rounded-md">
                Event Annonce :
            </h1>
            <EventCard />
        </>
    );
}
