import React, { Component } from "react";
import { Container, Row, Col, Accordion } from "react-bootstrap";
import styles from "./MatchHistory.module.css";
import Header from "../Header/Header";
import MatchTable from "../Table/MatchTable";

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
            </Container>
        )
    }
}