import { AutContext } from "@/context/userContext";

import { useContext } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import profile from "../assets/profile.jpg";
export default function StudentProfile() {
    const { user, role } = useContext(AutContext);

    if (!user) return <p>Loading profile...</p>;

    return (
        <div className=" mx-auto mt-10 p-6">
            <Card className="shadow-md p-6">
                <CardHeader>
                    <CardTitle className="text-center text-2xl">
                        Profile
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-4">
                    <img
                        src={profile}
                        alt="Profile"
                        className="w-30 h-30 rounded-full object-cover border-2 border-gray-200"
                    />
                    <div className="text-center">
                        <h2 className="text-xl font-semibold mb-2">
                            {user.username}
                        </h2>
                        <p className="text-gray-600 mb-1">{user.email}</p>
                        <span className="inline-block mt-2 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full">
                            {role || "N/A"}
                        </span>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
