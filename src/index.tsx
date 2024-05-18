import { createRoot } from "react-dom/client";
import "./index.css";

function App() {
  return <h1>Hello, world!</h1>;
}

createRoot(document.body.appendChild(document.createElement("div"))).render(
  <App />
);
