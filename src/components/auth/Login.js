'use client'
import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Login = () => {
    const router = useRouter();
    const [error, setError] = useState("");
    const { data: session, status: sessionStatus } = useSession();

    useEffect(() => {
        if (sessionStatus === "authenticated") {
            router.replace("/");
        }
    }, [sessionStatus, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const username = e.target[0].value;
        const password = e.target[1].value;

      

        if (!password || password.length < 8) {
            setError("Password is invalid");
            return;
        }

        const res = await signIn("credentials", {
            redirect: false,
            username,
            password,
        });

        if (res?.error) {
            setError("Invalid email or password");
        } else {
            // Refresh the page to reflect the new user state
            window.location.reload();
        }
    };

    if (sessionStatus === 'loading') {
        return <h1>Loading...</h1>;
    }

    return (
        sessionStatus !== "authenticated" && (
            <div>
                {error && <p>{error}</p>}
                <div className="mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg" style={{ maxWidth: "480px" }}>
                    <form onSubmit={handleSubmit}>
                        <h2 className="mb-5 text-2xl font-semibold">Login</h2>

                        <div className="mb-4">
                            <label className="block mb-1">UserName</label>
                            <input
                                type="text"
                                className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                                placeholder="User Name"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1">Password</label>
                            <input
                                type="password"
                                className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                                placeholder="Type your password"
                                minLength={6}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                        >
                            Login
                        </button>

                        <hr className="mt-2" />

                        <Link href="/register" className="registerbtn my-2 px-4 py-2 w-full text-center rounded-md">
                            Create Account
                        </Link>
                        
                    </form>
                </div>
            </div>
        )
    );
};

export default Login;