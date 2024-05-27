// Import statements
import Home from "./components/Home/Home";
import PostDetail from "./components/PostDetail/PostDetail";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import Add from "./components/Add/Add";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent/NavbarComponent";
import AuthContext, {AuthProvider}  from "./context/AuthContext";

// App component
function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <NavbarComponent />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/postdetail/:post_id" element={<PostDetail />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/add" element={<Add />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
