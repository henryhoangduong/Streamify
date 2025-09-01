import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home-page.jsx";
import SignUpPage from "./pages/signup-page.jsx";
import LoginPage from "./pages/login-page.jsx";
import NotificationPage from "./pages/notification-page.jsx";
import OnboardingPage from "./pages/onboarding-page.jsx";
import CallPage from "./pages/call-page.jsx";
import ChatPage from "./pages/chat-page.jsx";

import { Navigate } from "react-router-dom";
import PageLoader from "./components/PageLoader.jsx";
import useAuthUser from "./hooks/useAuthUser.js";
function App() {
  const { authUser, isLoading } = useAuthUser();
  if (isLoading) {
    return <PageLoader />;
  }
  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;
  return (
    <div className="h-screen" data-theme="forest">
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated && isOnboarded ? (
              <HomePage />
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/signup"
          element={!isAuthenticated ? <SignUpPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/login"
          element={!isAuthenticated ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/notification"
          element={
            isAuthenticated ? <NotificationPage /> : <Navigate to={"/login"} />
          }
        />
        <Route
          path="/onboarding"
          element={
            isAuthenticated ? <OnboardingPage /> : <Navigate to={"/login"} />
          }
        />
        <Route
          path="/call"
          element={isAuthenticated ? <CallPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/chat"
          element={isAuthenticated ? <ChatPage /> : <Navigate to={"/login"} />}
        />
      </Routes>
    </div>
  );
}

export default App;
