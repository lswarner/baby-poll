
import "./index.css";
import { App } from "~/App";

import { createRoot } from 'react-dom/client';

const domNode = document.getElementById('root');
if (!domNode) throw new Error('no app')
const root = createRoot(domNode);

root.render(<App />);
