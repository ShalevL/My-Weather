import { Navbar } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";

function MainNavigation() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>My Weather</Navbar.Brand>
          <Nav className="me-auto">
            <LinkContainer to="/homepage">
              <Nav.Link to="/homepage">Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/favorites">
              <Nav.Link href="/favorites">Favorites</Nav.Link>
            </LinkContainer>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default MainNavigation;
