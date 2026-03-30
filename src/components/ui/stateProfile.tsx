import { useEffect, useState } from "react";
import { Badge, Col, Form, Row } from "react-bootstrap";
import { getStateProfile } from "../../services/api";
import { RISK_LEVEL_LOW, RISK_LEVEL_MODERATE, type MetricKey } from "../../constants";
import TableComponent from "../tables/table";

type Props = {
    states: string[];
    refreshStates: number;
}

type Metrics = Record<MetricKey, number>

type StateProfile = {
  state: string
  metrics: Metrics
  risk_category: string
  reason: string
  risk_score: number
  score_band: "Low" | "Moderate" | "High"
}

const StateProfile = ({states, refreshStates}: Props) => {

    const [state, setState] = useState("")
    const [stateProfile, setStateProfile] = useState<StateProfile | null>(null)

    const onStateSelect = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        setState(e.target.value);
        try {
                const data = await getStateProfile(e.target.value)

                setStateProfile(data)

            } catch (err: any) {
                console.log(err.message);
            }
    }


    const onRefresh = () => {
        setState("")
        setStateProfile(null)
    }

    useEffect(()=>{
        onRefresh()
    }, [refreshStates])

    

    let kpis = (<div />);
    let metrics = (<div />)

    const riskLevelToBg = (risklevel: string) => {
        if (risklevel == RISK_LEVEL_LOW) {
            return "success"
        }
        else if (risklevel == RISK_LEVEL_MODERATE) {
            return "warning"
        }
        else {
            return "danger"
        }
    }

    if (state !== "" && stateProfile !== null) {

        const scoreBandBg = riskLevelToBg(stateProfile.score_band)
        const riskCategoryBg = riskLevelToBg(stateProfile.risk_category)

        kpis = (
            <Row className="text-center mt-3">
                <Col>
                    <div className="fw-light text-muted">Risk Score</div>
                    <div className="fs-4 fw-bold">{stateProfile.risk_score}</div>
                </Col>

                <Col>
                    <div className="fw-light text-muted">Score Band</div>
                    <Badge bg={scoreBandBg}>{stateProfile.score_band}</Badge>
                </Col>

                <Col>
                    <div className="fw-light text-muted">Risk Category</div>
                    <Badge bg={riskCategoryBg}>{stateProfile.risk_category}</Badge>
                </Col>
            </Row>

        )

        const metricsData = stateProfile.metrics

        const formattedData = [
            { label: "Anemia (Women) (%)", value: metricsData.anemia_women },
            { label: "BMI Low (%)", value: metricsData.bmi_low },
            { label: "Child Mortality Rate (%)", value: metricsData.child_mortality_rate },
            { label: "Female Education (Years)", value: metricsData.female_education_years },
            { label: "Rural Population (%)", value: metricsData.rural_population },
        ];

        metrics = (
            <TableComponent
                columns={["Metric", "Value"]}
                fields={["label", "value"]}
                data={formattedData}
            />
        )
    }

    return (
        <div>
            <Form.Select value={state} onChange={onStateSelect}>
                <option value="">Select State</option>
                {states.map((s: string) => (
                    <option key={s} value={s}>{s}</option>
                ))}
            </Form.Select>
            <br />
            {kpis}
            <br />
            {metrics}
        </div>
        

    );
}

export default StateProfile;