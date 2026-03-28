import { Row, Col, Card, Container, Form, Button } from "react-bootstrap";
import FileUpload from "../components/ui/FileUpload";

const Dashboard = () => {

    const refreshCards =() => {
        console.log("Refresh");
    }
  return (
    <Container fluid>
        <Row>
            <Col md={2}>
            </Col>
                <Col md={8} className="text-center">
                    <FileUpload refreshCards={refreshCards}>
                        
                    </FileUpload>
                </Col>
            <Col md={2}>
            </Col>
        </Row>
        <hr></hr>
        <Row></Row>
        <Row className="g-4">
        <Col md={4}>
            <Card className="shadow-sm">
            <Card.Body>
                <Card.Subtitle className="text-muted">
                Total States
                </Card.Subtitle>
                <Card.Title className="mt-2">--</Card.Title>
            </Card.Body>
            </Card>
        </Col>

        <Col md={4}>
            <Card className="shadow-sm">
            <Card.Body>
                <Card.Subtitle className="text-muted">
                High Risk States
                </Card.Subtitle>
                <Card.Title className="mt-2">--</Card.Title>
            </Card.Body>
            </Card>
        </Col>

        <Col md={4}>
            <Card className="shadow-sm">
            <Card.Body>
                <Card.Subtitle className="text-muted">
                Avg Risk Score
                </Card.Subtitle>
                <Card.Title className="mt-2">--</Card.Title>
            </Card.Body>
            </Card>
        </Col>
        </Row>
    </Container>
    
  );
};

export default Dashboard;