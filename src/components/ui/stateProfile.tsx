import { useState } from "react";
import { Badge, Col, Form, Row } from "react-bootstrap";
import { getStateProfile } from "../../services/api";
import { RISK_LEVEL_LOW, RISK_LEVEL_MODERATE } from "../../constants";
import TableComponent from "../tables/table";


const StateProfile = ({states, refreshStates, updateRefresh}) => {

    const [state, setState] = useState("")
    const [stateProfile, setStateProfile] = useState({})

    const onStateSelect = async (e) => {
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
        updateRefresh(false)
        setStateProfile({})
    }

    if (refreshStates) {
        onRefresh()
    }

    let kpis = (<div />);
    let metrics = (<div />)

    const riskLevelToBg = (risklevel) => {
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

    if (state !== "" && Object.keys(stateProfile).length !== 0) {

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
                {states.map((s) => (
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