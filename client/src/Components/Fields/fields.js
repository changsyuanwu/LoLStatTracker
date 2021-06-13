import { createContext, useState } from "react";

export const MatchFields = createContext({
    blue_adc: null,
    blue_jungle: null,
    blue_mid: null,
    blue_support: null,
    blue_top: null,
    match_id: 1,
    red_adc: null,
    red_jungle: null,
    red_mid: null,
    red_support: null,
    red_top: null,
    result: null
});