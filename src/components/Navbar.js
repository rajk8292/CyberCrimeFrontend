import React, { useState, useEffect } from "react";

export default function Navbar({ setPage }) {
  const [activePage, setActivePage] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuHeight, setMenuHeight] = useState(0);

  const navItems = [
    { text: "Home", page: "home", icon: "🏠" },
    { text: "Register Complaint", page: "register", icon: "🚨" },
    { text: "Track Status", page: "status", icon: "📱" },
    { text: "Login", page: "login", icon: "⚙️" },
  ];

  const handleNavClick = (page) => {
    setPage(page);
    setActivePage(page);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    // Calculate menu height for smooth push
    if (isMenuOpen) {
      const menu = document.querySelector('.mobile-menu-container');
      if (menu) {
        setMenuHeight(menu.scrollHeight);
      }
    } else {
      setMenuHeight(0);
    }
  }, [isMenuOpen]);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-black/95 backdrop-blur-2xl border-b border-cyan-500/30 shadow-2xl shadow-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 md:py-6">
            
            {/* LOGO */}
            <div 
              className="flex items-center gap-3 cursor-pointer group hover:scale-105 transition-all duration-300"
              onClick={() => handleNavClick("home")}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-cyan-500/50 group-hover:shadow-cyan-500/75 group-hover:scale-110 transition-all duration-300 animate-pulse">
                <span className="text-2xl">🛡</span>
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg tracking-tight">
                  Cyber Crime Portal
                </h2>
                <p className="text-xs md:text-sm text-cyan-400/80 font-mono uppercase tracking-wider hidden sm:block">
                  Secure Reporting
                </p>
              </div>
            </div>

            {/* DESKTOP NAV */}
            <div className="hidden md:flex items-center gap-2 lg:gap-4">
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

            {/* MOBILE MENU BUTTON */}
            <button 
              className="md:hidden p-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/40 shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 w-12 h-12 flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
            >
              <span className={`text-xl transition-all duration-300 ${isMenuOpen ? 'text-red-400 rotate-90' : 'text-cyan-400'}`}>
                {isMenuOpen ? "✕" : "☰"}
              </span>
            </button>
          </div>

          {/* MOBILE MENU - Normal Flow (Pushes Content Down) */}
          <div 
            className={`mobile-menu-container md:hidden transition-all duration-500 ease-in-out overflow-hidden ${
              isMenuOpen 
                ? 'max-h-96 opacity-100 py-6 px-4' 
                : 'max-h-0 opacity-0 py-0 px-0'
            } bg-black/98 backdrop-blur-2xl border-t border-cyan-500/30 shadow-2xl`}
          >
            <div className="max-w-7xl mx-auto space-y-2">
              {navItems.map((item, index) => (
                <NavBtn 
                  key={item.page}
                  text={item.text}
                  icon={item.icon}
                  isActive={activePage === item.page}
                  onClick={() => handleNavClick(item.page)}
                  isMobile
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Content Push Spacer - Only affects content BELOW navbar */}
      <div 
        className="transition-all duration-500 ease-in-out bg-transparent"
        style={{ height: `${menuHeight}px`, transform: 'translateZ(0)' }}
      />

      <style jsx>{`
        @keyframes slideDown {
          from { 
            opacity: 0; 
            transform: translateY(-20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        @keyframes shieldPulse {
          0%, 100% { 
            filter: drop-shadow(0 0 10px rgba(0,212,255,0.6)); 
          }
          50% { 
            filter: drop-shadow(0 0 20px rgba(0,212,255,1)); 
          }
        }
        .animate-slideDown {
          animation: slideDown 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </>
  );
}

function NavBtn({ text, icon, isActive, onClick, isMobile = false, delay = 0 }) {
  return (
    <button
      style={{ animationDelay: `${delay}s` }}
      onClick={onClick}
      className={`group relative overflow-hidden font-semibold tracking-wide transition-all duration-500 ease-out flex items-center gap-3 px-6 py-3 rounded-2xl backdrop-blur-sm border ${
        isMobile 
          ? 'w-full justify-start px-6 py-4 border-l-4 hover:border-cyan-400 shadow-lg hover:shadow-cyan-500/30'
          : 'hover:scale-105 hover:shadow-2xl'
      } ${
        isActive
          ? 'bg-gradient-to-r from-cyan-500/30 to-blue-600/30 text-white border-cyan-400 shadow-xl shadow-cyan-500/50 scale-105'
          : 'bg-white/10 hover:bg-white/20 border-white/20 hover:border-white/40 text-white/90 hover:text-white'
      }`}
    >
      <span className={`text-xl md:text-2xl transition-transform duration-300 group-hover:scale-110 ${
        isActive ? 'text-cyan-300 drop-shadow-lg' : ''
      }`}>
        {icon}
      </span>
      
      <span className={`${isActive ? 'font-black drop-shadow-lg' : 'font-semibold'}`}>
        {text}
      </span>

      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      
      {isActive && (
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-2xl blur opacity-75 animate-pulse" />
      )}
    </button>
  );
}
