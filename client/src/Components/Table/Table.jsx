import React, { useEffect, useState, useRef } from 'react'
import  {useSelector, useDispatch} from 'react-redux'
import MaterialTable from 'material-table'
import champion from '../../services/champion'
import { champions } from '../Fields/fields';
import { List } from '@material-ui/core';

export default function Table() {
  
  let lst = []
  const fields = useSelector(state => state.fields);
  const dispatch = useDispatch();
  const [arr, setData] = useState(fields);
  const [newvar, newsetData] = useState();

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

/*
  const getplayerstat = async () => {
      for (const value in arr) {
        try {
          await champion.getplayerstat(arr[value]).then((response) => {
            console.log(value);
            console.log("newvar");
            console.log(newvar);
            if (value === "0") {
              newsetData([response.data]);
            } else {
              newsetData([...newvar, response.data]);
            }
            if (value === "1") {
              dispatch({ type: "ALL", data: response.data });
            } else {
              dispatch({ type: "ALL", data: response.data });
            }
          });
          } catch (error) {
            console.log(error);
        }
    }
  }

  useEffect(() => {
      getplayerstat();
  }, []);
*/

  let urllist=[]
  var championstats = async () => {
    let object = {};
    for(var i = 0; i < arr.length; i++){
        await champion.getplayerstat(arr[i]).then((response) => { 
          object = response.data; 
        });
        urllist.push(object);
    }
    newsetData(urllist);
   }

   if (arr != null) {
    championstats();
   }

  return (<div style={{ maxWidth: '80%',  margin: 'auto' }}>
      <MaterialTable
        title="Champions Data"
        columns={champions}
        data={newvar}
        /*editable={{
          onRowAdd: newRow =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                newsetData([...newvar, newRow]);
                resolve();
              }, 1000)
            }) 
        }}*/
      />
    </div>
  )
}