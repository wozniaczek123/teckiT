import { Permissions } from "discord.js";
//import { client as redis } from "../redis.js";
const subjects = new Map();
subjects.set("tech", "Sprawa techniczna");
subjects.set("admin", "Sprawa do Adniministracji");
subjects.set("mod", "Zgłaszanie łamania regulaminu");

export const createTicket = async (interaction) => {

    let subject

    if (interaction.isSelectMenu()) {
        subject = interaction.values[0] ? subjects.get(interaction.values[0]) || "No subject" : "No subject";
    }
    else subject = "No subject";


    const channel = await interaction.guild.channels.create(interaction.user.tag, {
        topic: subject,
        parent: `914606164552077383`,
        permissionOverwrites: [
            {
                id: interaction.user.id,
                allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES, Permissions.FLAGS.READ_MESSAGE_HISTORY, Permissions.FLAGS.ATTACH_FILES],
            },
            {
                id: interaction.guild.roles.everyone.id,
                deny: [Permissions.FLAGS.VIEW_CHANNEL],
            },
            {
                id: `898986454963875961`,
                allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES, Permissions.FLAGS.READ_MESSAGE_HISTORY, Permissions.FLAGS.ATTACH_FILES]
            }
        ]

    });


    channel.send({content: `Utworzono ticket <@${interaction.user.id}> <@&924331739227226143>`, components: [{
            type: 'ACTION_ROW',
            components: [{
                type: 'BUTTON',
                label: 'Usuń Ticket',
                customId: 'ticket.delete',
                style: 'DANGER',
            }]
        }]
    });

}