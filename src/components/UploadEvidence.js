import React, { useState } from "react";

export default function UploadEvidence({ caseId }) {
  const [fileName, setFileName] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const handleUpload = async () => {
    if (!caseId) return alert("Select a case first");
    const res = await fetch("http://localhost:8080/api/evidence", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ caseId, fileName, fileUrl })
    });
    if (res.ok) {
      alert("Evidence uploaded");
      setFileName("");
      setFileUrl("");
    }
  };

  return (
    <div className="bg-white p-4 shadow rounded mt-4">
      <h2 className="text-xl font-bold text-orange-500 mb-2">Upload Evidence</h2>
      <input placeholder="File Name" className="input" value={fileName} onChange={e=>setFileName(e.target.value)}/>
      <input placeholder="File URL" className="input" value={fileUrl} onChange={e=>setFileUrl(e.target.value)}/>
      <button className="bg-orange-500 text-white px-4 py-2 rounded mt-2 hover:bg-orange-600" onClick={handleUpload}>Upload</button>
    </div>
  );
}
