import React, { useEffect, useState } from 'react'
import  {useSelector, useDispatch} from 'react-redux'
import MaterialTable from 'material-table'
import matches from '../../services/matches'
import { combined } from '../Fields/fields';

export default function Table() {

  const fields = useSelector(state => state.fields);
  const dispatch = useDispatch();
  const [arr, setData] = useState(fields);


  const getallmatches = async () => {
    try {
      await matches.getall().then((response) => {
        setData(response.data);
        dispatch({ type: "ALL", data: response.data });
      });
      } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    getallmatches();
  }, []);


  return (<div style={{ maxWidth: '95%',  margin: 'auto' }}>
      <MaterialTable
        columns={combined}
        data={arr}
        title="Match History"
        options={{
          headerStyle: {
            backgroundColor: "#1b1b1b",
            color: "#FFF",
          }}
        }
        editable={{
        onRowAdd: newRow =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              setData([...arr, newRow]);
              matches.postmatch(newRow);
              resolve();
            }, 1000)
          }),
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...arr];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);
                matches.delete(oldData);
                resolve();
              }, 1000);
            }) 
        }}
        />
    </div>)
  }


