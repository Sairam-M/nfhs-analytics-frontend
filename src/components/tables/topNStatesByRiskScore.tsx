import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { getTopNStates } from "../../services/api";
import TableComponent from "./table";
import { TOP_N_STATES_COLUMN_NAMES, TOP_N_STATES_FIELDS } from "../../constants";



const TopNStatesByRiskScore = ({refresh, handleRefresh}) => {

  const [n,setN] = useState(5)
  const [topNStates, setTopNStates] = useState({})

  const handleChange = async (e) => {
      setN(Number(e.target.value))
      try {
        const data = await getTopNStates(e.target.value)
        setTopNStates(data)

      } catch (err: any) {
          console.log(err.message);
      }
  }

  const getTopDefault = async () => {
        try {
        const data = await getTopNStates(n)
        setTopNStates(data)

      } catch (err: any) {
          console.log(err.message);
      }
    }

  useEffect(()=>{  getTopDefault()},[])
  
  if (refresh) {
      getTopDefault()
      handleRefresh(false)
  }


  const form = (
      <Form.Control
        type="number"
        min={1}
        max={100}
        value={n}
        onChange={handleChange}
      />
  )

  let table = (<div />)
  if (Object.keys(topNStates).length !== 0 ) {
      table = (
            <TableComponent 
                columns={TOP_N_STATES_COLUMN_NAMES}
                fields={TOP_N_STATES_FIELDS}
                data={topNStates}
            />
        )
  }

  return (
    <div>
      {form}
      <br />
      {table}
    </div>  
  )
}

export default TopNStatesByRiskScore