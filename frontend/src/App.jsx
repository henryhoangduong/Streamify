import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home-page.jsx";
import SignUpPage from "./pages/signup-page.jsx";
import LoginPage from "./pages/login-page.jsx";
import NotificationPage from "./pages/notification-page.jsx";
import OnboardingPage from "./pages/onboarding-page.jsx";
import CallPage from "./pages/call-page.jsx";
import ChatPage from "./pages/chat-page.jsx";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./lib/axios.js";
import { Navigate } from "react-router-dom";
function App() {
  const {
    data: authData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await axiosInstance.get("/auth/me");
      return res.data;
    },
    retry: false,
  });
  const authUser = authData?.user;
  return (
    <div className="h-screen" data-theme="forest">
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/notification"
          element={authUser ? <NotificationPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/onboarding"
          element={authUser ? <OnboardingPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/call"
          element={authUser ? <CallPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/chat"
          element={authUser ? <ChatPage /> : <Navigate to={"/login"} />}
        />
      </Routes>
    </div>
  );
}

export default App;
