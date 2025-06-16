import { useState } from "react";
import { Zap, Search, Bell, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-800">Signala</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">
                Dashboard
              </a>
              <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">
                Components
              </a>
              <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">
                Analytics
              </a>
              <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">
                Settings
              </a>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="p-2 text-slate-600 hover:text-blue-600">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2 text-slate-600 hover:text-blue-600">
              <Bell className="w-5 h-5" />
            </Button>
            <div className="w-8 h-8 bg-slate-300 rounded-full"></div>
            
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-200 py-4">
            <div className="flex flex-col space-y-3">
              <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors font-medium px-2">
                Dashboard
              </a>
              <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors font-medium px-2">
                Components
              </a>
              <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors font-medium px-2">
                Analytics
              </a>
              <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors font-medium px-2">
                Settings
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
