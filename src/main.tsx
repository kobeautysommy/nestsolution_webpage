
  import { createRoot, hydrateRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./styles/index.css";

  const container = document.getElementById("root")!;
  if (container.innerHTML.trim()) {
    hydrateRoot(container, <App />);
  } else {
    createRoot(container).render(<App />);
  }
  