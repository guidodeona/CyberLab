"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [resultado, setResultado] = useState<any>(null);

  const analizarSitio = async () => {
  const response = await fetch("/api/scan", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url,
    }),
  });

  const data = await response.json();

  setResultado(data);
};

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-100">
      <h1 className="text-5xl font-bold mb-4">
        CyberLab
      </h1>

      <p className="text-xl text-gray-600 mb-8">
        Escáner de Seguridad Web
      </p>

      <div className="w-full max-w-2xl">
        <input
          type="text"
          placeholder="https://ejemplo.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-4 border rounded-lg shadow-sm"
        />

        <button
          onClick={analizarSitio}
          className="mt-4 w-full p-4 bg-black text-white rounded-lg"
        >
          Analizar
        </button>
        {resultado && (
  <div className="mt-6 p-4 bg-white rounded-lg shadow">

    <p>
      <strong>URL:</strong> {resultado.url}
    </p>

 <div className="mt-4">
  <p>
    <strong>HSTS:</strong>{" "}
    {resultado.securityHeaders?.hsts || "No encontrado"}
  </p>

  <p>
    <strong>CSP:</strong>{" "}
    {resultado.securityHeaders?.csp || "No encontrado"}
  </p>

  <p>
    <strong>X-Frame-Options:</strong>{" "}
    {resultado.securityHeaders?.xFrameOptions || "No encontrado"}
  </p>

  <p>
    <strong>X-Content-Type-Options:</strong>{" "}
    {resultado.securityHeaders?.xContentTypeOptions || "No encontrado"}
  </p>
</div>

  </div>
)}
      </div>
    </main>
  );
}