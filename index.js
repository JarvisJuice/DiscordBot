require("dotenv").config();
const fs = require("fs");
const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

client.once("clientReady", () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on("interactionCreate", async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "cp") {
        const targetUser = interaction.options.getUser("target");
        const username = targetUser.username; // will match folder name

        const userFolder = `./images/${username}`;

        // Check if the folder exists
        if (!fs.existsSync(userFolder)) {
            return interaction.reply({
                content: `No images found for ${username}.`,
                ephemeral: true
            });
        }

        // Read all images in that user's folder
        const images = fs.readdirSync(userFolder);
        if (images.length === 0) {
            return interaction.reply({
                content: `No images found for ${username}.`,
                ephemeral: true
            });
        }

        // Pick a random image
        const randomImage = images[Math.floor(Math.random() * images.length)];

        // Reply with the random image
        await interaction.reply({
            content: `${targetUser.username}, here’s your CP!`,
            files: [`${userFolder}/${randomImage}`]
        });
    }
});

client.login(process.env.TOKEN);