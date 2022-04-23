/** @param {NS} ns **/
export async function main(ns) {
	var filename = ns.args[0]
	var servers = ns.read(filename).split(",")
	var waittime = 1000
	while(true)
	{
		ns.print(ns.getPlayer().hacking)
		let canopenports = howManyHackerMans(ns)
		for(let server of servers){
			if(ns.getServerRequiredHackingLevel(server) <= ns.getPlayer().hacking){
				ns.print("Trying " + server + "...")
				if(!ns.hasRootAccess(server)){
					ns.print("We don't have root on " + server + "! Fixing...")
					if(canopenports > ns.getServerNumPortsRequired(server)){
						openPorts(ns, server, ns.getServerNumPortsRequired(server))
						if(ns.getServerMaxRam(server) > 3.45){
							ns.print(server + "has enough ram...nuking!")
							ns.nuke(server)
						}
						else{
							ns.print(server + ": doesn't have enough ram")
						}
					}
					else{ns.print("Don't have enough port openers!")}
				}
				else{
					ns.print(server + ": We already have root.")
				}
			}
			else
			{
				ns.print(server + ": Servers to good! I can't beat it.")
			}
		}
		await ns.sleep(waittime) //sleep 30 mins
		waittime = waittime * 2
	}
}

function openPorts(ns, server, numPorts){
	switch(numPorts){
        case 0:
            break
		case 1:
			ns.brutessh(server)
			break
		case 2:
			ns.brutessh(server)
			ns.ftpcrack(server)
			break
		case 3:
			ns.brutessh(server)
			ns.ftpcrack(server)
			ns.relaysmtp(server)
			break
		case 4:
			ns.brutessh(server)
			ns.httpworm(server)
			ns.ftpcrack(server)
			ns.relaysmtp(server)
			break
		case 5:
			ns.brutessh(server)
			ns.httpworm(server)
			ns.ftpcrack(server)
			ns.relaysmtp(server)
			ns.sqlinject(server)
			break
		default:
			ns.print("openPorts: Um....What? Bad numPorts arg")
	}
}

function howManyHackerMans(ns){
	const hackermanprogs = ["BruteSSH.exe", "FTPCrack.exe", "relaySMTP.exe", "HTTPWorm.exe", "SQLInject.exe "]
	let num = 0
	for(let prog in hackermanprogs)
	{
		if(ns.fileExists(prog))
		{
			num++
		}
	}
	return num
}