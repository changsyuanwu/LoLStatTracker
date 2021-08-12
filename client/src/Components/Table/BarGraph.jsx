import React from 'react';
import { Bar } from 'react-chartjs-2';
import  {useSelector, useDispatch} from 'react-redux'
import matches from '../../services/matches'
import { useEffect, useState } from 'react'
import styles from "../MatchHistory/MatchHistory.module.css";

export default function BarGraph() {

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

var teams_wins = [0,0];
var player_wins = {};
var blue_win = ["blue_adc", "blue_jungle", "blue_mid", "blue_support", "blue_top"];
var red_win = ["red_adc", "red_jungle", "red_mid", "red_support", "red_top"];
for (var i in arr){
    if (arr[i]["result"] === "Red") {
        teams_wins[0] = teams_wins[0] + 1;
        for (var key in red_win) {
            if (arr[i][red_win[key]] in player_wins) {
                player_wins[arr[i][red_win[key]]] = player_wins[arr[i][red_win[key]]] + 1;
            } else {
                player_wins[arr[i][red_win[key]]] = 1;
            }
        }
    } else {
        teams_wins[1] = teams_wins[1] + 1;
        for (var bluekey in blue_win) {
            if (arr[i][blue_win[bluekey]] in player_wins) {
                player_wins[arr[i][blue_win[bluekey]]]  = player_wins[arr[i][blue_win[bluekey]]] + 1;
            }  else { 
                player_wins[arr[i][blue_win[bluekey]]] = 1;
            }
        }
    }
}
console.log(player_wins);
var sorted_player_wins = Object.keys(player_wins).sort(function(a, b) {
    return player_wins[b] - player_wins[a];
})
console.log(sorted_player_wins);

var player_list = [];
var result_list = [];
for (var i = 0; i < 5; i++) {
    player_list.push(sorted_player_wins[i]);
    result_list.push(player_wins[sorted_player_wins[i]]);
}

const Bardata = {
    labels: ['Red Team', 'Blue Team'],
    datasets: [
      {
        label: 'Number of Wins',
        data: teams_wins,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
};

const Baroptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: false,
            fontSize: 20
          }
        },
      ]
    },
    "legend": {
      "display": true,
      "labels": {
          "fontSize": 20,
      }
    },
    maintainAspectRatio: true,
};

return (    
  <div style={styles.bargraphstyle}>
    <h1 className={styles.title}>Team Result Comparison</h1>
    <Bar data={Bardata} options={Baroptions}/>
  </div>
  )
}
//href='https://github.com/reactchartjs/react-chartjs-2/blob/master/example/src/charts/VerticalBar.js'
