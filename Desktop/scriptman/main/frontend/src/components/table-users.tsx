import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    // TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { UserRoundPen, Trash2, ShieldCheck, ShieldBan } from "lucide-react";

import axios from "axios";

import usericon from "../assets/icons/user.png";
import { Link } from "react-router";
import DeleteConforme from "./delete-conforme";
// import { DialogCloseButton } from "./dialog-conferme";

export function TableUsers() {
    type User = {
        _id: string;
        username: string;
        email: string;
        is_actif: boolean;
        role: Role;
    };
    type Role = {
        role_name: string;
    };

    const [users, setUsers] = useState<User[]>([]);
    const [popup, setPopup] = useState(false);
    const [deleteUserId, setDeleteUser] = useState("");

    const token = localStorage.getItem("token");
    console.log(users.length);
    function fechUsers() {
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
    }

    useEffect(() => {
        fechUsers();
    }, []);

    function handlDelete() {
        setPopup(true);

        axios
            .delete(`http://localhost:5000/api/users/${deleteUserId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((data) => {
                data.data;
                setPopup(false);
                fechUsers();
            })
            .catch((error) => error.message);
    }

    return (
        <div className="relative">
            <h2 className="text-center text-cyan-700 text-2xl uppercase font-bold bg-gray-50 py-5">
                A list of Student
            </h2>
            {popup && (
                <DeleteConforme
                    annule={() => {
                        setPopup(false);
                    }}
                    conforme={handlDelete}
                />
            )}

            <Table className="border border-yellow-200 rounded-md shadow-sm">
                <TableHeader>
                    <TableRow className="bg-yellow-100 text-sky-900 uppercase text-sm">
                        <TableHead className="w-[40px] text-center"></TableHead>
                        <TableHead className="w-[140px]">Username</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead className="text-center">
                            Update / Delete
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {users.map((user) =>
                        user.role?.role_name !== "admin" ? (
                            <TableRow
                                key={user._id}
                                className="hover:bg-yellow-50 transition"
                            >
                                <TableCell className="text-center">
                                    <img
                                        src={usericon}
                                        alt="user"
                                        className="w-8 h-8 rounded-full mx-auto"
                                    />
                                </TableCell>

                                <TableCell className="capitalize font-medium">
                                    {user.username}
                                </TableCell>
                                <TableCell className="text-gray-700">
                                    {user.email}
                                </TableCell>

                                <TableCell className="text-center">
                                    {user.is_actif ? (
                                        <span className="inline-block bg-green-100 text-green-700 px-3 py-1 text-sm rounded-full font-medium">
                                            Active
                                        </span>
                                    ) : (
                                        <span className="inline-block bg-red-100 text-red-700 px-3 py-1 text-sm rounded-full font-medium">
                                            Inactive
                                        </span>
                                    )}
                                </TableCell>

                                <TableCell>
                                    <div className="flex justify-center gap-4">
                                        <Link
                                            to={`/dash-home/users/update/${user._id}`}
                                        >
                                            <UserRoundPen className="text-blue-600 hover:text-blue-800 cursor-pointer" />
                                        </Link>

                                        <Trash2
                                            className="text-red-600 hover:text-red-800 cursor-pointer"
                                            onClick={() => {
                                                setDeleteUser(user._id);
                                                setPopup(true);
                                            }}
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : null
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
