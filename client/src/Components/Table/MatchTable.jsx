import React, { useEffect, useState } from 'react'
import  {useSelector, useDispatch} from 'react-redux'
import MaterialTable from 'material-table'
import matches from '../../services/matches'
import { combined } from '../Fields/fields';
import {Dialog} from '@material-ui/core';


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

  let array = arr;
  let emptylst=[];
  var counter = 0;
  if (array != null) {
    for(var i=0; i < arr.length; i++) {
      emptylst.push({"id": counter, "num": arr[i].match_id, "result": arr[i].result });
      emptylst.push({"parentId": counter, "blue1": arr[i].blue_adc, "red1":  arr[i].red_adc});
      emptylst.push({"parentId": counter, "blue2": arr[i].blue_jungle, "red2": arr[i].red_jungle})
      emptylst.push({"parentId": counter, "blue3": arr[i].blue_mid, "red3": arr[i].red_mid})
      emptylst.push({"parentId": counter, "blue4": arr[i].blue_support, "red4": arr[i].red_support})
      emptylst.push({"parentId": counter, "blue5": arr[i].blue_top, "red5": arr[i].red_top})
      counter = counter+1;
    }
  }

  //  const [player] = arr.data.filter(
  // (playername) => data.playername == playername
  // );

  return (<div style={{ maxWidth: '95%',  margin: 'auto' }}>
      <MaterialTable
        columns={combined}
        data={arr}
        title="Match History"
        options={{
        headerStyle: {
          backgroundColor: "#1b1b1b",
          color: "#FFF",
        }}}
        />
    </div>)
  }


  /*

    parentChildData={(row, rows) => 
    rows.find(a => a.id === row.parentId)}


  detailPanel={(rowData) => {
          return (<div id="project-features">
                  <TableContainer component={Paper}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Blue</TableCell>
                          <TableCell>Red</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {arr.map((row) => (
                          <TableRow>
                            <TableCell component="th" scope="row">
                              {row.blue_abc}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {row.red_abc}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>);}}
  */