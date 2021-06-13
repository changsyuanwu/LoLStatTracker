import React, { Component, useContext, useEffect } from 'react'
import MaterialTable from 'material-table'
import matches from '../../services/matches'
import { MatchFields } from '../Fields/fields';

/*
Need to figure out how to map the values and matchfields 
together

I am just implementing this for the normal table, but can simply be copied to the 
match_history folder as well.
*/

export default function Table() {
  const {data, setData } = useContext(MatchFields);

  useEffect(() => {
    const getallmatches = async () => {
      try {
        const response = await matches.getall();
        console.log(response.data);
        setData((some) => ({ ...some, a_match: response.data }));
      } catch (error) {
        console.log(error);
      }
    };
    getallmatches();
  }, []);

  console.log(data);
  return (
    <div style={{ maxWidth: '80%',  margin: 'auto' }}>
      <MaterialTable
        columns={["match_num"]}
        data={data.match_id}
        title="Rankings"
      />
    </div>
  )
  }
