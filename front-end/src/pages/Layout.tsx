import { Outlet } from "react-router-dom";
import { Container, Row, Col, Navbar, Button } from "react-bootstrap";
import SideBar from "./Layout2";

const Layout = () => {
  return (
    <Container fluid style={{ height: "100vh" }} className="p-0">
      <Row className="h-100">
        {/* Sidebar */}
        <Col
          md={3}
          lg={2}
          className="bg-light d-flex flex-column p-3"
          style={{ height: "100vh" }}
        >
          <SideBar />
        </Col>

        {/* Main Content */}
        <Col className="d-flex flex-column p-0">
          {/* Navbar */}
          <Navbar bg="primary" variant="dark" expand="lg">
            <Container fluid>
              <Navbar.Brand>Dashboard Menu</Navbar.Brand>
              <Button
                variant="success"
                onClick={() => {
                  localStorage.removeItem("access_token");
                  window.location.href = "/login";
                }}
              >
                Logout
              </Button>
            </Container>
          </Navbar>

          {/* Dynamic Content */}
          <Container fluid className="p-4" style={{ overflow: "auto" }}>
            <Outlet />
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Layout;
