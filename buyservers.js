/** @param {NS} ns **/
export async function main(ns) {
    let prefix = ns.args[0]
    //ns.tprint(getMaxPurchaseRam(ns))
    buyServer(ns, prefix)
}

function getMaxPurchaseRam(ns){
    let j = 0;
    let i = 0;
    for(i = 1; j != 1; i = i * 2){
        ns.print("Checking Purchase price with " + i + " ram")
        if(ns.getPurchasedServerCost(i) > ns.getPlayer().money)
        {
            ns.print("Cost to high! I have " + ns.getPlayer().money + " but it costs " + ns.getPurchasedServerCost(i))
            //ns.tprint(ns.getPurchasedServerMaxRam())
            j = 1
            break;
        }
        else
        {
            ns.print("Cost is good! I have " + ns.getPlayer().money + " and it costs " + ns.getPurchasedServerCost(i))
            if(i >= ns.getPurchasedServerMaxRam())
            {
                ns.print("Max ram reached!")
                j = 1;
                return i
                break;
                
            }
            else
            {
                ns.print("Max Ram not reached...continuing!")
            }
        }
    }
    let newvalue = (i/2) // why is this a thing? because it still does a i * 2 even if it hits the thing apparently or breaks out of the loop? 
    ns.tprint("newvalue is:" + newvalue + ", i is: " + i)
    return newvalue
}

async function buyServer(ns, prefix){
    let servers = ns.getPurchasedServers()
    let newservername = ""
    if(prefix == null){
        ns.tprint("bad prefix, dummy!")
        ns.exit()
    }
    else if(prefix.toLowerCase() == "delete")
    {
        if(await ns.prompt("This will remove ALL purchased servers. Are you sure?", Boolean))
        {
            ns.getPurchasedServers().forEach(element => ns.deleteServer(element))
        }
    }
    if(servers.length < 1)
    {
        newservername = prefix + "-0"
           
    }
    else
    {
        newservername = prefix + "-" + ns.getPurchasedServers().length
    }
    let maxram = getMaxPurchaseRam(ns)
    if(prefix.toLowerCase() != "test"){
        
        ns.purchaseServer(newservername, maxram)
        let files = ["runremote.js", "remotehack.js"]
        ns.scp(files, "home", newservername)
    }
}