import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Dropdown } from 'react-bootstrap';
import UserService from '../../services/UserServices';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const title = "CineCloud";
  const logoUrl = "/movie.png";

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await UserService.logoutUser();
      localStorage.removeItem('user');
      localStorage.removeItem('cart');
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // If the error is due to invalid token or session, still logout the user locally
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const UserAvatar = ({ user }) => (
    <div className="user-avatar">
      {user.firstName.charAt(0)}{user.lastName.charAt(0)}
    </div>
  );

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="header-nav">
      <Container fluid>
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img
            src={logoUrl}
            alt="CineCloud"
            width="50"
            height="50"
            style={{ borderRadius: '50%'}}
            className="d-inline-block align-top me-2"
          />
          <span className="brand-title">{title}</span>
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/movies" className="nav-link">
              All Movies
            </Nav.Link>
            <Nav.Link as={Link} to="/favorites" className="nav-link">
              Favorites
            </Nav.Link>
            { user && <Nav.Link as={Link} to="/cart" className="nav-link">
              My Cart
            </Nav.Link>}
            {user && (
              <Nav.Link as={Link} to="/orders" className="nav-link">
                Orders
              </Nav.Link>
            )}
          </Nav>

          <Nav>
            {!user ? (
              <Button
                variant="outline-light"
                as={Link}
                to="/login"
                className="login-btn"
              >
                Login
              </Button>
            ) : (
              <Dropdown align="end">
                <Dropdown.Toggle 
                  variant="link" 
                  id="user-dropdown"
                  className="user-dropdown-toggle"
                  disabled={loading}
                >
                  <UserAvatar user={user} />
                </Dropdown.Toggle>

                <Dropdown.Menu className="user-dropdown-menu">
                  <div className="px-4 py-3 text-center">
                    <UserAvatar user={user} />
                    <h6 className="mt-2 mb-1">{`${user.firstName} ${user.lastName}`}</h6>
                    <p className="small mb-2">{user.email}</p>
                    <hr className="my-2" />
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={handleLogout}
                      className="w-100"
                      disabled={loading}
                    >
                      {loading ? 'Logging out...' : 'Logout'}
                    </Button>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;