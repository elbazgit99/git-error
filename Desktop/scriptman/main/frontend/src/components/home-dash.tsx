import axios from "axios";
import { useContext, useEffect, useState } from "react";
import CardChart from "./card-chart";
import { AutContext } from "@/context/userContext";
import EventCard from "./eventCard";
export default function DashHomePage() {
    const [users, setUsers] = useState("");
    const [course, setcouses] = useState("");
    const { token } = useContext(AutContext);

    // const token = localStorage.getItem("token");
    useEffect(() => {
        axios
            .get("http://localhost:5000/api/users/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((data) => {
                setUsers(data.data);
            })
            .catch((error) => error.message);

        axios
            .get("http://localhost:5000/api/courses/")
            .then((data) => {
                setcouses(data.data);
            })
            .catch((error) => error.message);
    }, []);
    return (
        <>
            <h2 className="bg-zinc-50 capitalize font-bold text-2xl px-4 py-2 rounded-md">
                statistical information :
            </h2>
            <div className="flex flex-wrap justify-evenly gap-3 ">
                <CardChart title="total students" number={users.length} />
                <CardChart title="total of courses" number={course.length} />
            </div>

            <h1 className="bg-zinc-50 font-bold text-2xl px-4 py-2 rounded-md">
                Event Annonce :
            </h1>
            <EventCard />
        </>
    );
}
