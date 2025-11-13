"use client";
import { useEffect, useState } from "react";
import { auth, logout } from "../../utils/firebase";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const unsub = auth.onAuthStateChanged((u) => {
            if (!u) router.push("/login");
            else setUser(u);
        });
        return () => unsub();
    }, [router]);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="p-6 bg-indigo-600 text-white flex justify-between">
                <h1 className="text-xl font-bold">SkillMatch AI Dashboard</h1>
                <button onClick={logout} className="bg-white text-indigo-600 px-4 py-2 rounded">
                    Logout
                </button>
            </div>
            <div className="p-6">
                {user && (
                    <div className="bg-white p-4 rounded shadow">
                        <h2 className="text-lg font-semibold">Welcome, {user.displayName}</h2>
                        <p className="text-gray-600 mt-1">Email: {user.email}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
