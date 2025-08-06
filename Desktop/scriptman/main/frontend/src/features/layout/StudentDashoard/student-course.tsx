import CourseCard from "@/components/course-card";
import NonCourse from "@/components/Non-course";
import { AutContext } from "@/context/userContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

import courseimg from "../../../assets/mernstack.jpeg";

export default function StudentCourse() {
    const { userId } = useContext(AutContext);

    const [groups, setGroups] = useState([]);
    const [groupUser, setGroupUser] = useState(null);
    useEffect(() => {
        axios.get("http://localhost:5000/api/groups").then((res) => {
            setGroups(res.data);
        });
    }, []);

    useEffect(() => {
        for (let i = 0; i < groups.length; i++) {
            groups[i].user_id._id == userId
                ? setGroupUser(groups[i].course_id)
                : "you don't have any course yet!";
        }
    });

    // console.log(groupUser);

    return (
        <>
            {groupUser ? (
                <CourseCard
                    img={courseimg}
                    title={groupUser?.title}
                    description={groupUser?.description}
                    duration={groupUser?.duration}
                />
            ) : (
                <NonCourse />
            )}
        </>
    );
}
