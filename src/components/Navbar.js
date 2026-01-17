import React, { useState } from "react";

function NavBtn({ text, icon, isActive, onClick, isMobile = false }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 rounded-xl transition duration-200
        ${isMobile ? "w-full px-4 py-3 text-left" : "px-4 py-2"}
        ${isActive ? "bg-white/10 border border-white/20" : "bg-transparent"}
        hover:bg-white/10 text-white`}
    >
      <span className="text-lg">{icon}</span>
      <span className="font-medium text-sm">{text}</span>
    </button>
  );
}

export default function Navbar({ setPage }) {
  const [activePage, setActivePage] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { text: "Home", page: "home", icon: "🏠" },
    { text: "Register Complaint", page: "register", icon: "📝" },
    { text: "Track Status", page: "status", icon: "📍" },
    { text: "Login", page: "login", icon: "🔒" },
  ];

  const handleNavClick = (page) => {
    setPage(page);
    setActivePage(page);
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-black/90 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

          {/* LOGO */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => handleNavClick("home")}
          >
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <span className="text-xl text-white">🛡</span>
            </div>
            <div>
              <h1 className="text-white text-lg font-semibold">Cyber Crime Portal</h1>
              <p className="text-xs text-white">Secure Reporting</p>
            </div>
          </div>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex gap-2">
            {navItems.map((item) => (
              <NavBtn
                key={item.page}
                text={item.text}
                icon={item.icon}
                isActive={activePage === item.page}
                onClick={() => handleNavClick(item.page)}
              />
            ))}
          </div>

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden p-2 rounded-lg bg-white/10 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* MOBILE MENU */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/90 border-t border-white/10">
            <div className="px-4 py-3 space-y-2">
              {navItems.map((item) => (
                <NavBtn
                  key={item.page}
                  text={item.text}
                  icon={item.icon}
                  isActive={activePage === item.page}
                  onClick={() => handleNavClick(item.page)}
                  isMobile
                />
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
