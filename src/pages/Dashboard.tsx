import { Row, Col, Card, Container } from "react-bootstrap";
import FileUpload from "../components/ui/FileUpload";
import { useEffect, useState } from "react";
import { apiRequest, getStates, getHighRiskStates, getRiskScores, getDemographics  } from "../services/api";
import { GET_ALL_STATES_END_POINT, GET_DEMOGRPAHICS_END_POINT, GET_HIGH_RISK_STATES_END_POINT, GET_RISK_SCORES_END_POINT } from "../constants";
import Demographics from "../components/tables/demographics";




const Dashboard = () => {

    const [states, setStates] = useState([]);
    const [highRiskStates, setHighRiskStates] = useState([])
    const [riskScores, setRiskScores] = useState([])
    const [refresh, setRefresh] = useState(false)
    
    

    const refreshCards = async () => {
        try {
            const [
                statesData, 
                highRiskData, 
                riskData
            ] = await Promise.all([
                    getStates(),
                    getHighRiskStates(),
                    getRiskScores(),
            ]);

            setStates(statesData);
            setHighRiskStates(highRiskData);
            setRiskScores(riskData)

        } catch (err: any) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        const loadData = async () => {
            try {
                const [
                    statesData,
                    highRiskData, 
                    risksData,
                ] = await Promise.all([
                    getStates(),
                    getHighRiskStates(),
                    getRiskScores(),
                ]);

                setStates(statesData);
                setHighRiskStates(highRiskData);
                setRiskScores(risksData)

            } catch (err: any) {
                console.log(err.message);
            }
        };

        loadData();
    }, []);

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
                    <Card.Title className="mt-2">{states.length}</Card.Title>
                </Card.Body>
                </Card>
            </Col>

            <Col md={4}>
                <Card className="shadow-sm">
                <Card.Body>
                    <Card.Subtitle className="text-muted">
                    High Risk States
                    </Card.Subtitle>
                    <Card.Title className="mt-2">{highRiskStates.length}</Card.Title>
                </Card.Body>
                </Card>
            </Col>

            <Col md={4}>
                <Card className="shadow-sm">
                <Card.Body>
                    <Card.Subtitle className="text-muted">
                    Avg Risk Score
                    </Card.Subtitle>
                    <Card.Title className="mt-2">{
                            (riskScores.reduce((sum, item) => 
                                sum + item.risk_score, 0) / riskScores.length).toFixed(2)
                        }</Card.Title>
                </Card.Body>
                </Card>
            </Col>
            </Row>
            <br />
            <Row>
                <Col md={6}>
                        <Card className="shadow-sm">
                            <Card.Body>
                                <Card.Subtitle className="text-muted">
                                Demographics
                                </Card.Subtitle>
                                <br />
                                <Demographics 
                                    refreshCard={refresh}
                                    updateRefresh={setRefresh}
                                />
                            </Card.Body>
                        </Card>
                </Col>
                <Col md={6}>
                        <Card className="shadow-sm">
                            <Card.Body>
                                <Card.Subtitle className="text-muted">
                                State Profile
                                </Card.Subtitle>
                            </Card.Body>
                        </Card>
                </Col>
            </Row>
            <br />
            <Row>
                <Col md={6}>
                        <Card className="shadow-sm">
                            <Card.Body>
                                <Card.Subtitle className="text-muted">
                                High Risk States
                                </Card.Subtitle>
                            </Card.Body>
                        </Card>
                </Col>
                <Col md={6}>
                        <Card className="shadow-sm">
                            <Card.Body>
                                <Card.Subtitle className="text-muted">
                                Top N States by Risk Score
                                </Card.Subtitle>
                            </Card.Body>
                        </Card>
                </Col>
            </Row>
            <br />
            <Row>
                <Col md={3} />
                <Col md={6}>
                        <Card className="shadow-sm">
                            <Card.Body>
                                <Card.Subtitle className="text-muted">
                                    Scatter Plot
                                </Card.Subtitle>
                            </Card.Body>
                        </Card>
                </Col>
                <Col md={3} />
            </Row>
        </Container>
        
    );
};

export default Dashboard;