import {
  BrowserRouter as Router,
  Routes,
  Route,
  useHistory,
} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import Navbar from "./components/Navbar";
import Conversations from "./pages/Conversations";
import Messages from "./pages/Messages";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPasword";
import UserProfile from "./pages/UserProfile";
import GroupMessages from "./pages/GroupMessages";
import ProtectedRoute from "./protectedRoute";
import AdminSignup from "./pages/Admin/Signup";
import ControlPanel from "./pages/Admin/ControlPanel";
import Sets from "./pages/Admin/Sets";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={auth ? <Social /> : <Login />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/control-panel" element={<ControlPanel />} />
        <Route path="/sets" element={<Sets />} />
        <Route path="/admin-register" element={<AdminSignup />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-profile/:id"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/conversations"
          element={
            <ProtectedRoute>
              <Conversations />
            </ProtectedRoute>
          }
        />
        <Route
          path="/messages/:senderId/:receiverId"
          element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          }
        />
        <Route
          path="/group-messages"
          element={
            <ProtectedRoute>
              <GroupMessages />
            </ProtectedRoute>
          }
        />
        {/* <Route path="/chat" element={<Chat />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
