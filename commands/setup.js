const { PermissionsBitField } = require("discord.js");

module.exports = {
  name: "set",
  description: "Sets up the full server with roles and channels.",

  async execute(message) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator))
      return message.reply("❌ You must be an admin to use this command!");

    const guild = message.guild;
    await message.channel.send("⚙️ Setting up your Blox Fruits service server...");

    try {
      // === ROLES ===
      const roles = {
        owner: await guild.roles.create({ name: "👑 Owner", color: "#ff0000", permissions: [PermissionsBitField.Flags.Administrator] }),
        staff: await guild.roles.create({ name: "🧑‍💼 Staff", color: "#ffb347" }),
        booster: await guild.roles.create({ name: "🚀 Booster", color: "#ff73fa" }),
        customer: await guild.roles.create({ name: "💎 Customer", color: "#00bfff" }),
        everyone: guild.roles.everyone
      };

      // === CHANNEL STRUCTURE ===
      const structure = [
        {
          name: "📢 INFORMATION",
          channels: ["📜︱welcome", "📕︱rules", "💼︱about-us", "💰︱pricing", "🧾︱proof-of-service", "📈︱vouches"]
        },
        {
          name: "🛒 SERVICE AREA",
          channels: ["🍇︱order-here", "⚡︱service-status", "💬︱service-chat"]
        },
        {
          name: "💎 AVAILABLE SERVICES",
          channels: ["🗡︱grinding-service", "🍏︱fruit-hunting", "🥊︱pvp-training", "🕋︱raid-awakening", "💵︱item-trading"]
        },
        {
          name: "🧑‍💼 SUPPORT",
          channels: ["🎟︱open-a-ticket", "📩︱ticket-logs"]
        },
        {
          name: "🎉 COMMUNITY",
          channels: ["💭︱general-chat", "📸︱showcase", "🧩︱giveaways", "🤖︱bot-commands"]
        },
        {
          name: "🛠 STAFF AREA",
          private: true,
          channels: ["🧑‍💻︱staff-chat", "📝︱staff-updates", "🚨︱reports", "💡︱ideas"]
        }
      ];

      // === CREATE CATEGORIES + CHANNELS ===
      for (const categoryData of structure) {
        const category = await guild.channels.create({
          name: categoryData.name,
          type: 4, // Category
          permissionOverwrites: categoryData.private
            ? [
                { id: roles.everyone, deny: [PermissionsBitField.Flags.ViewChannel] },
                { id: roles.staff.id, allow: [PermissionsBitField.Flags.ViewChannel] }
              ]
            : []
        });

        for (const channelName of categoryData.channels) {
          await guild.channels.create({
            name: channelName,
            type: 0, // Text
            parent: category.id,
            permissionOverwrites: categoryData.private
              ? [
                  { id: roles.everyone, deny: [PermissionsBitField.Flags.ViewChannel] },
                  { id: roles.staff.id, allow: [PermissionsBitField.Flags.ViewChannel] }
                ]
              : []
          });
        }
      }

      await message.channel.send("✅ All channels, categories, and roles created successfully!");
      await message.channel.send("💡 Setup complete — you can safely stop the bot now.");
      process.exit(0); // Auto shutdown since it's a one-time use
    } catch (error) {
      console.error("❌ Error creating structure:", error);
      message.channel.send("❌ Something went wrong. Check the console for details.");
    }
  }
};
