import { Table } from "react-bootstrap"

type RowData = Record<string, any>

type Props = {
    columns: string[];
    fields: string[];
    data: RowData[]
}

const TableComponent = ({columns, fields, data}: Props) => {
    const header = columns.map(
        (item:string, idx: number) => (
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
        (item: RowData, idx: number) => (
            <tr key={idx}>
                {fields.map(
                    (field: string, idx2: number) => (
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
        <div style={{ overflowX: "auto" }}>
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
        </div>
        
    )
}

export default TableComponent