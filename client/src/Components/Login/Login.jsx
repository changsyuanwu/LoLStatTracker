import React, { useState, useEffect } from "react";
import { Container, Row, Col} from "react-bootstrap";
import styles from "./Login.module.css";
import Header from "../Header/Header";


const Login = () => {

    const [username, changeUsername] = useState("");
    const [password, changePassword] = useState("");

    function submitLogin(e) {
        //localStorage.removeItem('CS348FinalProjectCredentials');
        localStorage.setItem('CS348FinalProjectCredentials', "loginYes");
    }

    function usernameChange(e) {
        changeUsername(e.target.value);
    }

    function passwordChange(e) {
        changePassword(e.target.value);

    }

    return (
        <Container fluid>
            <Header />
            <Row className={styles.queryInfo}>
                <div className={styles.title}>
                    Please enter username and password Information to Register as a new User
                </div>
                <form>
                    Username: <input type="text" className={styles.input} onChange={usernameChange} required/> <br/>
                    Password: <input type="password"  className={styles.input} onChange={passwordChange} required/> <br/>
                    <button className={styles.input} onClick={submitLogin}>Login</button>
                </form>
            </Row>
        </Container>
    )
}

export default Login;