// Import statements
import Home from "./components/Home/Home";
import PostDetail from "./components/PostDetail/PostDetail";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import Add from "./components/Add/Add";
import Edit from "./components/Edit/Edit";
import Category from "./components/Category/Category";
import LastFive from "./components/LastFive/LastFive";
import About from "./components/About/About";
import Footer from "./components/Footer/Footer";

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
            <Route path="/edit/:post_id" element={<Edit />} />
            <Route path="/categories" element={<Category />} />
            <Route path="/lastFive" element={<LastFive />} />
            <Route path="/about" element={<About />} />
          </Routes>
          <Footer />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
