import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(
  <div className="min-h-screen w-full bg-page flex items-center justify-center sm:p-6 relative overflow-hidden">
    <div
      className="phone-frame relative z-10 w-full max-w-[430px] bg-background overflow-hidden border-border sm:border sm:shadow-2xl sm:rounded-[44px] h-[100dvh] sm:h-[min(900px,90vh)]"
      style={{ transform: 'translateZ(0)' }}
    >
      <App />
    </div>
  </div>
);
