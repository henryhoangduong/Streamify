import "./App.css";
import { Routes, Route } from "react-dom";
import HomePage from "./pages/home-page.jsx";
import SignUpPage from "./pages/signup-page.jsx";
import LoginPage from "./pages/login-page.jsx";
import NotificationPage from "./pages/notification-page.jsx";
import OnboardingPage from "./pages/onboarding-page.jsx";
import CallPage from "./pages/call-page.jsx";
import ChatPage from "./pages/chat-page.jsx";
import Toaster from "react-hot-toast";
function App() {
  return (
    <div className="h-screen" data-theme="night">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/notification" element={<NotificationPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/call" element={<CallPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
      ;
    </div>
  );
}

export default App;
