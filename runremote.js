/** @param {NS} ns **/
export async function main(ns) {
	var servername = ns.args[0]
	var maxMoney = ns.getServerMaxMoney(servername)
	var minsec = ns.getServerMinSecurityLevel(servername)
	while(true)
	{
		let hackerchance = ns.hackAnalyzeChance(servername)
		ns.print(ns.getHostname() + ": Hackerchance is: " + hackerchance)
		if(hackerchance > .75)
		{
			ns.print("Checking Server money as hackchance is " + hackerchance)
			let money = ns.getServerMoneyAvailable(servername)
			ns.print("Money is: " + money)
			ns.print("Max Money is" + maxMoney * 0.5)
			ns.print("getServerGrowth: " + ns.getServerGrowth(servername))
			if(maxMoney != 0 && money > maxMoney * 0.50)
			{
				ns.print("Server has enough cash. Starting Hack.")
				let hackresult = await ns.hack(servername)
				ns.print("HackResult is: " + hackresult)
			}
			else
			{
				ns.print("Server needs more money! Growing!")
				await ns.grow(servername)
			}
			
		}
		else if(ns.getServerSecurityLevel(ns.getHostname()) >= minsec)
		{
			while(ns.hackAnalyzeChance(servername) < .85)
			{
				ns.print(ns.getHostname() + ": Hacking chance is to low at:" + hackerchance)
				await ns.weaken(servername)
			}
			
		}
		else
		{
			ns.tprint(ns.getHostname() + ": Server to good...giving up...ugh")
			ns.exit()
		}
	}
	
}