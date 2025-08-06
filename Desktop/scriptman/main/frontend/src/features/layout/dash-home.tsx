import { Outlet } from "react-router";
import { AppSidebar } from "../../components/app-sidebar";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import adminImg from "../../assets/admin.png";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AutContext } from "@/context/userContext";

export default function DashHome() {
    const { user } = useContext(AutContext);

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 shadow-sm mb-5">
                    <div className="flex justify-between items-center gap-2 px-4 w-full ">
                        <SidebarTrigger className="-ml-1" />

                        <div className="flex items-center gap-3">
                            <img
                                alt={user && user.username}
                                src={adminImg}
                                className="w-10 h-10 rounded-full ring-2 ring-sky-500 object-cover shadow-sm cursor-pointer"
                            />
                            <div className="flex flex-col leading-tight">
                                <span className="capitalize text-sm font-semibold text-gray-900">
                                    {user && user.username}
                                </span>
                                <span className="text-xs text-gray-500 capitalize">
                                    {user && user.role?.role_name}
                                </span>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    {/* <TableUsers /> */}

                    <Outlet />
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
