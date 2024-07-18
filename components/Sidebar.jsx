"use client";

import { useState } from "react";
import { FiUser, FiServer } from "react-icons/fi";

export default function Sidebar({ setActiveComponent }) {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4 font-bold text-xl border-b border-gray-700">
        Admin Dashboard
      </div>
      <ul className="mt-4">
        <li
          className="p-4 hover:bg-gray-700 cursor-pointer flex items-center"
          onClick={() => setActiveComponent("service")}
        >
          <FiServer className="mr-2" /> Services
        </li>
        <li
          className="p-4 hover:bg-gray-700 cursor-pointer flex items-center"
          onClick={() => setActiveComponent("userInfo")}
        >
          <FiUser className="mr-2" /> User Info
        </li>
      </ul>
    </div>
  );
}
