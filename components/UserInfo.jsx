"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function UserInfo() {
  const { data: session } = useSession();

  return (
    <div className="grid place-items-center h-full bg-gray-900">
      <div className="shadow-lg p-8 bg-gray-800 text-white flex flex-col gap-2 my-6 rounded">
        <div>
          Name: <span className="font-bold">{session?.user?.name}</span>
        </div>
        <div>
          Email: <span className="font-bold">{session?.user?.email}</span>
        </div>
        <button
          onClick={() => signOut()}
          className="bg-red-500 hover:bg-red-700 text-white font-bold px-6 py-2 mt-3 rounded"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
