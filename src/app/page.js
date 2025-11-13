"use client";
import { useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import UploadBox from "../components/UploadBox";
import ResultCard from "../components/ResultCard";

export default function Home() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyze = async (text) => {
    setLoading(true);
    try {
      const res = await axios.post("/api/analyze", { text });
      setResult(res.data);
    } catch (err) {
      alert("Error: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <UploadBox onAnalyze={analyze} loading={loading} />
        <ResultCard result={result} loading={loading} />
      </main>
    </div>
  );
}
