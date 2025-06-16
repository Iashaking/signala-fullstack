import { useState } from "react";
import { Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function InteractiveDemo() {
  const [counter, setCounter] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Build React components", completed: false },
    { id: 2, text: "Setup project structure", completed: true }
  ]);
  const [newTodo, setNewTodo] = useState("");

  const increment = () => setCounter(prev => prev + 1);
  const decrement = () => setCounter(prev => prev - 1);
  const reset = () => setCounter(0);

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos(prev => [...prev, { id: Date.now(), text: newTodo.trim(), completed: false }]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Interactive Components
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Demonstrating state management and user interactions with React hooks.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Counter Component */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-slate-800">Counter Component</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-6xl font-bold text-blue-600 mb-6">{counter}</div>
              <div className="flex justify-center space-x-4">
                <Button
                  onClick={decrement}
                  className="bg-blue-600 text-white hover:bg-blue-700"
                  size="lg"
                >
                  <Minus className="w-5 h-5" />
                </Button>
                <Button
                  onClick={reset}
                  variant="secondary"
                  size="lg"
                  className="bg-slate-200 text-slate-700 hover:bg-slate-300"
                >
                  Reset
                </Button>
                <Button
                  onClick={increment}
                  className="bg-blue-600 text-white hover:bg-blue-700"
                  size="lg"
                >
                  <Plus className="w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Todo List Component */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-slate-800">Todo List</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="Add a new task..."
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button
                  onClick={addTodo}
                  className="bg-blue-600 text-white hover:bg-blue-700"
                  size="sm"
                >
                  <Plus className="w-5 h-5" />
                </Button>
              </div>
              <div className="space-y-2">
                {todos.map((todo) => (
                  <div
                    key={todo.id}
                    className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg"
                  >
                    <Checkbox
                      checked={todo.completed}
                      onCheckedChange={() => toggleTodo(todo.id)}
                      className="rounded"
                    />
                    <span
                      className={`flex-1 ${
                        todo.completed ? 'text-slate-400 line-through' : 'text-slate-700'
                      }`}
                    >
                      {todo.text}
                    </span>
                    <Button
                      onClick={() => deleteTodo(todo.id)}
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
