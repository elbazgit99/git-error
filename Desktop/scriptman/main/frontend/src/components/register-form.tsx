import { Link } from "react-router";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

import { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router";
import { toast } from "sonner";

export function RegisterForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState<string | undefined>("");
    const [password, setPassword] = useState<string | undefined>("");

    // const [passwordConferme, setPasswordConferme] = useState();

    const navigate = useNavigate();
    function sendUser(e) {
        e.preventDefault();

        axios
            .post("http://localhost:5000/api/register/", {
                username,
                email,
                password,
            })
            .then((res) => {
                // console.log(res.data);
                toast.success(`register successfully!`);
                navigate("/login");
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            });
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Welcome to Jadara</CardTitle>
                    <CardDescription>
                        Register with your valide email
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={sendUser}>
                        <div className="grid gap-6">
                            <div className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="email">UserName</Label>
                                    <Input
                                        id="username"
                                        type="text"
                                        placeholder="your name"
                                        required
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        required
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">
                                            Password
                                        </Label>
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="*********"
                                        required
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-cyan-900"
                                >
                                    Register
                                </Button>
                            </div>
                            <div className="text-center text-sm">
                                Already have an account?{" "}
                                <Link
                                    to="/login"
                                    className="underline underline-offset-4"
                                >
                                    Sign in
                                </Link>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
