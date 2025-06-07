"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function PortfolioPage() {
    const { userId } = useParams();
    const [portfolio, setPortfolio] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(!userId) return;
        fetch(`http://localhost:8000/api/portfolio/${userId}`)
        .then(res => res.json())
        .then(data => {
            setPortfolio(data);
            setLoading(false);
        });
    }, [userId]);
    
    if(loading) return <div className="p-8 text-center">Loading portfolios...</div>
    if(!portfolio || portfolio.error)
        return (
      <div className="p-8 text-center">
        Portfolio not found.
        <div>
          <Link href="/portfolios" className="text-blue-600 underline">
            Back to all portfolios
          </Link>
        </div>
      </div>
    );

    return (
        <div className="bg-black max-w-xl mx-auto p-6 rounded-lg shadow">
          <h1 className="text-center text-2xl font-bold mb-4">
            Portfolio for User {userId}
          </h1>
          <ul className="pl-4 list-disc">
            {portfolio.holdings.map(h => (
              <li key={h.symbol}>
                <span className="text-blue-800">{h.symbol}:</span> {h.quantity}
              </li>
            ))}
          </ul>
          <div className="mt-6 text-center">
            <Link href="/portfolios" className="text-blue-600 underline">
              Back to all portfolios
            </Link>
          </div>
        </div>
    );
}