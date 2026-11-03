  import { createRoot, hydrateRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import { createAppRouter } from "./app/routes";
  import "./styles/index.css";

  const container = document.getElementById("root")!;
  createAppRouter().then((router) => {
    if (container.children.length > 0) {
      hydrateRoot(container, <App router={router} />, {
        onRecoverableError: () => {},
      });
    } else {
      createRoot(container).render(<App router={router} />);
    }
  });
