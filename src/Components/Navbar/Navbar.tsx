import * as React from "react";
import {
  Navbar,
  Nav,
  Container,
} from "react-bootstrap";

interface SitebarProps {
  sessionToken: string;
  logout: () => void;
  isAdmin: boolean;
}

interface SitebarState {}

class Sitebar extends React.Component<SitebarProps, SitebarState> {
  constructor(props: SitebarProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
<Navbar expand="lg" variant="dark">
  <Container className="container">
    <Navbar.Brand href="/getMyRecipes" className="brand">Whats4Dinner</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
      <div>
      <Nav>
      {this.props.isAdmin ? (
        <Nav.Link className="navlink" href="/getAllUsers">Show All Users</Nav.Link>
    ): null}
        {this.props.isAdmin ? (
        <Nav.Link className="navlink" href="/getAllRecipes">Show All Recipes</Nav.Link>
        ): null}
        <Nav.Link className="navlink" href="/fetchFood">Search for Food</Nav.Link>
        <Nav.Link className="navlink" href="/fetchDrinks">Search for Drinks</Nav.Link>
        <Nav.Link className="navlink" href="/getMyRecipes">Get My Recipes</Nav.Link>
        <Nav.Link className="navlink" href="/" onClick={this.props.logout}>Logout</Nav.Link>
      </Nav>
      </div>
    </Navbar.Collapse>
  </Container>
</Navbar>
    );
  }
}

export default Sitebar;
