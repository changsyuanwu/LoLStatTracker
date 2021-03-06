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
          },
          pageSize: 10,
          pageSizeOptions: [10,20,50,100],
          toolbar: true,
          paging: true
        }}
        editable={{
        onRowAdd: newRow =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              setData([...arr, newRow]);
              matches.postmatch(newRow);
              resolve();
            }, 1000)
          }),
          onRowUpdate: (newData, oldrow) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const Update = [...arr];
              const rowID = oldrow.tableData.id;
              Update[rowID] = newData;
              setData([...Update]);
              matches.putmatch(newData["match_id"],newData);
              resolve();
            }, 1000)
          }),
        onRowDelete: deleteRow =>
          new Promise((resolve, reject) => {
              setTimeout(() => {
                const delete_old = [...arr];
                const rowID = deleteRow.tableData.id;
                delete_old.splice(rowID, 1);
                setData([...delete_old]);
                console.log(deleteRow);
                matches.deletematch(deleteRow["match_id"],deleteRow);
                resolve();
              }, 1000);
            }) 
        }}
        />
    </div>)
  }


