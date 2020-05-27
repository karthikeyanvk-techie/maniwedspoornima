import React from 'react'
import styled from 'styled-components'

const InstructionsDiv = styled.div`
    margin: auto;
    margin-top: 20px;
    font-size: x-large;
    text-align: center;
    @media screen and (max-width: 900px){
        font-size:1.3rem;
    }
`

export default (props) => <InstructionsDiv style={props.style}>
    You do not need to do anything, the stream will start of its own accord.
</InstructionsDiv>