import React from "react";

function SidebarBtn({ text, onClick, active }) {
  return (
    <button
      onClick={onClick}
      className={`w-full group relative overflow-hidden transition-all duration-300 transform hover:-translate-x-2 hover:scale-[1.02] ${
        active 
          ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/50 border-l-4 border-white" 
          : "bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20 hover:border-white/40 hover:shadow-lg hover:shadow-purple-500/25"
      }`}
    >
      {/* Active Indicator */}
      {active && (
        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-yellow-400 to-orange-400 animate-pulse"></div>
      )}
      
      {/* Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
      
      <div className="relative flex items-center gap-4 px-6 py-4 font-semibold tracking-wide">
        <span className="text-lg transition-transform group-hover:scale-110">{text}</span>
        <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
          active ? "bg-yellow-400 scale-125 shadow-lg" : "bg-white/50 group-hover:bg-yellow-400 group-hover:scale-125"
        }`}></div>
      </div>
    </button>
  );
}

export default function AdminDashboard({
  children,
  dashboardPage,
  setDashboardPage,
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/30 to-indigo-900 flex overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-indigo-500/20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-3000"></div>
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-gradient-to-r from-pink-500/10 to-yellow-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* SIDEBAR */}
      <div className="w-72 bg-black/50 backdrop-blur-2xl border-r border-white/10 shadow-2xl relative z-10 flex flex-col">
        {/* Sidebar Header */}
        <div className="p-8 pb-4 border-b border-white/10 relative overflow-hidden flex-shrink-0">
          {/* Header Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-transparent to-purple-500/20"></div>
          
          <div className="relative z-10 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mx-auto mb-6 shadow-2xl shadow-indigo-500/50 border-4 border-white/20 flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
              <span className="text-3xl">🔒</span>
            </div>
            <h2 className="text-3xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-wide drop-shadow-lg">
              Cyber Panel
            </h2>
            <p className="text-white/60 text-sm mt-2 font-mono tracking-widest uppercase">Secure Control Center</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-6 pt-12 px-4 space-y-3 overflow-y-auto">
          <SidebarBtn
            text="📊 States"
            onClick={() => setDashboardPage("states")}
            active={dashboardPage === "states"}
          />
          <SidebarBtn
            text="➕ Add Case"
            onClick={() => setDashboardPage("add-case")}
            active={dashboardPage === "add-case"}
          />
          <SidebarBtn
            text="📂 All Cases"
            onClick={() => setDashboardPage("all-cases")}
            active={dashboardPage === "all-cases"}
          />
          <SidebarBtn
            text="📝 Complaints"
            onClick={() => setDashboardPage("complaints")}
            active={dashboardPage === "complaints"}
          />
        </nav>

        {/* Sidebar Footer */}
        <div className="p-6 pt-0 border-t border-white/10 flex-shrink-0">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
            <p className="text-white/70 text-xs font-mono uppercase tracking-widest mb-2">Secure Mode Active</p>
            <div className="flex items-center justify-between">
              <div className="w-20 h-1 bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 rounded-full shadow-glow"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full animate-ping shadow-lg"></div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-10 overflow-y-auto relative z-10">
        {/* Content Header */}
        <header className="mb-12">
          <div className="flex items-center gap-6 bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl shadow-black/30 hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-500">
            <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse shadow-lg"></div>
            <div>
              <h1 className="text-4xl font-black text-white/95 tracking-tight drop-shadow-lg">Cyber Dashboard</h1>
              <p className="text-gray-300 text-lg mt-2 font-mono tracking-wider">Monitoring active | All systems secure 👋</p>
            </div>
          </div>
        </header>
        
        <main className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 min-h-[80vh] shadow-2xl">
          {children}
        </main>
      </div>

      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 5px #10b981; }
          50% { box-shadow: 0 0 20px #10b981, 0 0 40px #10b981; }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-3000 { animation-delay: 3s; }
        .shadow-glow { animation: glow 2s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
