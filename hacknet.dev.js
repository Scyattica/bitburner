/** @param {NS} ns **/
export async function main(ns) {
    var lol = upgradeServers(ns)
    var whocares = await lol
    ns.tprint("After stuff")
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
	ns.print(theTime() + "Index:" + hsnode.index + ", Cores To Buy: " + corestobuy)
    if(corestobuy > 0){
        ns.hacknet.upgradeCore(hsnode.index, corestobuy)
        return corestobuy
    }
    else{return 0}
}

function buyRam(ns, hsnode){
	let ramtobuy = 0;
	for(let j = ns.hacknet.getNodeStats(hsnode.index).ram; j < 64; j = j * 2) //Foreach Core that is needed? ? 
	{
		if(ns.hacknet.getRamUpgradeCost(hsnode.index, ramtobuy) < ns.getPlayer().money)//How many rams to buy
		{
			ramtobuy++;
		}
	}
	ns.print(theTime() + "Index:" + hsnode.index + ", Rams To Buy: " + ramtobuy)
    if(ramtobuy > 0 ){
        ns.hacknet.upgradeRam(hsnode.index, ramtobuy)
        return ramtobuy
    }
    else{return 0}
    
}

function buyLevels(ns, hsnode){
	let levelstobuy = 0;
	for(let j = ns.hacknet.getNodeStats(hsnode.index).level; j < 200; j++) //Foreach Core that is needed? ? 
	{
		if(ns.hacknet.getLevelUpgradeCost(hsnode.index, levelstobuy) < ns.getPlayer().money)//How many levels to buy
		{
			levelstobuy++;
		}
	}
	ns.print(theTime() + "Index:" + hsnode.index + ", Levels To Buy: " + levelstobuy)
    if(levelstobuy > 0){
        ns.hacknet.upgradeLevel(hsnode.index, levelstobuy)
        return levelstobuy
    }
    else{return 0}
}

async function upgradeServers(ns){
    while(true){
        let serverArray = new Array()
        for(let i = 0; i < ns.hacknet.numNodes(); i++){ //Foreach node
            serverArray.push( new HackNetNodes(i, ns.hacknet.getNodeStats(i).cores, ns.hacknet.getNodeStats(i).ram, ns.hacknet.getNodeStats(i).level))
        }
        let upgrade = 0  
        serverArray.forEach(hsnode => {
            upgrade = upgrade + buyCores(ns, hsnode);
            upgrade = upgrade + buyRam(ns, hsnode);
            upgrade = upgrade + buyLevels(ns, hsnode)
        })
        let newnode = 0;
        if(!(upgrade > 0)){
            if(ns.hacknet.getPurchaseNodeCost() < ns.getPlayer().money)
            {
                ns.print(theTime() + "Bought a new node!")
                ns.hacknet.purchaseNode()
                newnode = 1
            }
        }
        if(newnode == 0)
        {
            await ns.sleep(120000)
        }
    }
}

function theTime(){
    var time = new Date()
    return "".concat(time.getHours(), ":", time.getMinutes(), ":", time.getSeconds(), ": ")
}

class HackNetNodes {
    constructor(index, corecount, ramcount, levelcount){
        this.index = index
        this.corecount = corecount
        this.ramcount = ramcount
        this.levelcount = levelcount
    }
}