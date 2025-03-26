// Front-Page.js
document.addEventListener('DOMContentLoaded', function () {
    function createSnowflakes() {
        const snowflakeContainer = document.createElement('div');
        snowflakeContainer.classList.add('snowflake-container');
        document.body.appendChild(snowflakeContainer);

        // Number of snowflakes
        const numSnowflakes = 50; // Adjust this number for more/less snowflakes

        for (let i = 0; i < numSnowflakes; i++) {
            const snowflake = document.createElement('div');
            snowflake.classList.add('snowflake');
            snowflake.style.left = `${Math.random() * 100}vw`; // Random horizontal position
            snowflake.style.animationDuration = `${Math.random() * 5 + 3}s`; // Random speed
            snowflake.style.opacity = Math.random(); // Random opacity
            snowflake.style.width = `${Math.random() * 20 + 5}px`; // Random size
            snowflake.style.height = snowflake.style.width; // Keep it square
            snowflakeContainer.appendChild(snowflake);
        }
    }

    // Call the function to create snowflakes
    createSnowflakes();
});

function copyToClipboard() {
    const textToCopy = "zenithmc.fun";
    navigator.clipboard.writeText(textToCopy).then(() => {
        // Show the notification
        const notification = document.getElementById('notification');
        notification.classList.add('show');

        // Hide the notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}

const serverIP = 'zenithmc.fun'; // Replace with your Minecraft server's IP address
const serverPort = 25565; // Default Minecraft port

// Make a request to the Minecraft Server Status API
fetch(`https://mcapi.us/server/status?ip=${serverIP}&port=${serverPort}`)
    .then(response => response.json())
    .then(data => {
        if (data.online) {
            // Update the span with the number of online players
            document.getElementById('playerCount').textContent = `${data.players.now}`;
        } else {
            // Update the span to indicate the server is offline
            document.getElementById('playerCount').textContent = '0';
        }
    })
    .catch(error => {
        console.error('Error fetching server status:', error);
        // Update the span to indicate an error occurred
        document.getElementById('playerCount').textContent = 'Error fetching data';
    });


const getDiscordOnlineUsers = async () => {
    try {
        const discordServerId = "1192029663879508020"; // Your Discord server ID

        const apiWidgetUrl = `https://discord.com/api/guilds/${discordServerId}/widget.json`;
        let response = await fetch(apiWidgetUrl);
        let data = await response.json();

        if (!data.presence_count) return "None";
        else return data.presence_count;
    } catch (e) {
        return "None";
    }
};

// Function to update the Discord online user count
const updateDiscordOnlineCount = async () => {
    const discordElement = document.getElementById('discordOnline');
    const onlineUsers = await getDiscordOnlineUsers();

    // Update the span with the online user count from Discord
    discordElement.textContent = `${onlineUsers}`;
};

// Call the update function to display the Discord online users
updateDiscordOnlineCount();
