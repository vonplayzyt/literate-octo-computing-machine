Blox Fruits Service Bot Setup
-----------------------------

This bot creates a full Discord server structure for your Blox Fruits service automatically.

1️⃣ REQUIREMENTS
   • Node.js (https://nodejs.org)
   • Discord Bot Token (from https://discord.com/developers/applications)
   • The bot must be invited to your server with Administrator permissions.

2️⃣ SETUP
   • Edit config.json:
       {
         "token": "YOUR_BOT_TOKEN_HERE",
         "prefix": "!"
       }

3️⃣ RUN THE BOT
   npm install
   npm start

4️⃣ RUN THE SETUP
   In your Discord server, type:
   !set
   (You must have Administrator role.)

5️⃣ RESULT
   • Roles are created (Owner, Staff, Booster, Customer)
   • All categories and channels are created automatically
   • Private staff area is hidden from regular members
   • Bot will shut down automatically after setup completes.
