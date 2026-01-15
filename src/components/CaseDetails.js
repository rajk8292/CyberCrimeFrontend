import { useState, useEffect } from "react";

export default function CaseDetails({ caseId, onBack, setCases }) {
  const [c, setC] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/cases/${caseId}`)
      .then(res => res.json())
      .then(data => setC(data))
      .catch(err => console.error(err));
  }, [caseId]);

  const handleStatusChange = async (newStatus) => {
    try {
      const res = await fetch(`http://localhost:8080/api/cases/${c.caseId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...c, status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update status");

      const updated = await res.json();
      setC(updated);
      if (setCases) {
        setCases(prev =>
          prev.map(item => item.caseId === updated.caseId ? updated : item)
        );
      }
    } catch (err) {
      alert(err.message);
    }
  };

  if (!c) return <div className="p-4 text-center">Loading case...</div>;

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded shadow mt-4">
      <button
        onClick={onBack}
        className="mb-4 px-3 py-1 rounded bg-gray-400 text-white"
      >
        🔙 Back
      </button>
      <h2 className="text-xl font-bold mb-2">{c.caseTitle}</h2>
      <p className="mb-2">{c.description}</p>
      <p className="mb-2">Assigned Officer: {c.assignedOfficer}</p>

      <div className="mb-4">
        <label className="mr-2 font-semibold">Status:</label>
        <select
          value={c.status}
          onChange={e => handleStatusChange(e.target.value)}
          className="border p-1 rounded"
        >
          <option value="Registered">Registered</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>
      </div>
    </div>
  );
}
