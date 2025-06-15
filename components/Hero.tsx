import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="gradient-primary py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Welcome to <span className="text-yellow-300">Signala</span>
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            A modern React application built with create-react-app, featuring responsive design, 
            state management, and production-ready configuration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white text-blue-600 px-8 py-3 font-semibold hover:bg-blue-50 transition-colors"
            >
              Get Started
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-2 border-white text-white px-8 py-3 font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              View Documentation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
