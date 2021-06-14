import React, { useEffect, useState } from 'react'
import  {useSelector, useDispatch} from 'react-redux'
import MaterialTable from 'material-table'
import matches from '../../services/matches'
import { match_history } from '../Fields/fields';

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

  if (arr != null) {
    var cols = arr;
  } else {
    var rows;
  }

  //  const [player] = arr.data.filter(
  // (playername) => data.playername == playername
  // );

  return (<div style={{ maxWidth: '80%',  margin: 'auto' }}>
      <MaterialTable
        columns={match_history}
        data={arr}
        title="Rankings"
      />
    </div>
  )
  }