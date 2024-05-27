import React, { useContext } from "react";
/* import { Link } from "react-router-dom"; */
import axios from "axios";
import "./Navbar.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import AuthContext from "../../context/AuthContext";
import { IoMdMenu } from "react-icons/io";
import { SlMagnifier } from "react-icons/sl";


const NavbarComponent = () => {
  const user = "";
  const welcomeMessage = `Welcome ${user}`;
  const { setIsLoggedIn, isLoggedIn } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("authToken")}`;
      await axios.post("http://127.0.0.1:8000/auth/logout/");
      localStorage.clear();
      axios.defaults.headers.common["Authorization"] = null;
      console.log("logged out");
      setIsLoggedIn(false);
    } catch (error) {
      console.log("error during logout: " + error);
    }
    /* window.location.href = '/' */
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary navbar-container">
      <Container fluid className="navbar-container">
        <Navbar.Brand href="/" className="logo">
          Blog
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" >
        <span>
        <IoMdMenu fill="white" style={{fontSize:"30px"}}/>
        </span>
      </Navbar.Toggle>
        <Navbar.Collapse id="Toggle navigation" >
        

          <Nav className="me-auto my-2 my-lg-0" >
            <Nav.Link href="/" className="nav-link">
              Home
            </Nav.Link>
            <Nav.Link href="/" className="nav-link">
              Posts
            </Nav.Link>

            <NavDropdown
              title={isLoggedIn ? welcomeMessage : "More"}
              id="navbarScrollingDropdown"
              className="nav-dropdown-customize"
            >
              {isLoggedIn ? (
                <NavDropdown.Item href="#action3" onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              ) : (
                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
              )}
              <NavDropdown.Divider />
              <NavDropdown.Item href="/add">New post</NavDropdown.Item>
            </NavDropdown>
              
            <Nav.Link href="/add" className="nav-link toggle-hide">
              New Post
            </Nav.Link>
            {!isLoggedIn ? (
              <Nav.Link href="/login" className="nav-link toggle-hide">
                Login
              </Nav.Link>
            ) : (
              <Nav.Link href="#" onClick={handleLogout} className="nav-link toggle-hide">
                Logout
              </Nav.Link>
            )}
          </Nav>
          <Form className="form-customize d-flex justify-content-center align-items-center">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 search-custom"
              aria-label="Search"
              style={{ height: "25px" }}
            />
            <Button
              style={{ height: "25px", color: "white" }}
              className=" d-flex align-items-center button-menu search-bt-custom"
            >
              <SlMagnifier />
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
