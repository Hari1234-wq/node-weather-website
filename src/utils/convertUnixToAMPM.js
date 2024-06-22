// Function to convert Unix timestamp to AM/PM time format
const convertUnixToAMPM = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert to milliseconds
    let hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const seconds = "0" + date.getSeconds();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)
    const formattedTime = hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2) + " " + ampm;
    return formattedTime;
}

module.exports = convertUnixToAMPM;

