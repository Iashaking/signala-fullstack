import { createRoot } from "react-dom/client";
import App from "./App/Component";
import "./index.css";

console.log("🔥 main.tsx loaded at", new Date());

createRoot(document.getElementById("root")!).render(<App />);
