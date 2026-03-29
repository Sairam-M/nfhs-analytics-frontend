import { Row, Col, Card, Container } from "react-bootstrap";
import FileUpload from "../components/ui/FileUpload";
import { useEffect, useState } from "react";
import { getStates, getHighRiskStates, getRiskScores  } from "../services/api";
import Demographics from "../components/tables/demographics";
import StateProfile from "../components/ui/stateProfile";
import HighRiskStates from "../components/tables/highRiskStates";
import TopNStatesByRiskScore from "../components/tables/topNStatesByRiskScore";
import MetricsScatterPlot from "../components/charts/metricsScatterPlot";

type RiskScore = {
  state: string
  anemia_women: number
  bmi_low: number
  child_mortality_rate: number
  risk_score: number
  score_band: "Low" | "Moderate" | "High"
}

export type HighRiskState = {
  state: string
  value: number
  reason: string
}

const Dashboard = () => {

    const [states, setStates] = useState([]);
    const [highRiskStates, setHighRiskStates] = useState<HighRiskState[]>([])
    const [riskScores, setRiskScores] = useState<RiskScore[]>([])
    const [refresh, setRefresh] = useState(false)
    const [refreshStates, setRefreshStates] = useState(false)
    const [refreshTopNStates, setRefreshTopNStates] = useState(false)
    const [refreshScatterChart, setRefreshScatterChart] = useState(false)
    

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
                            riskScores.length > 0
                                ? (
                                    riskScores.reduce(
                                    (sum: number, item: RiskScore) => sum + item.risk_score,
                                    0
                                    ) / riskScores.length
                                ).toFixed(2)
                                : "0.00"
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
                                    Scatter Plot
                                </Card.Subtitle>
                                <MetricsScatterPlot 
                                    refresh={refreshScatterChart}
                                    handleRefresh={setRefreshScatterChart}
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
                                <br />
                                <StateProfile 
                                    states={states}
                                    refreshStates={refreshStates}
                                    updateRefresh={setRefreshStates}
                                />
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
                        <Row>
                            <Card className="shadow-sm">
                                <Card.Body>
                                    <Card.Subtitle className="text-muted">
                                    High Risk States
                                    </Card.Subtitle>
                                    <br/>
                                    <HighRiskStates 
                                        highRiskStates={highRiskStates}
                                    />
                                </Card.Body>
                        </Card>
                        </Row>
                        <br />
                        <Row>
                            <Card className="shadow-sm">
                                <Card.Body>
                                    <Card.Subtitle className="text-muted">
                                    Top N States by Risk Score
                                    </Card.Subtitle>
                                    <br />
                                    <TopNStatesByRiskScore
                                        refresh={refreshTopNStates}
                                        handleRefresh={setRefreshTopNStates}
                                    />
                                </Card.Body>
                            </Card>
                            
                        </Row>
                        
                </Col>
            </Row>
            <br />
            
            {/* <Row>
                <Col md={3} />
                <Col md={6}>
                        
                </Col>
                <Col md={3} />
            </Row> */}
        </Container>
        
    );
};

export default Dashboard;