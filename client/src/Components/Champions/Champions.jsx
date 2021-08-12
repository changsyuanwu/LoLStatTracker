import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button} from "react-bootstrap";
import API from '../../services/api';
import axios from "axios";
import styles from "./Champions.module.css";
import Header from "../Header/Header";


const Champions = () => {

    const [data, setData] = useState([]);
    const [editing, setEditing] = useState(false);

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

    function enableEdit(e) {
        setEditing(true);
    }

    function save(e) {
        setEditing(false);
        var name = data.champion_name;
        for (let field in data) {
            if (field !== "champion_name") {
                axios.put(API+ 'champions/update-stats?name=' + name + '&stat=' + field + '&value=' + data[field], {})
                    .then((response) => {
                        console.log(response);
                    }).catch((err) => {
                        console.log(err);
                    })
            }
        }
    }

    return (
        <Container fluid>
            <Header />
            <Row>
                <div className={styles.title}>
                    {data.champion_name}'s Stats
                    {editing ? 
                    <Button
                        variant="success"
                        className={styles.editStats}
                        onClick={save}
                    >
                        Save
                    </Button> 
                    : 
                    <Button 
                        variant="secondary" 
                        className={styles.editStats}
                        onClick={enableEdit}
                    >
                        Edit Statistics
                    </Button>}
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
                            <td>
                                {/* {editing ? 
                                    <input 
                                        type="text" 
                                        value={data.champion_name} 
                                        onChange={(e) => {
                                            setData(prevState => ({
                                                ...prevState,
                                                champion_name: e.target.value
                                            }))
                                        }}
                                    /> : 
                                    data.champion_name
                                } */}
                                {data.champion_name}
                            </td>
                        </tr>
                        <tr>
                            <td>Champion Title</td>
                            <td>
                                {editing ? 
                                    <input 
                                        type="text" 
                                        value={data.champion_title} 
                                        onChange={(e) => {
                                            setData(prevState => ({
                                                ...prevState,
                                                champion_title: e.target.value
                                            }))
                                        }}
                                    /> : 
                                    data.champion_title
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>Class</td>
                            <td>
                                {editing ? 
                                    <input 
                                        type="text" 
                                        value={data.class} 
                                        onChange={(e) => {
                                            setData(prevState => ({
                                                ...prevState,
                                                class: e.target.value
                                            }))
                                        }}
                                    /> : 
                                    data.class
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>Playstyle</td>
                            <td>
                                {editing ? 
                                    <input 
                                        type="text" 
                                        value={data.playstyle} 
                                        onChange={(e) => {
                                            setData(prevState => ({
                                                ...prevState,
                                                playstyle: e.target.value
                                            }))
                                        }}
                                    /> : 
                                    data.playstyle
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>Date Released</td>
                            <td>
                                {editing ? 
                                    <input 
                                        type="text" 
                                        value={data.date_release} 
                                        onChange={(e) => {
                                            setData(prevState => ({
                                                ...prevState,
                                                date_release: e.target.value
                                            }))
                                        }}
                                    /> : 
                                    data.date_release
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>Last Changed</td>
                            <td>
                                {editing ? 
                                    <input 
                                        type="text" 
                                        value={data.last_change} 
                                        onChange={(e) => {
                                            setData(prevState => ({
                                                ...prevState,
                                                last_change: e.target.value
                                            }))
                                        }}
                                    /> : 
                                    data.last_change
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>Blue Essence Price</td>
                            <td>
                                {editing ? 
                                    <input 
                                        type="number" 
                                        value={data.blue_essence_price} 
                                        onChange={(e) => {
                                            setData(prevState => ({
                                                ...prevState,
                                                blue_essence_price: e.target.value
                                            }))
                                        }}
                                    /> : 
                                    data.blue_essence_price
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>RP Price</td>
                            <td>
                                {editing ? 
                                    <input 
                                        type="number" 
                                        value={data.rp_price} 
                                        onChange={(e) => {
                                            setData(prevState => ({
                                                ...prevState,
                                                rp_price: e.target.value
                                            }))
                                        }}
                                    /> : 
                                    data.rp_price
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>Resource Type</td>
                            <td>
                                {editing ? 
                                    <input 
                                        type="text" 
                                        value={data.resource_type} 
                                        onChange={(e) => {
                                            setData(prevState => ({
                                                ...prevState,
                                                resource_type: e.target.value
                                            }))
                                        }}
                                    /> : 
                                    data.resource_type
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>Health</td>
                            <td>
                                {editing ? 
                                    <input 
                                        type="number" 
                                        value={data.health} 
                                        onChange={(e) => {
                                            setData(prevState => ({
                                                ...prevState,
                                                health: e.target.value
                                            }))
                                        }}
                                    /> : 
                                    data.health
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>Health Growth</td>
                            <td>
                                {editing ? 
                                    <input 
                                        type="number" 
                                        value={data.health_growth} 
                                        onChange={(e) => {
                                            setData(prevState => ({
                                                ...prevState,
                                                health_growth: e.target.value
                                            }))
                                        }}
                                    /> : 
                                    data.health_growth
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>Health Level 18</td>
                            <td>
                                {editing ? 
                                    <input 
                                        type="number" 
                                        value={data.health_lvl18} 
                                        onChange={(e) => {
                                            setData(prevState => ({
                                                ...prevState,
                                                health_lvl18: e.target.value
                                            }))
                                        }}
                                    /> : 
                                    data.health_lvl18
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>Health Regeneration</td>
                            <td>
                                {editing ? 
                                    <input 
                                        type="number" 
                                        value={data.health_regen} 
                                        onChange={(e) => {
                                            setData(prevState => ({
                                                ...prevState,
                                                health_regen: e.target.value
                                            }))
                                        }}
                                    /> : 
                                    data.health_regen
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>Health Regeneration Growth</td>
                            <td>
                                {editing ? 
                                    <input 
                                        type="number" 
                                        value={data.health_regen_growth} 
                                        onChange={(e) => {
                                            setData(prevState => ({
                                                ...prevState,
                                                health_regen_growth: e.target.value
                                            }))
                                        }}
                                    /> : 
                                    data.health_regen_growth
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>Health Regeneration Level 18</td>
                            <td>
                                {editing ? 
                                    <input 
                                        type="number" 
                                        value={data.health_regen_lvl18} 
                                        onChange={(e) => {
                                            setData(prevState => ({
                                                ...prevState,
                                                health_regen_lvl18: e.target.value
                                            }))
                                        }}
                                    /> : 
                                    data.health_regen_lvl18
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>Mana</td>
                            <td>
                                {editing ? 
                                    <input 
                                        type="number" 
                                        value={data.mana} 
                                        onChange={(e) => {
                                            setData(prevState => ({
                                                ...prevState,
                                                mana: e.target.value
                                            }))
                                        }}
                                    /> : 
                                    data.mana
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>Mana Growth</td>
                            <td>
                                {editing ? 
                                    <input 
                                        type="number" 
                                        value={data.mana_growth} 
                                        onChange={(e) => {
                                            setData(prevState => ({
                                                ...prevState,
                                                mana_growth: e.target.value
                                            }))
                                        }}
                                    /> : 
                                    data.mana_growth
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>Mana Level 18</td>
                            <td>
                                {editing ? 
                                    <input 
                                        type="number" 
                                        value={data.mana_lvl18} 
                                        onChange={(e) => {
                                            setData(prevState => ({
                                                ...prevState,
                                                mana_lvl18: e.target.value
                                            }))
                                        }}
                                    /> : 
                                    data.mana_lvl18
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>Mana Regeneration</td>
                            <td>
                                {editing ? 
                                    <input 
                                        type="number" 
                                        value={data.mana_regen} 
                                        onChange={(e) => {
                                            setData(prevState => ({
                                                ...prevState,
                                                mana_regen: e.target.value
                                            }))
                                        }}
                                    /> : 
                                    data.mana_regen
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>Mana Regeneration Growth</td>
                            <td>
                                {editing ? 
                                    <input 
                                        type="number" 
                                        value={data.mana_regen_growth} 
                                        onChange={(e) => {
                                            setData(prevState => ({
                                                ...prevState,
                                                mana_regen_growth: e.target.value
                                            }))
                                        }}
                                    /> : 
                                    data.mana_regen_growth
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>Mana Regeneration Level 18</td>
                            <td>
                                {editing ? 
                                    <input 
                                        type="number" 
                                        value={data.mana_regen_lvl18} 
                                        onChange={(e) => {
                                            setData(prevState => ({
                                                ...prevState,
                                                mana_regen_lvl18: e.target.value
                                            }))
                                        }}
                                    /> : 
                                    data.mana_regen_lvl18
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>Attack Damage</td>
                            <td>
                                {editing ? 
                                    <input 
                                        type="number" 
                                        value={data.attack_damage} 
                                        onChange={(e) => {
                                            setData(prevState => ({
                                                ...prevState,
                                                attack_damage: e.target.value
                                            }))
                                        }}
                                    /> : 
                                    data.attack_damage
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>Attack Damage Growth</td>
                            <td>
                                {editing ? 
                                    <input 
                                        type="number" 
                                        value={data.attack_damage_growth} 
                                        onChange={(e) => {
                                            setData(prevState => ({
                                                ...prevState,
                                                attack_damage_growth: e.target.value
                                            }))
                                        }}
                                    /> : 
                                    data.attack_damage_growth
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>Attack Damage Level 18</td>
                            <td>
                                {editing ? 
                                    <input 
                                        type="number" 
                                        value={data.attack_damage_lvl18} 
                                        onChange={(e) => {
                                            setData(prevState => ({
                                                ...prevState,
                                                attack_damage_lvl18: e.target.value
                                            }))
                                        }}
                                    /> : 
                                    data.attack_damage_lvl18
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>Attack Speed</td>
                            <td>
                                {editing ? 
                                    <input 
                                        type="number" 
                                        value={data.attack_speed} 
                                        onChange={(e) => {
                                            setData(prevState => ({
                                                ...prevState,
                                                attack_speed: e.target.value
                                            }))
                                        }}
                                    /> : 
                                    data.attack_speed
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>Attack Speed Growth</td>
                            <td>
                                {editing ? 
                                    <input 
                                        type="text" 
                                        value={data.attack_speed_growth} 
                                        onChange={(e) => {
                                            setData(prevState => ({
                                                ...prevState,
                                                attack_speed_growth: e.target.value
                                            }))
                                        }}
                                    /> : 
                                    data.attack_speed_growth
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>Attack Speed Level 18</td>
                            <td>
                                {editing ? 
                                    <input 
                                        type="number" 
                                        value={data.attack_speed_lvl18} 
                                        onChange={(e) => {
                                            setData(prevState => ({
                                                ...prevState,
                                                attack_speed_lvl18: e.target.value
                                            }))
                                        }}
                                    /> : 
                                    data.attack_speed_lvl18
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>Armour</td>
                            <td>
                                {editing ? 
                                    <input 
                                        type="number" 
                                        value={data.armour} 
                                        onChange={(e) => {
                                            setData(prevState => ({
                                                ...prevState,
                                                armour: e.target.value
                                            }))
                                        }}
                                    /> : 
                                    data.armour
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>Armour Growth</td>
                            <td>
                                {editing ? 
                                    <input 
                                        type="number" 
                                        value={data.armour_growth} 
                                        onChange={(e) => {
                                            setData(prevState => ({
                                                ...prevState,
                                                armour_growth: e.target.value
                                            }))
                                        }}
                                    /> : 
                                    data.armour_growth
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>Armour Level 18</td>
                            <td>
                                {editing ? 
                                    <input 
                                        type="number" 
                                        value={data.armour_lvl18} 
                                        onChange={(e) => {
                                            setData(prevState => ({
                                                ...prevState,
                                                armour_lvl18: e.target.value
                                            }))
                                        }}
                                    /> : 
                                    data.armour_lvl18
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>Magic Resistance</td>
                            <td>
                                {editing ? 
                                    <input 
                                        type="number" 
                                        value={data.magic_resistance} 
                                        onChange={(e) => {
                                            setData(prevState => ({
                                                ...prevState,
                                                magic_resistance: e.target.value
                                            }))
                                        }}
                                    /> : 
                                    data.magic_resistance
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>Magic Resistance Growth</td>
                            <td>
                                {editing ? 
                                    <input 
                                        type="number" 
                                        value={data.magic_resistance_growth} 
                                        onChange={(e) => {
                                            setData(prevState => ({
                                                ...prevState,
                                                magic_resistance_growth: e.target.value
                                            }))
                                        }}
                                    /> : 
                                    data.magic_resistance_growth
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>Magic Resistance Level 18</td>
                            <td>
                                {editing ? 
                                    <input 
                                        type="number" 
                                        value={data.magic_resistance_lvl18} 
                                        onChange={(e) => {
                                            setData(prevState => ({
                                                ...prevState,
                                                magic_resistance_lvl18: e.target.value
                                            }))
                                        }}
                                    /> : 
                                    data.magic_resistance_lvl18
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>Movement Speed</td>
                            <td>
                                {editing ? 
                                    <input 
                                        type="number" 
                                        value={data.movement_speed} 
                                        onChange={(e) => {
                                            setData(prevState => ({
                                                ...prevState,
                                                movement_speed: e.target.value
                                            }))
                                        }}
                                    /> : 
                                    data.movement_speed
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>Movement Speed Level 18</td>
                            <td>
                                {editing ? 
                                    <input 
                                        type="number" 
                                        value={data.movement_speed_lvl18} 
                                        onChange={(e) => {
                                            setData(prevState => ({
                                                ...prevState,
                                                movement_speed_lvl18: e.target.value
                                            }))
                                        }}
                                    /> : 
                                    data.movement_speed_lvl18
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>Attack Range</td>
                            <td>
                                {editing ? 
                                    <input 
                                        type="number" 
                                        value={data.attack_range} 
                                        onChange={(e) => {
                                            setData(prevState => ({
                                                ...prevState,
                                                attack_range: e.target.value
                                            }))
                                        }}
                                    /> : 
                                    data.attack_range
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>Attack Range Level 18</td>
                            <td>
                                {editing ? 
                                    <input 
                                        type="number" 
                                        value={data.attack_range_lvl18} 
                                        onChange={(e) => {
                                            setData(prevState => ({
                                                ...prevState,
                                                attack_range_lvl18: e.target.value
                                            }))
                                        }}
                                    /> : 
                                    data.attack_range_lvl18
                                }
                            </td>
                        </tr>
                    </tbody>
                    </Table>
            </Row>
        </Container>
    )
}

export default Champions