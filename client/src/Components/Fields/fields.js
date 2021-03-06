/*
export const MatchFields = createContext({
    blue_adc: "ADC",
    blue_jungle: "Jungle",
    blue_mid: "Mid",
    blue_support: "Support",
    blue_top: "Top",
    match_id: "Number",
    red_adc: "ADC",
    red_jungle: "Jungle",
    red_mid: null,
    red_support: "Support",
    red_top: "Top",
    result: "Result"
});*/

export const combined= [
    {title: "Blue ADC", field: "blue_adc" ,
    cellStyle: {
        backgroundColor: '#85C1E9',
        color: '#FFF'
      }}, 
    {title: "Jungle", field: "blue_jungle",
    cellStyle: {
        backgroundColor: '#85C1E9',
        color: '#FFF'
      } },
    {title: "Mid", field: "blue_mid" ,
    cellStyle: {
        backgroundColor: '#85C1E9',
        color: '#FFF'
      }},
    {title: "Support", field: "blue_support",
    cellStyle: {
        backgroundColor: '#85C1E9',
        color: '#FFF'
      } },
    {title: "Top", field: "blue_top" ,
    cellStyle: {
        backgroundColor: '#85C1E9',
        color: '#FFF'
      }},
    {title: "Match Number", field: "match_id" },
    {title: "Result", field: "result" },
    {title: "Patch", field: "patch" },
    {title: "Red ADC", field: "red_adc",
    cellStyle: {
        backgroundColor: '#F1948A',
        color: '#FFF'
      }},
    {title: "Jungle", field: "red_jungle" ,
    cellStyle: {
        backgroundColor: '#F1948A',
        color: '#FFF'
      }},
    {title: "Mid", field: "red_mid" ,
    cellStyle: {
        backgroundColor: '#F1948A',
        color: '#FFF'
      }},
    {title: "Support", field: "red_support" ,
    cellStyle: {
        backgroundColor: '#F1948A',
        color: '#FFF'
      }},
    {title: "Top", field: "red_top" ,
    cellStyle: {
        backgroundColor: '#F1948A',
        color: '#FFF'
      }}
]

export const match_history = [ 
    {title: "Match Number", field: "match_id" },
    {title: "Result", field: "result" }
];

export const champions = [ 
  {title: "Champion", field: "champion" },
  {title: "Winrate", field: "winrate" },
  {title: "Playrate", field: "playrate" },
  {title: "Won", field: "won" },
  {title: "Played", field: "played" }
];


export const match_card = [
    {title: "ADC", field: "blue_adc" }, 
    {title: "Jungle", field: "blue_jungle" },
    {title: "Mid", field: "blue_mid" },
    {title: "Support", field: "blue_support" },
    {title: "Top", field: "blue_top" },
    {title: "ADC", field: "red_adc" },
    {title: "Jungle", field: "red_jungle" },
    {title: "Mid", field: "red_mid" },
    {title: "Support", field: "red_support" },
    {title: "Top", field: "red_top" }
]

export default match_history;