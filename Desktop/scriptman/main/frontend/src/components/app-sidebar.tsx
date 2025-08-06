// import * as React from "react";
import {
    LogOut,
    Home,
    Users,
    BookOpenText,
    Boxes,
    UserRound,
} from "lucide-react";

import { NavMain } from "../components/nav-main";
import { useContext } from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarRail,
} from "../components/ui/sidebar";
import { Link, useNavigate } from "react-router";
import { AutContext } from "@/context/userContext";

// This is sample data.
const data = {
    navStudent: [
        { title: "Home", url: "/student/", icon: Home },
        { title: "Profile", url: "/student/profile", icon: UserRound },

        {
            title: "Course",
            url: "/student/course",
            icon: BookOpenText,
            badge: "10",
        },
        { title: "Group", url: "/student/group", icon: Boxes, badge: "10" },
    ],
    navAdmin: [
        {
            title: "Home",
            url: "/dash-home/",
            icon: Home,
            // isActive: true,
        },
        {
            title: "Users",
            url: "/dash-home/users",
            icon: Users,
        },

        {
            title: "Courses",
            url: "/dash-home/courses",
            icon: BookOpenText,
            badge: "10",
        },
        {
            title: "Groups",
            url: "/dash-home/groups",
            icon: Boxes,
            badge: "10",
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const navigate = useNavigate();
    const { role } = useContext(AutContext);

    const logoutHandle = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate("/login");
    };

    return (
        <Sidebar className="border-r-0" {...props}>
            <SidebarHeader>
                <div>
                    <Link to={"/"} className="flex items-center gap-4 mb-3">
                        {/* <img src={logo} alt="" className="w-9" /> */}
                        <img
                            src="../souss_massa_tech_logo.png"
                            alt="Souss Massa Tech Academy"
                            className="w-50"
                        />
                    </Link>
                </div>

                <NavMain
                    items={role === "admin" ? data.navAdmin : data.navStudent}
                />
            </SidebarHeader>
            <SidebarContent>
                {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
                <div
                    className="flex mt-auto m-3 p-2 gap-2 border-2 rounded-sm hover:bg-red-100"
                    onClick={logoutHandle}
                >
                    <LogOut color="#ff0000" /> <span>Logout</span>
                </div>
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
