import React, {Component} from 'react'
import moment from 'moment'
import styled from 'styled-components'

const CountDownDiv = styled.div`

    margin: 0;
//     margin-top: 10px
    //margin-top:50px;
//     margin-left:10px;
    font-size: xx-large;
    text-align:center;
    font-weight: bold;
    color: white;
    width: 100%;
    
    @media screen and (max-width: 900px){
       // margin-top:1.5rem;
       // margin-bottom:1.5rem;
       // font-size:1.5rem;
    }
`


class CountDown extends Component{
    // Statefull component to allow efficient re-render of countdown
    state = {
        now: moment.now()
    }

    componentDidMount(){
        // Set polling interval for updating time state
        setInterval(()=>this.setState({now:moment.now()}), 1000)
    }

    renderTime = () => {
        // Use moment.js to render human readable fuzzy time
        const startTime = moment('2020-06-03T04:30:00')
        var duration = moment.duration(startTime.diff(this.state.now));

        /* Override output after deadline to avoid funny time 
           e.g. 'stream starting a few seconds ago' */
        return duration._milliseconds <= 0 ? 'soon' : startTime.fromNow()
    }

    render(){
        return <CountDownDiv class="marqueeDiv" style={this.props.style}>
            Live stream of the ceremony starting {this.renderTime()}
        </CountDownDiv>
    }
}

export default CountDown
