/** @param {NS} ns **/

export async function main(ns) 
{
	var filename = ns.args[0]
	let serverstxt = ns.args[1]
	// var servers = ns.scan(ns.getHostname())
	var servers = ns.read(serverstxt).split(",")
	for(let server of servers)
	{
		if(ns.hasRootAccess(server))
		{
			ns.tprint(server+ ": Script not running!")
			ns.tprint(server+ ": Writing or Overwriting the script.")
			await ns.scp(FileList=[filename], "home", server)
			if(ns.scriptRunning(filename, server))
			{
				ns.kill(filename, server)
			}
			StartServerHack(ns, server, filename)
		}
		
	}
}

function StartServerHack(ns, server, filename)
{
	let rammax = ns.getServerMaxRam(server)
	let threadcount = parseInt(rammax / 3.45)
	if(threadcount > 0)
	{
		ns.tprint(server+ ": Setting thread count to " + threadcount)
		ns.tprint(server+ ": Starting script!")
		ns.exec(filename, server, threadcount)
	}
}
