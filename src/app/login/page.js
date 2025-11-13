"use client";
import { useEffect } from "react";
import { auth, loginWithGoogle } from "../../utils/firebase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) router.push("/dashboard");
        });
        return () => unsubscribe();
    }, [router]);

    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <button
                onClick={loginWithGoogle}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700"
            >
                Sign in with Google
            </button>
        </div>
    );
}
