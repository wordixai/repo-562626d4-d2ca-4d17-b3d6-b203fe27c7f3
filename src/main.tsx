import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Register Remotion root if in studio mode
if (typeof window !== 'undefined' && window.location.search.includes('remotion')) {
  const { RemotionRoot } = await import('./remotion/Root');
  createRoot(document.getElementById("root")!).render(<RemotionRoot />);
} else {
  createRoot(document.getElementById("root")!).render(<App />);
}