import React, { Component } from "react";
import { Row, Col, Nav } from "react-bootstrap";
import styles from "./Header.module.css";
import Logo from "../../Assets/Images/lol_logo.png";

export default class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Row className={styles.Header}>
                <img src={Logo} className={styles.Logo} />
                <Col xs={6}>
                    <div className={styles.title}>
                        CS348 League of Legends Project
                    </div>
                </Col>
                <Col xs={5}>
                    <Nav className="navBar">
                        <Nav.Link href="/mainpage">Home</Nav.Link>
                        <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                        <Nav.Link href="/match-history">Match History</Nav.Link>
                    </Nav>
                </Col>
            </Row>
        )
    }
}