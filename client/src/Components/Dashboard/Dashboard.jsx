import React, { Component } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import styles from "./Dashboard.module.css";
import Logo from "../../Assets/Images/leagueLogo.png";

export default class Login extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container fluid>
                <Row className={styles.Header}>
                    <img src={Logo} className={styles.Logo} />
                    CS348 League of Legends Project
                </Row>
                <Row>
                    Query Information
                </Row>
                <Row>
                    Query Results
                </Row>
            </Container>
        )
    }
}