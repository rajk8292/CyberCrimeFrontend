import React from "react";

export default function Dashboard({ cases }) {
  // Ensure cases is always an array
  const caseArray = Array.isArray(cases) ? cases : [];

  const total = caseArray.length;
  const registered = caseArray.filter(c => c.status === "Registered").length;
  const closed = caseArray.filter(c => c.status === "Closed").length;
  const pending = caseArray.filter(c => c.status === "Pending").length || 0;

  // Stats with icons and colors
  const stats = [
    {
      title: "Total Cases",
      value: total,
      icon: "📊",
      color: "from-orange-500 to-orange-600",
      bg: "from-orange-500/10 to-orange-600/10",
      shadow: "shadow-orange-500/25"
    },
    {
      title: "Registered",
      value: registered,
      icon: "✅",
      color: "from-emerald-500 to-teal-600",
      bg: "from-emerald-500/10 to-teal-600/10",
      shadow: "shadow-emerald-500/25"
    },
    {
      title: "Pending",
      value: pending,
      icon: "⏳",
      color: "from-amber-500 to-yellow-600",
      bg: "from-amber-500/10 to-yellow-600/10",
      shadow: "shadow-amber-500/25"
    },
    {
      title: "Closed",
      value: closed,
      icon: "🔒",
      color: "from-purple-500 to-indigo-600",
      bg: "from-purple-500/10 to-indigo-600/10",
      shadow: "shadow-purple-500/25"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={stat.title}
          className={`
            group relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br ${stat.bg}
            border border-white/20 backdrop-blur-xl shadow-xl ${stat.shadow}
            hover:shadow-2xl hover:${stat.shadow.replace('/25', '/50')} 
            hover:border-white/40 hover:scale-[1.02] hover:-translate-y-2
            transition-all duration-500 cursor-pointer
            bg-white/5 hover:bg-white/10
          `}
        >
          {/* Card Top Gradient Line */}
          <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color} rounded-t-3xl`}></div>
          
          {/* Icon with Glow */}
          <div className="relative mb-6">
            <div className={`w-20 h-20 ${stat.color} rounded-2xl flex items-center justify-center text-3xl shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 mx-auto border-4 border-white/30`}>
              <span>{stat.icon}</span>
            </div>
            {/* Glow Effect */}
            <div className={`absolute inset-0 w-20 h-20 mx-auto rounded-2xl bg-gradient-to-r from-white/30 blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 mx-auto`}></div>
          </div>

          {/* Stats Content */}
          <div className="text-center relative z-10">
            <p className="text-4xl font-black text-white drop-shadow-lg mb-2 bg-gradient-to-r from-white to-gray-200 bg-clip-text">
              {stat.value.toLocaleString()}
            </p>
            <h3 className="text-lg font-bold text-white/90 uppercase tracking-wider mb-3">
              {stat.title}
            </h3>
            
            {/* Trend Dots */}
            <div className="flex gap-2 justify-center">
              <div className="w-3 h-3 bg-white/50 rounded-full group-hover:bg-yellow-400 group-hover:scale-125 transition-all duration-300"></div>
              <div className="w-2 h-2 bg-white/30 rounded-full group-hover:bg-orange-400 group-hover:scale-110 transition-all duration-300"></div>
            </div>
          </div>

          {/* Bottom Shine Effect */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/20 to-transparent pointer-events-none"></div>
        </div>
      ))}
    </div>
  );
}
