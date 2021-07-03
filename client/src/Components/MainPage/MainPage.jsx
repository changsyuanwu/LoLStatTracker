import React, { Component } from "react";
import styles from "./MainPage.module.css";
import Header from "../Header/Header";
import source from "../../Assets/Videos/league.mp4"


export default class MainPage extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        //this.state = {
        //    data: []
        //};
    };

    // <source src="http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4" type="video/mp4" />
    // <source src="..\..\Assets\Videos\league.mp4" type="video/mp4" />
    render() {
        return (
            <div>
                <Header />
                <video playsInline autoPlay loop>
                    <source src={source} type="video/mp4" />
                </video>
            </div>
        )
    }
}