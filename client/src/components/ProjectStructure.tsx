import { Folder, File } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function ProjectStructure() {
  return (
    <section className="bg-slate-800 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Project Structure
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Standard create-react-app structure with organized components and clean architecture.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center space-x-2 mb-4">
              <Folder className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-medium">signala-frontend/</span>
            </div>
            <div className="space-y-2 text-sm font-mono">
              <div className="flex items-center space-x-2 ml-4">
                <Folder className="w-4 h-4 text-yellow-400" />
                <span className="text-slate-300">public/</span>
              </div>
              <div className="flex items-center space-x-2 ml-8">
                <File className="w-4 h-4 text-blue-400" />
                <span className="text-slate-300">index.html</span>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <Folder className="w-4 h-4 text-yellow-400" />
                <span className="text-slate-300">src/</span>
              </div>
              <div className="flex items-center space-x-2 ml-8">
                <Folder className="w-4 h-4 text-yellow-400" />
                <span className="text-slate-300">components/</span>
              </div>
              <div className="flex items-center space-x-2 ml-8">
                <Folder className="w-4 h-4 text-yellow-400" />
                <span className="text-slate-300">hooks/</span>
              </div>
              <div className="flex items-center space-x-2 ml-8">
                <File className="w-4 h-4 text-green-400" />
                <span className="text-slate-300">App.tsx</span>
              </div>
              <div className="flex items-center space-x-2 ml-8">
                <File className="w-4 h-4 text-green-400" />
                <span className="text-slate-300">index.tsx</span>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <File className="w-4 h-4 text-purple-400" />
                <span className="text-slate-300">package.json</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <Card className="bg-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-slate-800 mb-3">Component Architecture</h3>
                <p className="text-slate-600 mb-4">Modular components with clear separation of concerns and reusable logic.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-600/10 text-blue-600 rounded-full text-sm font-medium">Functional Components</span>
                  <span className="px-3 py-1 bg-emerald-600/10 text-emerald-600 rounded-full text-sm font-medium">Custom Hooks</span>
                  <span className="px-3 py-1 bg-purple-600/10 text-purple-600 rounded-full text-sm font-medium">Context API</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-slate-800 mb-3">Development Tools</h3>
                <p className="text-slate-600 mb-4">Integrated development environment with hot reloading and debugging tools.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">ESLint</span>
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">Prettier</span>
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">React DevTools</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
