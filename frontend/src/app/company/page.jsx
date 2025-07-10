"use client";
import { useState } from "react";
import Link from "next/link";


export default function CompaniesPage() {
    const [q, setQ] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] =  useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!q.trim()) return;
        setLoading(true);
        setResults([]);
        // call api
        const res = await fetch(`http://localhost:8000/api/stock/search?q=${q}`);
        const data = await res.json();
        setResults(data);
        setLoading(false);
    };
  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4 text-center">Company Search</h1>
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Type a company or symbol..."
          className="flex-1 p-2 border rounded focus:outline-none focus:ring"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Search</button>
      </form>
      {loading && <div className="text-center">Searching...</div>}
      <div className="grid gap-4">
        {results.map((c, i) => (
          <Link
            key={i}
            href={`/company/${c.symbol || c['1. symbol']}`}
            className="block bg-black rounded-lg shadow p-4 hover:ring-2 hover:ring-blue-400 transition"
          >
            <div className="font-bold text-lg">{c.name || c['2. name']}</div>
            <div className="text-gray-500">{c.symbol || c['1. symbol']}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}