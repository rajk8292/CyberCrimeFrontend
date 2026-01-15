import React, { useState } from "react";

export default function ComplaintStatusCheck() {
  const [trackingId, setTrackingId] = useState("");
  const [complaint, setComplaint] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheckStatus = async () => {
    if (!trackingId.trim()) {
      setError("Please enter a tracking ID");
      setComplaint(null);
      return;
    }

    setLoading(true);
    setError("");
    setComplaint(null);

    try {
      const res = await fetch(`http://localhost:8080/api/complaints/${trackingId}`);

      if (res.ok) {
        const data = await res.json();
        setComplaint(data);
        setError("");
      } else if (res.status === 404) {
        setError("Invalid Tracking ID");
        setComplaint(null);
      } else {
        setError("Something went wrong. Try again.");
        setComplaint(null);
      }
    } catch (err) {
      console.error(err);
      setError("Server not reachable");
      setComplaint(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-lg mb-6">
            <svg className="w-6 h-6 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h1 className="text-xl font-bold text-white">Complaint Tracker</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-md mx-auto leading-relaxed">
            Track your complaint status instantly using your unique tracking ID
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl rounded-3xl p-8 md:p-12">
          {/* Input Section */}
          <div className="space-y-6 mb-8">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                Tracking ID
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g., CMPT-2024-00123"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-300 text-lg placeholder-gray-500 font-medium shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                />
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>

            <button
              onClick={handleCheckStatus}
              disabled={loading || !trackingId.trim()}
              className="group relative w-full py-5 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-200 transform hover:-translate-y-1 transition-all duration-300 disabled:from-gray-400 disabled:to-gray-500 disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none overflow-hidden"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Checking Status...
                </>
              ) : (
                <>
                  <svg className="w-6 h-6 mr-3 inline group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Check Status
                </>
              )}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-6 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200/50 rounded-2xl shadow-lg mb-8 backdrop-blur-sm">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div className="ml-4">
                  <p className="text-lg font-semibold text-red-900">{error}</p>
                  <p className="text-red-700 mt-1">Please check your tracking ID and try again.</p>
                </div>
              </div>
            </div>
          )}

          {/* Success Result */}
          {complaint && (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200/50 rounded-3xl p-8 shadow-2xl backdrop-blur-sm animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-green-200">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg mr-4">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      Complaint Found
                    </h3>
                    <p className="text-green-700 font-medium">Status updated successfully</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {/* Tracking ID */}
                <div className="flex justify-between items-center p-4 bg-white/60 rounded-2xl backdrop-blur-sm border border-gray-200">
                  <span className="text-lg font-semibold text-gray-700">Tracking ID</span>
                  <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-xl font-mono text-xl font-bold shadow-lg">
                    {complaint.trackingId}
                  </span>
                </div>

                {/* Status Badge */}
                <div className="p-4 bg-white/60 rounded-2xl backdrop-blur-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-700">Current Status</span>
                    <span className={`px-6 py-3 rounded-2xl font-bold text-lg shadow-lg transform transition-all duration-300 hover:scale-105 ${complaint.status === "Pending"
                        ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
                        : complaint.status === "Resolved"
                          ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white"
                          : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                      }`}>
                      {complaint.status}
                    </span>
                  </div>
                </div>
                <div className="p-6 bg-white/70 rounded-2xl backdrop-blur-sm border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                    <svg className="w-6 h-6 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                    Name
                  </h4>
                  <p className="text-gray-700 leading-relaxed text-lg">{complaint.name}</p>
                </div>
                {/* Date */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-white/60 rounded-2xl backdrop-blur-sm border border-gray-200">
                  <div>
                    <span className="block text-sm font-semibold text-gray-600 mb-1">Created Date</span>
                    <span className="text-xl font-bold text-gray-900">
                      {new Date(complaint.createdDate).toLocaleDateString('en-IN', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="p-6 bg-white/70 rounded-2xl backdrop-blur-sm border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                    <svg className="w-6 h-6 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                    Complaint Details
                  </h4>
                  <p className="text-gray-700 leading-relaxed text-lg">{complaint.description}</p>
                </div>

                {/* Document Link */}
                {complaint.documentName && (
                  <div className="pt-4">
                    <a
                      href={`http://localhost:8080/api/complaints/${trackingId}/document`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 transform group"
                    >
                      <svg className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      View Document: {complaint.document}
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Tip */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>Need help? Contact support at <span className="font-semibold text-indigo-600 hover:underline cursor-pointer">support@complaints.gov</span></p>
        </div>
      </div>
    </div>
  );
}
