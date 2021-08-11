import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./MatchHistory.module.css";
import Header from "../Header/Header";
import MatchTable from "../Table/MatchTable";
import BarGraph from "../Table/BarGraph";
import DoughGraph from "../Table/DoughGraph";

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container fluid>
                <Header />
                <Row className={styles.searchHeader}>
                    <Col></Col>
                    <Col>
                        Search Champion Match History
                    </Col>
                    <Col></Col>
                </Row>
                <Row>
                    <MatchTable />
                </Row>
                <Row>
                    <Col className={styles.bargraph}>
                        <BarGraph/>
                    </Col>
                    <Col className={styles.doughgraph}>
                        <DoughGraph/>
                    </Col>
                </Row>
            </Container>
        )
    }
}