import { useState, useEffect } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { METRIC_FIELDS_TO_COLUMN_NAMES_MAP, METRICS, type MetricKey } from "../../constants"
import { getDemographics } from "../../services/api"
import { CartesianGrid, Scatter, ScatterChart, XAxis, YAxis, Tooltip, Label } from "recharts"

type Props = {
    refresh: number;
}

interface DemographicData {
  state: string
  [key: string]: number | string
}

interface ChartData {
  x: number
  y: number
  state: string
}

const MetricsScatterPlot = ({refresh}: Props) => {
    const [xMetric, setXMetric] = useState<MetricKey>("bmi_low")
    const [yMetric, setYMetric] = useState<MetricKey>("child_mortality_rate")
    const [data, setData] = useState<DemographicData[]>([])
    const [chartData, setChartData] = useState<ChartData[]>([])
    const [xLabel, setXLabel] = useState("")
    const [yLabel, setYLabel] = useState("")

    const handleApply = () => {
        const filteredData = data.filter((item: DemographicData) => {
                    return item[xMetric] !== null && item[yMetric] !== null
                })
        
        const covertedData = filteredData.map((item) => {
            return {
                x: Number(item[xMetric]),
                y: Number(item[yMetric]),
                state: item.state as string
    }
        })
        setChartData(covertedData)
        setXLabel(METRIC_FIELDS_TO_COLUMN_NAMES_MAP[xMetric])
        setYLabel(METRIC_FIELDS_TO_COLUMN_NAMES_MAP[yMetric])
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
                setData(demographicsData)
                
                const filteredData = demographicsData.filter((item: DemographicData) => {
                    return item[xMetric] !== null && item[yMetric] !== null
                })
                const covertedData = filteredData.map((item: DemographicData) => {
                    return {
                        x: Number(item[xMetric]),
                        y: Number(item[yMetric]),
                        state: item.state as string
            }
                })
                setChartData(covertedData)
                setXLabel(METRIC_FIELDS_TO_COLUMN_NAMES_MAP[xMetric])
                setYLabel(METRIC_FIELDS_TO_COLUMN_NAMES_MAP[yMetric])

            } catch (err: any) {
                console.log(err.message);
            }
        };

    useEffect(() => {
        loadData();
    }, []);

    let chart = (<div />)
    if (chartData.length !== 0) {
        const CustomTooltip = ({ active, payload }: any) => {
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
                    <XAxis dataKey="x"  type="number" domain={['auto', 'auto']} name={METRIC_FIELDS_TO_COLUMN_NAMES_MAP[xMetric]}>
                        <Label value={xLabel} offset={0} position="insideBottom" />
                    </XAxis>
                    <YAxis dataKey="y"  type="number" domain={['auto', 'auto']} name={METRIC_FIELDS_TO_COLUMN_NAMES_MAP[yMetric]} >
                        <Label value={yLabel} angle={-90} style={{ textAnchor: 'middle' }}   position="insideLeft" />
                    </YAxis>
                    <Tooltip content={CustomTooltip} />
                    <Scatter data={chartData} fill="#8884d8" />
                </ScatterChart>
        )
    }

    useEffect(() => {
        setChartData([])
        setData([])
        loadData()
    }, [refresh])
    

    return (
        <div>
            <Row className="align-items-end g-2">
                {/* Select 1 */}
                <Col md={5}>
                    <Form.Group>
                    <Form.Label>Metric X</Form.Label>
                    <Form.Select
                        value={xMetric}
                        onChange={(e) => setXMetric(e.target.value as MetricKey)}
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
                        onChange={(e) => setYMetric(e.target.value as MetricKey)}
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
                <Col md={1} />
                <Col md={10}>
                    {chart}
                </Col>
                <Col md={1} />
                
            </Row>
        </div>

        
    )
}

export default MetricsScatterPlot