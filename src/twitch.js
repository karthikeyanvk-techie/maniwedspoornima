// Just poll API gateway endpoint
export const StreamStatus = () => 
    fetch('https://6np3c3pm60.execute-api.ap-southeast-2.amazonaws.com/prod/stream')