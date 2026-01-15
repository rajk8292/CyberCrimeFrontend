import { useState } from "react";

export default function CaseList({ cases, setCases, onEdit }) {
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({});

  const saveEdit = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/api/cases/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to save");

      const updated = await res.json();
      setCases(prev => prev.map(item => item.caseId === updated.caseId ? updated : item));
      setEditingId(null);
    } catch (err) {
      alert(err.message);
    }
  };

  if (!cases || cases.length === 0) 
    return (
      <div className="bg-white/3 backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center shadow-2xl sm:p-8">
        <div className="w-24 h-24 bg-gradient-to-br from-gray-600 to-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl border-2 border-white/20 sm:w-20 sm:h-20">
          <span className="text-4xl opacity-40 sm:text-3xl">📋</span>
        </div>
        <h3 className="text-2xl font-black text-white mb-3 tracking-tight sm:text-xl">No Active Cases</h3>
        <p className="text-gray-400 font-mono text-lg sm:text-base">Database empty. All systems nominal.</p>
      </div>
    );

  return (
    <div className="space-y-6 p-4 sm:p-0">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl">
        <div>
          <h2 className="text-3xl font-black bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent sm:text-2xl">
            Case Database
          </h2>
          <p className="text-gray-400 font-mono text-sm uppercase tracking-widest mt-1">
            {cases.length} active records
          </p>
        </div>
        <div className="flex items-center justify-center lg:justify-end gap-2 text-xs font-mono uppercase tracking-wider text-green-400">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
          Live Data
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white/2 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-sm border-b border-white/20">
                <th className="px-4 py-5 text-left font-black text-white/90 text-sm uppercase tracking-wider sm:px-6">Case</th>
                <th className="px-4 py-5 text-left font-black text-white/90 text-sm uppercase tracking-wider sm:px-6">Crime</th>
                <th className="px-4 py-5 text-left font-black text-white/90 text-sm uppercase tracking-wider sm:px-6">Officer</th>
                <th className="px-4 py-5 text-left font-black text-white/90 text-sm uppercase tracking-wider sm:px-6">Status</th>
                <th className="px-4 py-5 text-left font-black text-white/90 text-xs uppercase tracking-wider sm:px-6 sm:table-cell hidden">Description</th>
                <th className="px-4 py-5 text-right font-black text-white/90 text-sm uppercase tracking-wider sm:px-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {cases.map((c) => (
                <tr 
                  key={c.caseId}
                  className="group hover:bg-white/5 transition-all duration-300 border-b border-white/5 hover:border-white/20"
                >
                  {/* Case Title */}
                  <td className="px-4 py-4 sm:px-6 sm:py-6">
                    {editingId === c.caseId ? (
                      <input
                        className="w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-3 py-2 text-white font-bold text-sm focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500/50 focus:outline-none sm:text-base"
                        value={form.caseTitle || ''}
                        onChange={(e) => setForm({ ...form, caseTitle: e.target.value })}
                        autoFocus
                      />
                    ) : (
                      <div className="font-black text-lg bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent group-hover:from-indigo-400 group-hover:to-purple-500 transition-all duration-500 sm:text-xl">
                        {c.caseTitle}
                      </div>
                    )}
                    <div className="text-xs font-mono text-gray-400 mt-1">#{c.caseId}</div>
                  </td>

                  {/* Crime Type */}
                  <td className="px-4 py-4 sm:px-6 sm:py-6">
                    {editingId === c.caseId ? (
                      <input
                        className="w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-3 py-2 text-white text-sm focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500/50 focus:outline-none sm:text-base"
                        value={form.crimeType || ''}
                        onChange={(e) => setForm({ ...form, crimeType: e.target.value })}
                      />
                    ) : (
                      <span className="inline-block bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent font-mono font-bold px-2 py-1 rounded-full text-xs border border-orange-400/30 sm:text-sm sm:px-3">
                        {c.crimeType}
                      </span>
                    )}
                  </td>

                  {/* Officer */}
                  <td className="px-4 py-4 sm:px-6 sm:py-6">
                    {editingId === c.caseId ? (
                      <input
                        className="w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-3 py-2 text-white text-sm focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500/50 focus:outline-none sm:text-base"
                        value={form.assignedOfficer || ''}
                        onChange={(e) => setForm({ ...form, assignedOfficer: e.target.value })}
                      />
                    ) : (
                      <div className="font-mono text-white/90 font-semibold text-xs bg-white/5 px-2 py-1 rounded-xl border border-white/20 sm:text-sm sm:px-3">
                        {c.assignedOfficer}
                      </div>
                    )}
                  </td>

                  {/* Status - Fixed Dropdown */}
                  <td className="px-4 py-4 sm:px-6 sm:py-6">
                    {editingId === c.caseId ? (
                      <div className="relative">
                        <select
                          className="w-full bg-white/20 backdrop-blur-sm border border-white/30 hover:border-white/50 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/50 rounded-xl px-3 py-2 text-white font-bold text-sm appearance-none cursor-pointer focus:outline-none shadow-sm transition-all duration-300 sm:text-base"
                          value={form.status || ''}
                          onChange={(e) => setForm({ ...form, status: e.target.value })}
                        >
                          <option className="bg-gray-800 text-white" value="Registered">Registered</option>
                          <option className="bg-gray-800 text-white" value="In Progress">In Progress</option>
                          <option className="bg-gray-800 text-white" value="Closed">Closed</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    ) : (
                      <span className={`px-3 py-2 rounded-xl font-mono font-bold text-xs uppercase tracking-wider shadow-lg whitespace-nowrap ${
                        c.status === 'Closed' 
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 shadow-emerald-500/30 animate-pulse'
                          : c.status === 'In Progress'
                          ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-400/40 shadow-yellow-500/30'
                          : 'bg-orange-500/20 text-orange-300 border border-orange-400/40 shadow-orange-500/30'
                      }`}>
                        {c.status}
                      </span>
                    )}
                  </td>

                  {/* Description - Hidden on Mobile */}
                  <td className="px-4 py-4 sm:px-6 sm:py-6 max-w-xs sm:table-cell hidden">
                    {editingId === c.caseId ? (
                      <textarea
                        className="w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-3 py-2 text-white font-mono text-sm resize-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500/50 focus:outline-none"
                        rows={2}
                        value={form.description || ''}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                      />
                    ) : (
                      <p className="text-gray-300 font-mono text-xs leading-relaxed line-clamp-2 sm:text-sm">
                        {c.description}
                      </p>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-4 sm:px-6 sm:py-6 text-right">
                    {editingId === c.caseId ? (
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => saveEdit(c.caseId)}
                          className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-3 py-2 rounded-xl font-bold text-xs shadow-lg shadow-emerald-500/50 hover:scale-105 transition-all duration-200 sm:text-sm sm:px-4"
                        >
                          💾 Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-xl font-bold text-xs border border-white/30 hover:scale-105 transition-all duration-200 sm:text-sm"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-1 sm:gap-2 justify-end">
                        <button
                          onClick={() => {
                            setEditingId(c.caseId);
                            setForm(c);
                          }}
                          className="group relative p-2 sm:p-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-indigo-500 hover:to-purple-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 hover:scale-110"
                          title="Edit"
                        >
                          <span className="text-lg sm:text-xl group-hover:rotate-12 transition-transform">✏️</span>
                        </button>
                        <button
                          onClick={() => onEdit(c.caseId)}
                          className="group relative p-2 sm:p-3 rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 hover:from-red-500 hover:to-orange-600 text-white shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300 hover:scale-110"
                          title="Details"
                        >
                          <span className="text-lg sm:text-xl group-hover:rotate-12 transition-transform">📋</span>
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
