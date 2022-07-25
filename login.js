let clientID = ""; // Colocar seu Client ID
let redirectUri = ""; // Colocar seu redirect_uri
let scopes = "playlist-modify-private playlist-modify-public playlist-read-collaborative playlist-read-private";

function login() {
    location.href = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientID}&redirect_uri=${redirectUri}&scope=${scopes}`
}

document.getElementById("btnEntrar").onclick = login