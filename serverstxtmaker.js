/** @param {NS} ns **/

export async function main(ns) 
{
	var filename = ns.args[0]

	var servertxt = ns.read(filename)
	
	
}

function serverstxt(ns, serverstxt)
{
    var serverSet = new Set()
    if(servertxt == "")
	{
		var servers = ns.scan(ns.getHostname())
	}
	else
	{
		var servers = servertxt.split(",")
	}
	for(let homeserver of ns.scan(ns.getHostname()))
	{
		ns.print(ns.getHostname() + ": " + homeserver)
		serverSet.add(homeserver)
	}
	for(let server of servers)
	{
		for(let serv of ns.scan(server))
		{
			if(serv != "home")
			{
				ns.print(server + ": " + serv)
				serverSet.add(serv)
			}
			
		}
	}
	// await ns.sleep(10000)
	if(Array.from(serverSet).length == servers.length)
	{
		//New Array is the same as the file....found nothing, probably. Will stop now. 
		ns.print("Stopping as serverSet == servers")
		ns.exit()
	}
	else
	{
		ns.print("Starting again!")
		await ns.write("servers.txt", Array.from(serverSet), "w")
		ns.spawn(ns.getScriptName(), 1, "servers.txt")
	}
}