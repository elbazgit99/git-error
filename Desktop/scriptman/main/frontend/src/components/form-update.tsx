import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

export default function UpdateUserForm() {
    const [updateEmail, setupdateEmail] = useState("");
    const [updatename, setupdatename] = useState("");

    const token = localStorage.getItem("token");
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/users/${id}/role`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setupdateEmail(response.data.email);
                setupdatename(response.data.username);
            })
            .catch((error) => error.message);
    }, [id]);

    function update(e) {
        e.preventDefault();
        axios
            .put(
                `http://localhost:5000/api/users/${id}`,
                {
                    email: updateEmail,
                    username: updatename,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((response) => {
                console.log(response);
                navigate(-1);
            })
            .catch((error) => error.message);
    }

    return (
        <>
            <form
                onSubmit={update}
                className="bg-white max-w-md mx-auto mt-10 rounded-2xl shadow-lg border border-gray-200 p-6 space-y-4"
            >
                <h2 className="text-2xl font-semibold text-sky-900 mb-4">
                    Update User Information
                </h2>

                <Input
                    value={updatename}
                    onChange={(e) => setupdatename(e.target.value)}
                    type="text"
                    placeholder="Username"
                    className="w-full"
                />

                <Input
                    value={updateEmail}
                    onChange={(e) => setupdateEmail(e.target.value)}
                    type="email"
                    placeholder="Email"
                    className="w-full"
                />

                <Button className="w-full bg-sky-600 hover:bg-sky-700 text-white font-medium py-2 rounded-lg">
                    Update
                </Button>
            </form>
        </>
    );
}
