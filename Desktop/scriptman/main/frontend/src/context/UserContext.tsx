import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const AutContext = createContext();

export default function UserContext({ children }) {
    const [role, setRole] = useState("");
    const [userId, setUserId] = useState("");
    const [token, setToken] = useState(localStorage.getItem("token") || "");

    const [user, setuser] = useState(null);

    //user login info
    useEffect(() => {
        const tokenUser = localStorage.getItem("token");
        if (tokenUser) {
            try {
                const decoded = jwtDecode(tokenUser);

                setRole(decoded.role);

                setUserId(decoded.id);

                setToken(tokenUser);

                axios
                    .get(`http://localhost:5000/api/users/${decoded.id}/role`)
                    .then((res) => setuser(res.data))
                    .catch((error) => error);
            } catch (error) {
                console.error("Invalid token");
            }
        }
    }, [token]);

    return (
        <>
            <AutContext.Provider
                value={{ role, userId, setToken, token, user }}
            >
                {children}
            </AutContext.Provider>
        </>
    );
}
