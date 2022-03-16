/** @param {NS} ns **/
export async function main(ns) {
    let serverArray = new Array()
	//ns.tprint(Object.keys(object))
    //Todo:
    //Do a for loop and create a dictionary of the hacknetnodes class and do everything based off of that. 
	for(let i = 0; i < ns.hacknet.numNodes(); i++){ //Foreach node
		serverArray.push( new HackNetNodes(i, ns.hacknet.getNodeStats(i).cores, ns.hacknet.getNodeStats(i).ram, ns.hacknet.getNodeStats(i).level))
	}
    //ns.tprint(serverArray)
    serverArray.forEach(hsnode => {
        buyCores(ns, hsnode);
        buyRam(ns, hsnode);
    })
}

function buyCores(ns, hsnode){
	let corestobuy = 0;
	for(let j = ns.hacknet.getNodeStats(hsnode.index).cores; j < 16; j++) //Foreach Core that is needed? ? 
	{
		if(ns.hacknet.getCoreUpgradeCost(hsnode.index, corestobuy) < ns.getPlayer().money)//How many cores to buy
		{
			corestobuy++;
		}
	}
	ns.tprint("Index:" + hsnode.index + ", Cores To Buy: " + corestobuy)
    //ns.hacknet.upgradeCores(hsnode.index, corestobuy)
}

function buyRam(ns, hsnode){
	let ramtobuy = 0;
	for(let j = ns.hacknet.getNodeStats(hsnode.index).ram; j < 64; j * 2) //Foreach Core that is needed? ? 
	{
		if(ns.hacknet.getRamUpgradeCost(hsnode.index, ramtobuy) < ns.getPlayer().money)//How many rams to buy
		{
			ramtobuy++;
		}
	}
	ns.tprint("Index:" + hsnode.index + ", Rams To Buy: " + ramtobuy)
    //ns.hacknet.upgradeCores(hsnode.index, corestobuy)
}

class HackNetNodes {
    constructor(index, corecount, ramcount, levelcount){
        this.index = index
        this.corecount = corecount
        this.ramcount = ramcount
        this.levelcount = levelcount
    }
}