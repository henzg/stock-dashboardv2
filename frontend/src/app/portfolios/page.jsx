"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function PortfolioPage() {
    const [portfolio, setPortfolio] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:8000/api/portfolio")
        .then(res => res.json())
        .then(data => {
            setPortfolio(data);
            setLoading(false);
        });
    }, []);
    if (loading) return <div className="p-8 text-center">Loading portfolios...</div>

  return (
    <div className="bg-black max-w-xl mx-auto p-6 rounded-lg shadow">
      <h1 className="text-center text-2xl font-bold mb-4">Portfolios</h1>
      <ul className="space-y-6">
        {portfolio.map((portfolio) => (
          <li key={portfolio.userId} className="border-b pb-2">
            <div className="font-semibold mb-1">
                <Link href={`/portfolios/${portfolio.userId}`}>User {portfolio.userId}</Link>
                </div>
            <ul className="pl-4 list-disc">
              {portfolio.holdings.map(h => (
                <li key={h.symbol}>
                  <span className="text-blue-800">{h.symbol}:</span> {h.quantity}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}