import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table} from "react-bootstrap";
import API from '../../services/api';
import axios from "axios";
import styles from "./Champions.module.css";
import Header from "../Header/Header";


const Champions = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        // Update the document title using the browser API
        let url = window.location.href;
        var array = url.split("/");
        var queryParam = array[4];
        axios.get(API + 'champions/stats/' + queryParam)
        .then((response) => {
            console.log(response);
            setData(response.data);
        }).catch((error) => {
            alert(error);
            console.log(error);
        })

      }, []);

    return (
        <Container fluid>
            <Header />
            <Row>
                <div className={styles.title}>
                    {data.champion_name}'s Stats
                </div>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Attribute</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Champion Name</td>
                            <td>{data.champion_name}</td>
                        </tr>
                        <tr>
                            <td>Champion Title</td>
                            <td>{data.champion_title}</td>
                        </tr>
                        <tr>
                            <td>Class</td>
                            <td>{data.class}</td>
                        </tr>
                        <tr>
                            <td>Playstyle</td>
                            <td>{data.playstyle}</td>
                        </tr>
                        <tr>
                            <td>Date Released</td>
                            <td>{data.date_release}</td>
                        </tr>
                        <tr>
                            <td>Last Changed</td>
                            <td>{data.last_change}</td>
                        </tr>
                        <tr>
                            <td>Blue Essence Price</td>
                            <td>{data.blue_essence_price}</td>
                        </tr>
                        <tr>
                            <td>RP Price</td>
                            <td>{data.rp_price}</td>
                        </tr>
                        <tr>
                            <td>Resource Type</td>
                            <td>{data.resource_type}</td>
                        </tr>
                        <tr>
                            <td>Health</td>
                            <td>{data.health}</td>
                        </tr>
                        <tr>
                            <td>Health Growth</td>
                            <td>{data.health_growth}</td>
                        </tr>
                        <tr>
                            <td>Health Level 18</td>
                            <td>{data.health_lvl18}</td>
                        </tr>
                        <tr>
                            <td>Health Regeneration</td>
                            <td>{data.health_regen}</td>
                        </tr>
                        <tr>
                            <td>Health Regeneration Growth</td>
                            <td>{data.health_regen_growth}</td>
                        </tr>
                        <tr>
                            <td>Health Regeneration Level 18</td>
                            <td>{data.health_regen_lvl18}</td>
                        </tr>
                        <tr>
                            <td>Mana</td>
                            <td>{data.mana}</td>
                        </tr>
                        <tr>
                            <td>Mana Growth</td>
                            <td>{data.mana_growth}</td>
                        </tr>
                        <tr>
                            <td>Mana Level 18</td>
                            <td>{data.mana_lvl18}</td>
                        </tr>
                        <tr>
                            <td>Mana Regeneration</td>
                            <td>{data.mana_regen}</td>
                        </tr>
                        <tr>
                            <td>Mana Regeneration Growth</td>
                            <td>{data.mana_regen_growth}</td>
                        </tr>
                        <tr>
                            <td>Mana Regeneration Level 18</td>
                            <td>{data.mana_regen_lvl18}</td>
                        </tr>
                        <tr>
                            <td>Attack Damage</td>
                            <td>{data.attack_damage}</td>
                        </tr>
                        <tr>
                            <td>Attack Damage Growth</td>
                            <td>{data.attack_damage_growth}</td>
                        </tr>
                        <tr>
                            <td>Attack Damage Level 18</td>
                            <td>{data.attack_damage_lvl18}</td>
                        </tr>
                        <tr>
                            <td>Attack Speed</td>
                            <td>{data.attack_speed}</td>
                        </tr>
                        <tr>
                            <td>Attack Speed Growth</td>
                            <td>{data.attack_speed_growth}</td>
                        </tr>
                        <tr>
                            <td>Attack Speed Level 18</td>
                            <td>{data.attack_speed_lvl18}</td>
                        </tr>
                        <tr>
                            <td>Armour</td>
                            <td>{data.armour}</td>
                        </tr>
                        <tr>
                            <td>Armour Growth</td>
                            <td>{data.armour_growth}</td>
                        </tr>
                        <tr>
                            <td>Armour Level 18</td>
                            <td>{data.armour_lvl18}</td>
                        </tr>
                        <tr>
                            <td>Magic Resistance</td>
                            <td>{data.magic_resistance}</td>
                        </tr>
                        <tr>
                            <td>Magic Resistance Growth</td>
                            <td>{data.magic_resistance_growth}</td>
                        </tr>
                        <tr>
                            <td>Magic Resistance Level 18</td>
                            <td>{data.magic_resistance_lvl18}</td>
                        </tr>
                        <tr>
                            <td>Movement Speed</td>
                            <td>{data.movement_speed}</td>
                        </tr>
                        <tr>
                            <td>Movement Speed Level 18</td>
                            <td>{data.movement_speed_lvl18}</td>
                        </tr>
                        <tr>
                            <td>Attack Range</td>
                            <td>{data.attack_range}</td>
                        </tr>
                        <tr>
                            <td>Attack Range Level 18</td>
                            <td>{data.attack_range_lvl18}</td>
                        </tr>
                    </tbody>
                    </Table>
            </Row>
        </Container>
    )
}

export default Champions