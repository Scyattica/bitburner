/** @param {NS} ns **/

export async function main(ns) 
{
	var filename = ns.args[0]
	let serverstxt = ns.args[1]
	const blacklist = ["run4theh111z", "I.I.I.I", "avmnite-02h"] //servers that dont give me money. 
	// var servers = ns.scan(ns.getHostname())
	while(true){
		var servers = ns.read(serverstxt).split(",")
		for(let server of servers)
		{
			if(!blacklist.includes(server))
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
		await ns.sleep(3600000)
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
