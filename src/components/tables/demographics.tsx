import { useEffect, useState } from "react"
import { getDemographics } from "../../services/api"
import { DEMOGRAPICS_COLUMN_NAMES, DEMOGRAPICS_FIELDS } from "../../constants"
import TableComponent from "./table"

type Props = {
    refreshCard: boolean;
    updateRefresh: (value: boolean) => void;
}

const Demographics = ({refreshCard, updateRefresh}: Props) => {
    const [demographics, setDemographics] = useState([])

        useEffect(() => {
            const loadData = async () => {
                try {
                    const [
                        demographicsData
                    ] = await Promise.all([
                        getDemographics()
                    ]);
    
                    setDemographics(demographicsData)
    
                } catch (err: any) {
                    console.log(err.message);
                }
            };
    
            loadData();
        }, []);
        
        const refreshCards = async () => {
            try {
                const [demographicsData] = await Promise.all([
                        getDemographics()
                ]);
    
                setDemographics(demographicsData)
                updateRefresh(false)
    
            } catch (err: any) {
                console.log(err.message);
            }
        }

        if (refreshCard) {
            refreshCards()
        }

    return (
    <TableComponent 
        columns={DEMOGRAPICS_COLUMN_NAMES}
        fields={DEMOGRAPICS_FIELDS}
        data={demographics}
        />)
}

export default Demographics