import { useEffect, useState } from "react";

export default function ComplaintList() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadComplaints = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch("http://localhost:8080/api/complaints");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setComplaints(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Load error:", err);
      setError("Failed to load complaints - Check if backend is running on localhost:8080");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/complaints/${id}/status?status=${status}`,
        { method: "PUT" }
      );
      if (!res.ok) throw new Error(`Update failed: ${res.status}`);
      loadComplaints(); // Refresh list
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update status - Backend may not support CORS");
    }
  };

  // ✅ FIXED: Add useEffect to load data on mount
  useEffect(() => {
    loadComplaints();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending": return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "In Progress": return "bg-blue-100 text-blue-800 border-blue-300";
      case "Closed": return "bg-green-100 text-green-800 border-green-300";
      default: return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case "Pending": return "bg-gradient-to-r from-yellow-400 to-orange-400";
      case "In Progress": return "bg-gradient-to-r from-blue-400 to-indigo-500";
      case "Closed": return "bg-gradient-to-r from-emerald-500 to-green-600";
      default: return "bg-gradient-to-r from-gray-400 to-gray-500";
    }
  };

  if (loading) {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-12 border border-white/50 min-h-[400px] flex items-center justify-center">
        <div className="flex items-center justify-center space-x-3 text-lg text-gray-600">
          <svg className="animate-spin h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span>Loading complaints...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            All Complaints
          </h2>
          <p className="text-gray-600 mt-1 font-semibold">
            Manage complaint statuses ({complaints.length})
          </p>
        </div>
        <button
          onClick={loadComplaints}
          className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all duration-200 font-semibold"
          disabled={loading}
        >
          🔄 Refresh
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-2xl flex items-center gap-3">
          <svg className="w-6 h-6 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <div>
            <p>{error}</p>
            <p className="text-sm mt-1 text-red-600">
              💡 Fix: Add to package.json: <code>"proxy": "http://localhost:8080"</code> or enable CORS on backend
            </p>
          </div>
        </div>
      )}

      {complaints.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-3xl mx-auto mb-6 flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-700 mb-2">No Complaints</h3>
          <p className="text-gray-500">No complaints found in the system</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Table Header */}
            <thead>
              <tr className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                <th className="px-6 py-5 text-left rounded-tl-2xl font-black text-lg tracking-wide">ID</th>
                <th className="px-6 py-5 text-left font-black text-lg tracking-wide">Tracking ID</th>
                <th className="px-6 py-5 text-left font-black text-lg tracking-wide">Name</th>
                <th className="px-6 py-5 text-left font-black text-lg tracking-wide">Subject</th>
                <th className="px-6 py-5 text-left rounded-tr-2xl font-black text-lg tracking-wide">Status</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-200">
              {complaints.map((complaint) => (
                <tr 
                  key={complaint.id} 
                  className="group hover:bg-indigo-50/50 hover:shadow-lg transition-all duration-300 border-b border-gray-100"
                >
                  <td className="px-6 py-6 font-mono text-sm font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
                    #{complaint.id}
                  </td>
                  <td className="px-6 py-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-full text-sm shadow-lg">
                      {complaint.trackingId}
                    </div>
                  </td>
                  <td className="px-6 py-6 font-semibold text-gray-800">
                    {complaint.name}
                  </td>
                  <td className="px-6 py-6 text-gray-700 max-w-md">
                    {/* ✅ FIXED: Inline styles for line-clamp */}
                    <div 
                      className="max-h-12 overflow-hidden"
                      style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }}
                    >
                      {complaint.subject}
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <select
                      value={complaint.status || 'Pending'}
                      onChange={e => updateStatus(complaint.id, e.target.value)}
                      className={`
                        px-4 py-2 rounded-2xl font-bold text-sm shadow-lg transition-all duration-300
                        cursor-pointer focus:ring-4 focus:ring-indigo-200 focus:outline-none
                        hover:shadow-xl border-2 ${getStatusColor(complaint.status)}
                      `}
                    >
                      <option className="bg-white font-bold">Pending</option>
                      <option className="bg-white font-bold">In Progress</option>
                      <option className="bg-white font-bold">Closed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
