/** @param {NS} ns **/
export async function main(ns) {
	let nodes = ns.hacknet.numNodes();	
    let hacknetnode = new HackNetNodes(0, ns.hacknet.getNodeStats(0).cores, ns.hacknet.getNodeStats(0).ram, ns.hacknet.getNodeStats(0).level)
    let hacknetnode1 = new HackNetNodes(1, ns.hacknet.getNodeStats(1).cores, ns.hacknet.getNodeStats(1).ram, ns.hacknet.getNodeStats(1).level)
    let object = {hacknetnode, hacknetnode1}
	//ns.tprint(Object.keys(object))
    for(let key of Object.keys(object))
    {
        ns.tprint(object[key])
    }
    //Todo:
    //Do a for loop and create a dictionary of the hacknetnodes class and do everything based off of that. 
	//for(let i = 0; i < ns.hacknet.numNodes(); i++){ //Foreach node
	//	BuyCores(ns, i)
	//}
}

function BuyCores(ns, hacknetindex){
	let corestobuy = 0;
	for(let j = ns.hacknet.getNodeStats(hacknetindex).cores; j < 16; j++) //Foreach Core that is needed? ? 
	{
		if(ns.hacknet.getCoreUpgradeCost(hacknetindex, corestobuy) < ns.getPlayer().money)//How many cores to buy
		{
			corestobuy++;
		}
	}
	ns.tprint("Index:" + hacknetindex + ", Cores To Buy: " + corestobuy)
}

class HackNetNodes {
    constructor(index, corecount, ramcount, levelcount){
        this.index = index
        this.corecount = corecount
        this.ramcount = ramcount
        this.levelcount = levelcount
    }
}