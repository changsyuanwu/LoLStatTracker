import { createContext, useState } from "react";
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

export const match_history = [ 
    {title: "ADC", field: "blue_adc" }, 
    {title: "Jungle", field: "blue_jungle" },
    {title: "Mid", field: "blue_mid" },
    {title: "Support", field: "blue_support" },
    {title: "Top", field: "blue_top" },
    {title: "Number", field: "match_id" },
    {title: "ADC", field: "red_adc" },
    {title: "Jungle", field: "red_jungle" },
    {title: "Mid", field: "red_mid" },
    {title: "Support", field: "red_support" },
    {title: "Top", field: "red_top" },
    {title: "Result", field: "result" }
];

export default match_history;