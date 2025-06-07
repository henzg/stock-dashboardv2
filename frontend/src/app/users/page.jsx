"use client";
import { useEffect, useState } from "react";

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:8000/api/user")
            .then(res => res.json())
            .then(data => {
                setUsers(data);
                setLoading(false);
            }); 
    }, []);
    if (loading) return <div className="p-8 tex-center">Loading users...</div>

    return (
        <div className="max-w-2x1 mx-auto mt-10 p-4 bg-white rounded-x1 shadow">
            <h1 className="text-2x1 font-bold mb-6 text-center">Users</h1>
            <ul className="space-y-4">
                {users.map(user => (
                    <li key={user.id} className="flex justify-between items-center border-b pb-2">
                        <span className="font-medium">{user.username}</span>
                        <span className="text-gray-500">{user.email}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}