import React, { Component } from "react";
import { Container, Row, Col} from "react-bootstrap";
import styles from "./Dashboard.module.css";
import Header from "../Header/Header";
import Table from "../Table/Table.jsx";


export default class Dashboard extends Component {
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
                    <Table />
                </Row>
            </Container>
        )
    }
}