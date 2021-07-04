import React, { useState, useEffect } from "react";
import { Container, Row, Col} from "react-bootstrap";
import styles from "./Register.module.css";
import Header from "../Header/Header";


const Register = () => {

    const [password1, changePassword1] = useState("");
    const [password2, changePassword2] = useState("");

    function submitCredentials(e) {
        if (password1 !== password2) {
            alert("passwords don't match");
            e.preventdefault();
            return false;
        }
    }

    function password1Change(e) {
        changePassword1(e.target.value);
    }

    function password2Change(e) {
        changePassword2(e.target.value);

    }

    return (
        <Container fluid>
            <Header />
            <Row className={styles.queryInfo}>
                <div className={styles.title}>
                    Please enter username and password Information to Register as a new User
                </div>
                <form>
                    Username: <input type="text" className={styles.input} required/> <br/>
                    Password: <input type="password"  className={styles.input} onChange={password1Change} required/> <br/>
                    Confirm Password: <input type="password"  className={styles.input} onChange={password2Change} required/> <br />
                    <button className={styles.input} onClick={submitCredentials}>Submit</button>
                </form>
            </Row>
        </Container>
    )
}

export default Register;