import { Client, Intents } from 'discord.js';
import { createTicket } from './methods/createTicket.js';
import 'dotenv/config';
import { deleteTicket } from './methods/deleteTicket.js';
import './mongodb.js'

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    client.user.setActivity('Mine kamp', { type: 'STREAMING', url: 'https://twich.tv/help'})

});

client.on('interactionCreate', async interaction => {



    if(interaction.isButton() || interaction.isSelectMenu()) {


        await client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 6
            }
        })

        try {

            if(interaction.customId.startsWith('create.ticket')) {

                await createTicket(interaction)

            } else if(interaction.customId === 'ticket.delete'){

                await deleteTicket(interaction)

            } else if(interaction.customId === 'select.topic'){
                interaction.webhook.send({"content": "Wybierz kategorię ticketu",
                    "ephemeral": true,
                    "components": [
                        {
                            "type": 1,
                            "components": [
                                {
                                    "type": 3,
                                    "custom_id": "create.ticket",
                                    "options":[
                                        {
                                            "label": "Sprawa do administracji",
                                            "value": "admin",
                                            "description": "Sprawy do administracji.",
                                            "emoji": {
                                                "name": "rogue",
                                                "id": "625891304148303894"
                                            }
                                        },
                                        {
                                            "label": "Moderacja",
                                            "value": "mod",
                                            "description": "Zgłaszanie łamania regulaminu.",
                                            "emoji": {
                                                "name": "mage",
                                                "id": "625891304081063986"
                                            }
                                        },
                                        {
                                            "label": "Zgłoszenia techniczne",
                                            "value": "tech",
                                            "description": "Zgłoś problemy z botami albo serwerem.",
                                            "emoji": {
                                                "name": "priest",
                                                "id": "625891303795982337"
                                            }
                                        }
                                    ],
                                    "placeholder": "Wybierz Kategorię ticketu",
                                    "min_values": 1,
                                    "max_values": 1
                                }
                            ]
                        }
                    ]
                })
            }


        } catch (e) {

            console.log(e)

        }
    }
});

client.login(process.env.TOKEN)