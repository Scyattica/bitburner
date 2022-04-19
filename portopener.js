/** @param {NS} ns **/
export async function main(ns) {
	var filename = ns.args[0]
	var servers = ns.read(filename).split(",")
	ns.print(ns.getPlayer().hacking)
	for(let server of servers){
		if(ns.getServerRequiredHackingLevel(server) <= ns.getPlayer().hacking){
			ns.print("Trying " + server + "...")
			if(!ns.hasRootAccess(server)){
				ns.print("We don't have root on " + server + "! Fixing...")
				openPorts(ns, server, ns.getServerNumPortsRequired(server))
				if(ns.getServerMaxRam(server) > 3.45){
					ns.print(server + "has enough ram...nuking!")
					ns.nuke(server)
				}
				else{
					ns.print(server + ": doesn't have enough ram")
				}
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
			ns.sqlinject(server)
			break
		case 5:
			ns.brutessh(server)
			ns.httpworm(server)
			ns.ftpcrack(server)
			ns.sqlinject(server)
			ns.relaysmtp(server)
			break
		default:
			ns.print("openPorts: Um....What? Bad numPorts arg")
	}
}