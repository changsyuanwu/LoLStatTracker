import React, { Component } from "react";
import { Container, Row, Col} from "react-bootstrap";
import styles from "./MainPage.module.css";
import Header from "../Header/Header";
import Table from "../Table/Table.jsx";


export default class MainPage extends Component {
    constructor(props) {
        super(props);
        //this.state = {
        //    data: []
        //};
    };

    render() {
        return (
            <Container fluid>
            <Header />
            <Row className={styles.queryInfo}>
                <video loop style={{position: "fixed", padding: "25%", width: "100%", left: 0, top: 0}}>
                    <source src="..\..\Assets\Videos\league.mp4" type="video/mp4" />
                </video>
            </Row>
        </Container>
        )
    }
}