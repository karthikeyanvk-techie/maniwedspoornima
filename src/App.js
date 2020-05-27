import React, { Component } from 'react';
import './App.css';
import { StreamStatus } from './twitch'
import CountDown from './CountDown'
import Instructions from './Instructions';
import Wave from './Wave';
import Sun from './Sun';
import styled from 'styled-components';


const Heading = styled.h1`
    height:10%;

    @media screen and (max-width: 900px){
        font-size:3rem;
    }
`
class App extends Component {
    // Global state object, in attempt to make as many components functional FSMs
    state = {
        live: true
    }

    checkIfLive = () => {
        // Polling function to check if stream is live
        if (this.state.live) return null
        StreamStatus()
            .then( response => response.json())
            .then( ({ data }) => this.setState({live: data.length > 0}))
            .catch( err => console.error(err))
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
                <Sun  style={this.hideStyle()}/>
                <Heading style={this.hideStyle()}>Manikandan weds Poornima</Heading>
                <CountDown style={this.hideStyle()}/>
                {this.renderTwitch()}
                <Instructions style={this.hideStyle()}/>
                <Wave style={this.hideStyle()}/>
            </div>
        );
    }
}

export default App;
