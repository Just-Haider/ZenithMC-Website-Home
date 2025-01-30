document.querySelectorAll('.particle').forEach(particle => {
    const randomX = (Math.random() * 250 - 125).toFixed(1);  // Random value between -125px and 125px
    const randomY = (Math.random() * 250 - 125).toFixed(1);  // Random value between -125px and 125px

    // Apply the random values for each particle's --x and --y
    particle.style.setProperty('--x', `${randomX}px`);
    particle.style.setProperty('--y', `${randomY}px`);
});



const serverIP = 'zenithmc.fun'; // Replace with your Minecraft server's IP address
const serverPort = 25565; // Default Minecraft port

// Make a request to the Minecraft Server Status API
fetch(`https://mcapi.us/server/status?ip=${serverIP}&port=${serverPort}`)
    .then(response => response.json())
    .then(data => {
        if (data.online) {
            document.getElementById('playerCount').textContent = `${data.players.now} player(s) online`;
        } else {
            document.getElementById('playerCount').textContent = 'Server is offline';
        }
    })
    .catch(error => {
        console.error('Error fetching server status:', error);
        document.getElementById('playerCount').textContent = 'Error fetching data';
    });

// Fetch Discord online users count
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
    discordElement.textContent = `Discord Online: ${onlineUsers}`;
};

// Call the update function to display the Discord online users
updateDiscordOnlineCount();

// Notification handling for copying IP (same as before)
document.querySelector('.copy-ip').addEventListener('click', function() {
    const ip = 'zenithmc.fun'; // Server IP you want to copy
    navigator.clipboard.writeText(ip).then(() => {
        const notification = document.getElementById('notification');
        notification.style.display = 'block';
        notification.classList.add('show');

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.style.display = 'none';
            }, 300);
        }, 3000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
});


class ParticleSystem {
    constructor() {
        this.container = document.getElementById('particles-container');
        this.maxParticles = 20;
        this.particles = [];
        this.init();
    }

    init() {
        setInterval(() => this.createParticle(), 300);
    }

    createParticle() {
        const particle = document.createElement('img');
        particle.src = 'assets/images/text-parti.png';
        particle.className = 'particle';
        
        // Random properties
        const left = Math.random() * 100;
        const delay = Math.random() * 2;
        const duration = 3 + Math.random() * 4;
        
        particle.style.left = `${left}%`;
        particle.style.animation = `fall ${duration}s linear ${delay}s`;
        
        this.container.appendChild(particle);
        this.particles.push(particle);

        // Remove particle after animation
        particle.addEventListener('animationend', () => {
            particle.remove();
            this.particles = this.particles.filter(p => p !== particle);
        });

        // Limit particles
        if (this.particles.length > this.maxParticles) {
            const oldParticle = this.particles.shift();
            if (oldParticle) oldParticle.remove();
        }
    }
}

// Initialize particle system
const particleSystem = new ParticleSystem();

// Copy IP functionality
const copyButton = document.getElementById('copyButton');
const notification = document.getElementById('notification');

copyButton.addEventListener('click', () => {
    navigator.clipboard.writeText('ZENITHMC.FUN');
    notification.style.opacity = '1';
    setTimeout(() => {
        notification.style.opacity = '0';
    }, 2000);
});


document.querySelector('.image-container').addEventListener('mouseenter', () => {
    console.log('Rockets launched!');
  });
  
  document.querySelector('.image-container').addEventListener('mouseleave', () => {
    console.log('Rockets reset!');
  });

function scrollToInfo() {
    document.getElementById('info-section').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

