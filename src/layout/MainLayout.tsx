import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar bg="dark" className="shadow-sm">
        <Container fluid>
          <Navbar.Brand>Health Analytics</Navbar.Brand>
        </Container>
      </Navbar>

      <Container fluid>
        <Row>
          <Col md={12} className="p-4 bg-light">
            {children}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MainLayout;