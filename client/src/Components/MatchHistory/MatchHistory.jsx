import React, { Component } from "react";
import { Container, Row, Col, Card, Form, Navbar, Nav } from "react-bootstrap";
import styles from "./MatchHistory.module.css";
import Header from "../Header/Header";

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container fluid>
                <Header />
                <Row className={styles.searchHeader}>
                    Search Champion Match History
                </Row>
                <Row>
                    <form>
                        <input type="text" />
                    </form>
                </Row>
                <Row>
                </Row>
            </Container>
        )
    }
}