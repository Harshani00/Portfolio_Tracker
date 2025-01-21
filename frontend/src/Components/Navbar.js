
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Navbar.css'; // Import the CSS file for custom styles
import logo from '../Assets/Logo.png'; 
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

function Navigationbar() {
  const navigate = useNavigate();

  // Retrieve the user's name from localStorage
  const userName = localStorage.getItem('userName') || 'Guest'; 

  // Logout function
  const handleLogout = () => {
    // Clear all data in localStorage
    localStorage.clear(userName);
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userID');
    localStorage.removeItem('U_Id'); 
   
    

    // Redirect to the home page
    navigate('/home');
  };

  return (
    <Navbar expand="lg" className="custom-navbar"> 
      <Container>
        <Navbar.Brand onClick={() => navigate('/home')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
         
          <img
            src={logo}
            alt="Logo"
            style={{ width: '30px', height: '30px', marginRight: '10px' }} // Adjust size and spacing
          />
          ᴘᴏʀᴛғᴏʟɪᴏ𝟹𝟼𝟶
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto"> 
            <Nav.Link onClick={() => navigate('/home')}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate('/dashboard')}>Dashboard</Nav.Link>
            <Nav.Link onClick={() => navigate('/newStockdetails')}>NewStock</Nav.Link>
            <Nav.Link onClick={() => navigate('/currentstock')}>Current Stocks</Nav.Link>
          </Nav>
       
          <Nav className="ms-3"> 
            <Nav.Link disabled> {userName}</Nav.Link>
          </Nav>
        
          <Nav.Link onClick={handleLogout}>
            <LogoutRoundedIcon style={{ fontSize: '1.5rem', marginRight: '5px' }} />
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigationbar;
