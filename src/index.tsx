import "./assets/style.css";

import { createRoot } from "react-dom/client";

import { config } from "../config";
import { CVTemplate } from "./components/CVTemplate";

const root = createRoot(document.getElementById("app")!);

root.render(<CVTemplate config={config} />);
