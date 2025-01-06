import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Navbar.css'; // Import the CSS file for custom styles
import logo from '../Assets/Logo.png'; // Import your logo image (adjust the path as needed)

function Navigationbar() {
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" className="custom-navbar"> {/* Apply custom class */}
      <Container>
        <Navbar.Brand onClick={() => navigate('/home')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          {/* Logo and name */}
          <img
            src={logo}
            alt="Logo"
            style={{ width: '30px', height: '30px', marginRight: '10px'}} // Adjust size and spacing
          />
          ᴘᴏʀᴛғᴏʟɪᴏ𝟹𝟼𝟶
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto"> {/* Align items to the right using ms-auto */}
             <Nav.Link onClick={() => navigate('/home')}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate('/dashboard')}>Dashboard</Nav.Link>
            <Nav.Link onClick={() => navigate('/newStockdetails')}>NewStock</Nav.Link>
            <Nav.Link onClick={() => navigate('/currentstock')}>Current Stocks</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigationbar;

