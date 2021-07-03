import React, { useEffect, useState } from 'react'
import  {useSelector, useDispatch} from 'react-redux'
import MaterialTable from 'material-table'
import champion from '../../services/champion'
import { champions } from '../Fields/fields';

export default function Table() {

  const fields = useSelector(state => state.fields);
  const dispatch = useDispatch();
  const [arr, setData] = useState(fields);
  const [newvar, newsetData] = useState(fields);

  const getlist = async () => {
    try {
      await champion.getlist().then((response) => {
        setData(response.data);
        dispatch({ type: "ALL", data: response.data });
      });
      } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    getlist();
  }, []);

  const getplayerstat = async (item) => {
      try {
        await champion.getplayerstat(item).then((response) => {
          newsetData(response.data);
          dispatch({ type: "ALL", data: response.data });
        });
        } catch (error) {
          console.log(error);
      }
  }

  let array = arr;
  var emptylst=[];
  if (array != null) {
    for(var i=0; i < 10; i++) {
      emptylst.push({"champion_name": arr[i] });
      //console.log(getplayerstat(arr[i]));
    }
  }

  const [rows, setRow] = useState(emptylst);

  return (<div style={{ maxWidth: '80%',  margin: 'auto' }}>
      <MaterialTable
        title="Champions Data"
        columns={champions}
        data={rows}
        editable={{
          onRowAdd: newRow =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                setRow([...rows, newRow]);
                
                resolve();
              }, 1000)
            }) 
        }}
      />
    </div>
  )
}