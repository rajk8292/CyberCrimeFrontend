import React, { useState } from "react";

export default function FilterCases({ setCases }) {
  const [filters, setFilters] = useState({});

  const handleFilter = async () => {
    let query = new URLSearchParams(filters).toString();
    const res = await fetch(`http://localhost:8080/api/cases/search?${query}`);
    const data = await res.json();
    setCases(data);
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold text-orange-500 mb-2">Filter Cases</h2>
      <input placeholder="Crime Type" className="input" onChange={e=>setFilters({...filters, crimeType:e.target.value})}/>
      <input placeholder="Assigned Officer" className="input" onChange={e=>setFilters({...filters, assignedOfficer:e.target.value})}/>
      <input placeholder="Status" className="input" onChange={e=>setFilters({...filters, status:e.target.value})}/>
      <button className="bg-orange-500 text-white px-4 py-2 rounded mt-2 hover:bg-orange-600" onClick={handleFilter}>Apply Filter</button>
    </div>
  );
}
