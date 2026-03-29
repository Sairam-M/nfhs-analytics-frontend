import { Table } from "react-bootstrap"

const TableComponent = ({columns, fields, data}) => {
    const header = columns.map(
        (item, idx) => (
            <th key={idx}>{item}</th>
        )
    )

    const getRiskColor = (band: string) => {
        switch (band) {
            case "Low":
                return "text-success";
            case "Moderate":
                return "text-warning";
            case "High":
                return "text-danger";
            default:
                return "";
        }
        };

    const body = data.map(
        (item, idx) => (
            <tr key={idx}>
                {fields.map(
                    (field, idx2) => (
                        <td key={idx2}
                            className={
                                field === "score_band" ? getRiskColor(item[field]) : ""
                                }
                        >
                            {item[field]}
                        </td>
                    )
                )}
            </tr>
        )
    )

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    {header}
                </tr>
            </thead>
            <tbody>
                {body}
            </tbody>
        </Table>
    )
}

export default TableComponent