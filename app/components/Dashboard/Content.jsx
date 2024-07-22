"use client"
import React from 'react'
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import ItemManagement from "@/components/ItemManagement";
import UserInfo from "@/app/components/UserInfo";

export default function Content() {
    const [activeComponent, setActiveComponent] = useState("service");

    return (
        <div className="flex">
            <Sidebar setActiveComponent={setActiveComponent} />
            <div className="flex-grow p-6 bg-gray-900">
                {activeComponent === "service" && <ItemManagement />}
                {activeComponent === "userInfo" && <UserInfo />}
            </div>
        </div>
    );
}