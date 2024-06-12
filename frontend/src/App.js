// Import statements
import Home from "./components/Home/Home";
import PostDetail from "./components/PostDetail/PostDetail";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import Add from "./components/Add/Add";
import Edit from "./components/Edit/Edit";
import Tags2 from "./components/Tags2/Tags2";
import LastFive from "./components/LastFive/LastFive";
import About from "./components/About/About";
import Footer from "./components/Footer/Footer";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent/NavbarComponent";
import AuthContext, { AuthProvider } from "./context/AuthContext";
import { TagsProvider } from "./context/TagsContext";

// App component
function App() {
  return (
    <div>
      <AuthProvider>
          <Router>
            <NavbarComponent />
            <Routes>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/about" element={<About />} />
              <Route path="/" exact element={<Home />} />
              <Route path="/postdetail/:post_id" element={<PostDetail />} />
              <Route path="/add" element={<Add />} />
              <Route path="/edit/:post_id" element={<Edit />} />
              <Route path="/tags2" element={<Tags2 />} />
              <Route path="/lastFive" element={<LastFive />} />
            </Routes>
            <Footer />
          </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
