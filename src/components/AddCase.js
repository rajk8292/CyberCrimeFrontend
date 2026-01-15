import React, { useState } from "react";

export default function AddCase({ setCases }) {
  const [form, setForm] = useState({
    caseTitle: "",
    crimeType: "",
    assignedOfficer: "",
    description: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError("");
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.caseTitle.trim() || !form.crimeType.trim()) {
      setError("Case Title & Crime Type are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:8080/api/cases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!res.ok) throw new Error("Failed to add case");

      const newCase = await res.json();

      // Update parent state
      if (setCases) setCases(prev => [...prev, newCase]);

      // Reset form
      setForm({ caseTitle: "", crimeType: "", assignedOfficer: "", description: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const crimeTypes = [
    "Theft", "Murder", "Fraud", "Assault",
    "Cybercrime", "Robbery", "Harassment", "Other"
  ];

  return (
    <div className="relative z-50 max-w-2xl mx-auto p-6">
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl shadow-2xl p-10 border border-indigo-200/50">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl mx-auto mb-6 shadow-xl flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Add New Case</h2>
          <p className="text-xl text-gray-600">Fill details to register a new case</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Case Title */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
              📋 Case Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="caseTitle"
              placeholder="Enter case title"
              value={form.caseTitle}
              onChange={handleChange}
              style={{ pointerEvents: "auto", zIndex: 50 }} // Fix typing issue
              className="relative w-full px-5 py-4 rounded-2xl border-2 border-gray-200 bg-white shadow-lg focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 text-lg"
            />
          </div>

          {/* Crime Type */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
              ⚠️ Crime Type <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                name="crimeType"
                value={form.crimeType}
                onChange={handleChange}
                className="w-full px-5 py-4 pr-12 rounded-2xl border-2 border-gray-200 bg-white shadow-lg focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 text-lg appearance-none cursor-pointer"
              >
                <option value="">Select crime type</option>
                {crimeTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Assigned Officer */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
              👮 Assigned Officer
            </label>
            <input
              type="text"
              name="assignedOfficer"
              placeholder="Officer name/ID"
              value={form.assignedOfficer}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 bg-white shadow-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 text-lg"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
              📄 Description
            </label>
            <textarea
              name="description"
              placeholder="Enter detailed case description..."
              value={form.description}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 bg-white shadow-lg focus:border-purple-500 focus:ring-4 focus:ring-purple-100 text-lg resize-vertical min-h-[120px]"
            />
          </div>

          {/* Error */}
          {error && <div className="p-3 bg-red-100 border-2 border-red-200 text-red-800 rounded text-center font-bold">{error}</div>}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !form.caseTitle.trim() || !form.crimeType.trim()}
            className={`w-full py-4 rounded-2xl font-bold text-xl transition-all duration-300 flex items-center justify-center gap-3 ${
              loading || !form.caseTitle.trim() || !form.crimeType.trim()
                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-xl"
            }`}
          >
            {loading ? "Adding..." : "🚀 Add Case"}
          </button>
        </form>
      </div>
    </div>
  );
}
