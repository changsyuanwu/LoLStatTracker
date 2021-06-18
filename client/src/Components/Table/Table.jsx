import React, { useEffect, useState } from 'react'
import  {useSelector, useDispatch} from 'react-redux'
import MaterialTable from 'material-table'
import champion from '../../services/matches'
import { match_history } from '../Fields/fields';

export default function Table() {

  const fields = useSelector(state => state.fields);
  const dispatch = useDispatch();
  const [arr, setData] = useState(fields);

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

  console.log(arr);
  //  const [player] = arr.data.filter(
  // (playername) => data.playername == playername
  // );

  return (<div style={{ maxWidth: '80%',  margin: 'auto' }}>
      <MaterialTable
        columns={match_history}
        data={arr}
        title="Champions Data"
      />
    </div>
  )
  }