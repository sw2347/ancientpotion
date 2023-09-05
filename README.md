<div align="center">
	<br />
	<p>
		<a href="https://discord.js.org"><img src="https://gcdnb.pbrd.co/images/fbGWaLAN3VTe.png?o=1" width="546" alt="discord.js" /></a>
	</p>
	<br />
	<p>
		<a href="https://discord.gg/djs"><img src="https://img.shields.io/discord/222078108977594368?color=5865F2&logo=discord&logoColor=white" alt="Discord server" /></a>
		<a href="https://www.npmjs.com/package/discord.js"><img src="https://img.shields.io/npm/v/discord.js.svg?maxAge=3600" alt="npm version" /></a>
		<a href="https://www.npmjs.com/package/discord.js"><img src="https://img.shields.io/npm/dt/discord.js.svg?maxAge=3600" alt="npm downloads" /></a>
		<a href="https://github.com/discordjs/discord.js/actions"><img src="https://github.com/discordjs/discord.js/actions/workflows/test.yml/badge.svg" alt="Tests status" /></a>
		<a href="https://codecov.io/gh/discordjs/discord.js" ><img src="https://codecov.io/gh/discordjs/discord.js/branch/main/graph/badge.svg?precision=2" alt="Code coverage" /></a>
	</p>
	<p>
		<a href="https://vercel.com/?utm_source=discordjs&utm_campaign=oss"><img src="https://raw.githubusercontent.com/discordjs/discord.js/main/.github/powered-by-vercel.svg" alt="Vercel" /></a>
		<a href="https://www.cloudflare.com"><img src="https://raw.githubusercontent.com/discordjs/discord.js/main/.github/powered-by-workers.png" alt="Cloudflare Workers" height="44" /></a>
	</p>
</div>


Eldritch is a powerful, dynamic, open-source MMORPG system developed for Discord communities with MMO and RPG themes. The main purpose and motivation of this project are to provide support to existing text-based RPG servers within Discord and elevate the Discord user experience to a higher level. You can easily download and integrate this system into your own servers as it is distributed and used freely under the GNU GPL V3 license.

## Installing

Setting up Eldritch for your own server is as easy and straightforward as installing any software. You can install Eldritch on Linux or Windows machines without requiring any programming knowledge. There are two different ways to install Eldritch. You can either clone this repository to your existing computer, or you can install the stable latest version by clicking [here](https://github.com/alimsahy/eldritch.git).

### Cloning Source
To clone Eldritch directly to your computer, you can enter the following command in your computer's terminal:
```shell
$ git clone https://github.com/alimsahy/eldritch.git
```

Once the cloning process is complete, to begin the installation, you need to run the setup file. For Windows computers, double-click on the `setup-win.bat` file, and it will automatically install the necessary dependencies on your computer.

For Linux computers, navigate to the directory where you downloaded the files, update the read/write permissions for the setup-linux.sh file, and then run it. To do this, enter the following command in the Linux terminal.

First, navigate to the directory where Eldritch has been cloned, and update the read/write permissions for the file:
```console
user@linux:~$ cd Eldritch
user@linux:/Eldritch$ chmod +x setup-linux.sh
```

After setting the permissions, you can run the `setup-linux.sh` file to install the necessary packages:
```console
user@linux:/Eldritch$ ./setup-linux.sh
```

### Running Game
Once all these installation processes are complete, to run Eldritch:

- On Windows machines, run `eldritch.bat`,
- On Linux machines, run `eldritch.sh`.

You can step into the adventurous MMO world of Eldritch by executing these files.

## Contributing
Please read through our contribution guidelines before starting a pull request. We welcome contributions of all kinds, not just code! If you're stuck for ideas, look for the good first issue label on issues in the repository. If you have any questions about the project, feel free to ask them on Discord. Before creating your own issue or pull request, always check to see if one already exists! Don't rush contributions, take your time and ensure you're doing it correctly.

## The Power Come From Open Source
You can explore open-source projects that empower Eldritch:

- DiscordJS
- TypeORM
- pg
- chalk
