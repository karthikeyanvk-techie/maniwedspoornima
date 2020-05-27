import React from 'react' 
import styled from 'styled-components'
import './animation.css'

const Sun = styled.div`
	width: 10vw;
	height: 10vw;
	background-color: #FDB813;
	-moz-border-radius: 50px;
	-webkit-border-radius: 50px;
	border-radius: 5vw;
    position: absolute;
    z-index: -1;
`
export default (props) => <Sun className='sun' style={props.style}/>