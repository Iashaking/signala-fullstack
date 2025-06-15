import { ReactNode } from "react";
import { Smartphone, Settings, Route, Package, Code } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface FeatureProps {
  icon: ReactNode;
  title: string;
  description: string;
  iconColor: string;
}

function FeatureCard({ icon, title, description, iconColor }: FeatureProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className={`w-12 h-12 ${iconColor} rounded-lg flex items-center justify-center mb-4`}>
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-slate-800 mb-2">{title}</h3>
        <p className="text-slate-600">{description}</p>
      </CardContent>
    </Card>
  );
}

export default function Features() {
  const features = [
    {
      icon: <div className="w-6 h-6 text-blue-600 font-bold">⚛</div>,
      title: "React Hooks",
      description: "Modern functional components with useState, useEffect, and custom hooks for state management.",
      iconColor: "bg-blue-600/10"
    },
    {
      icon: <Smartphone className="w-6 h-6 text-emerald-600" />,
      title: "Responsive Design",
      description: "Mobile-first approach with Tailwind CSS ensuring perfect display across all devices.",
      iconColor: "bg-emerald-600/10"
    },
    {
      icon: <Settings className="w-6 h-6 text-purple-600" />,
      title: "State Management",
      description: "Efficient state handling with React Context API and local component state.",
      iconColor: "bg-purple-600/10"
    },
    {
      icon: <Route className="w-6 h-6 text-amber-500" />,
      title: "React Router",
      description: "Client-side routing with React Router for seamless navigation experience.",
      iconColor: "bg-amber-500/10"
    },
    {
      icon: <Package className="w-6 h-6 text-rose-500" />,
      title: "Production Ready",
      description: "Optimized build configuration with code splitting and performance optimization.",
      iconColor: "bg-rose-500/10"
    },
    {
      icon: <Code className="w-6 h-6 text-emerald-500" />,
      title: "Clean Code",
      description: "Well-structured components with proper separation of concerns and maintainable architecture.",
      iconColor: "bg-emerald-500/10"
    }
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Built with Modern React
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Showcasing the latest React features, hooks, and best practices in a production-ready application.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              iconColor={feature.iconColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
