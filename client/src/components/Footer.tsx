import { Zap, Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Signala</span>
            </div>
            <p className="text-slate-300 mb-6 max-w-md">
              A modern React application showcasing best practices, responsive design, 
              and production-ready architecture built with create-react-app.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">API Reference</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Examples</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Tutorials</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Community</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">GitHub</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Discord</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Stack Overflow</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Reddit</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-700 mt-12 pt-8 text-center">
          <p className="text-slate-400">
            © 2024 Signala. Built with React and Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}
