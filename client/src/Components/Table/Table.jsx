import React, { Component } from 'react'
import MaterialTable from 'material-table'

/*
api - not giving query results yet

fetch('http://localhost:9000/test-query')
  .then(response => response.json())
  .then(data => console.log(data));
*/

var cols = []
var data = []


export default function Table() {
    return (
      <div style={{ maxWidth: '80%',  margin: 'auto' }}>
        <MaterialTable
          columns={cols}
          data={data}
          title="Rankings"
        />
      </div>
    )
}
