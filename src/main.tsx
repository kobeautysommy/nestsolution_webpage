
  import { createRoot, hydrateRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./styles/index.css";

  const container = document.getElementById("root")!;
  if (container.children.length > 0) {
    hydrateRoot(container, <App />, {
      onRecoverableError: () => {},
    });
  } else {
    createRoot(container).render(<App />);
  }
  