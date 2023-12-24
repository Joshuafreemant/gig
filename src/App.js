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
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={auth ? <Social /> : <Login />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/conversations" element={<Conversations />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
