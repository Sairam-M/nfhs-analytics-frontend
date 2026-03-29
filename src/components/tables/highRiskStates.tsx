import TableComponent from "./table"
import { HIGH_RISK_STATE_COLUMN_NAMES, HIGH_RISK_STATES_FIELDS } from "../../constants"
import type { HighRiskState } from "../../pages/Dashboard"

type Props = {
    highRiskStates: HighRiskState[]
}


const HighRiskStates = ({highRiskStates}: Props) => {

    return (
        <TableComponent 
            columns={HIGH_RISK_STATE_COLUMN_NAMES}
            fields={HIGH_RISK_STATES_FIELDS}
            data={highRiskStates}
        />
    )
}

export default HighRiskStates