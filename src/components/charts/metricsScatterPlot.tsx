import { useState, useEffect } from "react"
import { Button, Col, Form, FormGroup, Row } from "react-bootstrap"
import { METRIC_FIELDS_TO_COLUMN_NAMES_MAP, METRICS } from "../../constants"
import { getDemographics } from "../../services/api"
import { CartesianGrid, Scatter, ScatterChart, XAxis, YAxis, Tooltip } from "recharts"

const MetricsScatterPlot = ({refresh, handleRefresh}) => {
    const [xMetric, setXMetric] = useState("bmi_low")
    const [yMetric, setYMetric] = useState("child_mortality_rate")
    const [data, setData] = useState([])
    const [chartData, setChartData] = useState([])

    const handleApply = () => {
        console.log(xMetric, yMetric)
        const covertedData = data.map((item) => {
            return {
                x: item[xMetric],
                y: item[yMetric],
                state: item.state
            }
        })
        setChartData(covertedData)
    }

    const options = METRICS.map((item, idx) => {
        return (
            <option value={item} key={idx}>
                {METRIC_FIELDS_TO_COLUMN_NAMES_MAP[item]}
            </option>
        )
    })

    const loadData = async () => {
            try {
                const demographicsData = await getDemographics()
                console.log(demographicsData)
                setData(demographicsData)
                handleApply()
            } catch (err: any) {
                console.log(err.message);
            }
        };

    useEffect(() => {
        loadData();
    }, []);

    let chart = (<div />)
    if (chartData.length !== 0) {
        console.log(chartData)
        const CustomTooltip = ({ active, payload }) => {
                if (active && payload && payload.length) {
                    const data = payload[0].payload;

                    return (
                    <div style={{ background: "white", padding: "8px", border: "1px solid #ccc" }}>
                        <div><b>{data.state}</b></div>
                        <div>X: {data.x}</div>
                        <div>Y: {data.y}</div>
                    </div>
                    );
                }

            return null;
        };
        chart = (
        <ScatterChart width={400} height={300}>
                    <CartesianGrid />
                    <XAxis dataKey="x" name={METRIC_FIELDS_TO_COLUMN_NAMES_MAP[xMetric]}/>
                    <YAxis dataKey="y" name={METRIC_FIELDS_TO_COLUMN_NAMES_MAP[yMetric]} />
                    <Tooltip content={<CustomTooltip />} />
                    {/* <Tooltip cursor={{ strokeDasharray: "3 3" }} /> */}
                    <Scatter data={chartData} fill="#8884d8" />
                </ScatterChart>)
    }

    if (refresh) {
        setChartData([])
        setData([])
        loadData()
        handleApply()
        handleRefresh(false)
    }

    return (
        <div>
            <Row className="align-items-end g-2">
                {/* Select 1 */}
                <Col md={5}>
                    <Form.Group>
                    <Form.Label>Metric X</Form.Label>
                    <Form.Select
                        value={xMetric}
                        onChange={(e) => setXMetric(e.target.value)}
                    >
                        {options}
                    </Form.Select>
                    </Form.Group>
                </Col>

                {/* Select 2 */}
                <Col md={5}>
                    <Form.Group>
                    <Form.Label>Metric Y</Form.Label>
                    <Form.Select
                        value={yMetric}
                        onChange={(e) => setYMetric(e.target.value)}
                    >
                    {options}
                    </Form.Select>
                    </Form.Group>
                </Col>

                {/* Apply Button */}
                <Col md={2}>
                    <Button
                    variant="dark"
                    className="w-100"
                    onClick={handleApply}
                    >
                    Apply
                    </Button>
                </Col>
            </Row>
            <br />
            <Row>
                {chart}
            </Row>
        </div>

        
    )
}

export default MetricsScatterPlot