"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function CompanyPage() {
    const { symbol } = useParams();
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(!symbol) return;
        fetch(`http://localhost:8000/api/company/${symbol}`)
        .then(res => res.json())
        .then(data => {
            setCompany(data);
            setLoading(false);
        });
    }, [symbol]);

    if (loading) return <div className="p-8 text-center">Loading company...</div>;
    if (!company || company.error)
        return <div className="p-8 text-center">Company not found.</div>;


    return (
        <div>
            <h1>Company Information</h1>
                <p>Name: <span>{company.name}</span></p>
                <p>Website <span>{company.weburl}</span></p>
                <Link href="/portfolios" className="text-blue-600 underline">Back to portfolios</Link>                                
        </div>
    );
}