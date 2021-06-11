import React, { Component } from "react";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import styles from "./Dashboard.module.css";
import Logo from "../../Assets/Images/lol_logo.png";
import Table from "../Table/Table.jsx"

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
                <Row className={styles.queryInfo}>
                    Query Information
                    <Col>
                        Winrate Percentage
                        <form>
                            <input type="radio" id=">50%"/>
                            <label for=">50%">&gt;50%</label><br />
                            <input type="radio" id="<=50%"/>
                            <label for="<=50%">&lt;=50%</label>
                        </form>
                    </Col>
                    <Col>
                        Time
                        <form>
                            <input type="radio" id="sometime"/>
                            <label for="sometime">sometime</label>
                        </form>
                    </Col>
                </Row>
                <Row>
                Query Results:
                    <Table />
                </Row>
            </Container>
        )
    }
}