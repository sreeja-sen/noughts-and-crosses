import { createRoot } from "react-dom/client";

import App from "./app";


export function main() {
    const root = document.getElementById("root");
    const container = createRoot(root);

    container.render(<App />);
}

main();
