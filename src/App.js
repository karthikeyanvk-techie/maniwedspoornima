import React, { Component } from 'react';
import './App.css';
import { StreamStatus } from './twitch'
import CountDown from './CountDown'
import Instructions from './Instructions';
import Wave from './Wave';
import Sun from './Sun';
import moment from 'moment';
import styled from 'styled-components';


const Heading = styled.h1`
//     height:10%;
    margin:0px;
    background: #fff;
    box-sizing: border-box;
    height: auto;
    box-shadow: 0px 4px 5px #000;
    margin: 0;
    display: inline-block;
    font-size:3rem;
    font-weight: bold;
    color: crimson;
    margin-top: -20px;
    @media screen and (max-width: 900px){
        font-size:2rem;
    }
`
class App extends Component {
    // Global state object, in attempt to make as many components functional FSMs
    state = {
        live: false
    }

    checkIfLive = () => {
        // Polling function to check if stream is live
        //f (this.state.live) return null
        /*StreamStatus()
            .then( response => {response.json(); console.log(response);})
            .then( ({ data }) => this.setState({live: data.length > 0}))
            .catch( err => console.error(err))*/
        var isLive = this.getParameterByName("isLive");
        const startTime = moment('2020-06-03T04:30:00');
        var presentTime = moment.now();
        var diff = moment.duration(startTime.diff(presentTime));
        console.log(diff);
        console.log(isLive);
        console.log(diff._milliseconds <= 0);
        if(isLive !== null) {
            this.setState({live: isLive});
        } else {
            if(diff._milliseconds <=0) {
                this.setState({live: true});
            }
        }
    }

     getParameterByName = (name, url) => {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    componentDidMount(){
        // Kick off polling on component mount to ensure it is only called once
        this.checkIfLive()
        setInterval(this.checkIfLive, 10000)
    }

    // Shorthand function for hiding elements during livestream
    hideStyle = () => this.state.live ? {animation:'hide 0.5s forwards'} : {}

    // Function which only mounts iframe during a stream
    renderTwitch = () => {
        return this.state.live ?                
        <iframe className="twitchWindow" title="twitchStreamIFrame"
            src="https://player.twitch.tv/?channel=vk1707&muted=false"
            height="420"
            width="854"
            frameBorder="0"
            scrolling="no"
            allowFullScreen="true">
        </iframe> : null
    }

    render() {
        return (
            <div className="App" style={this.state.live ? {animation: 'theatre 0.5s forwards'} : {}}>
//                 <Sun  style={this.hideStyle()}/>
                <Heading>Manikandan weds Poornima</Heading>
                <CountDown style={this.hideStyle()}/>
                {this.renderTwitch()}
                {/*/<Instructions style={this.hideStyle()}/>
                //<Wave style={this.hideStyle()}/>*/}
            </div>
        );
    }
}

export default App;
