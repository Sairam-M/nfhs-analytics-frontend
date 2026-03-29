import { Table } from "react-bootstrap"

const TableComponent = ({columns, fields, data}) => {
    const header = columns.map(
        (item, idx) => (
            <th key={idx}>{item}</th>
        )
    )

    const body = data.map(
        (item, idx) => (
            <tr key={idx}>
                {fields.map(
                    (field, idx2) => (
                        <td key={idx2}>{item[field]}</td>
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