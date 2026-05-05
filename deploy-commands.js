require("dotenv").config();
const { REST, Routes, SlashCommandBuilder } = require("discord.js");

const commands = [
    new SlashCommandBuilder()
        .setName("cp")
        .setDescription("Send a CP image mentioning a user")
        .addUserOption(option =>
            option
                .setName("target")
                .setDescription("User to send the image to")
                .setRequired(true)
        )
        .toJSON(),
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log("Started refreshing application (/) commands.");

        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID), // replace with your bot's CLIENT_ID
            { body: commands }
        );

        console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
        console.error(error);
    }
})();