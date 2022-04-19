/** @param {NS} ns **/
export async function main(ns) {
	var servertxt = ns.args[0]
	let rammax = ns.getServerMaxRam(ns.getHostname())
	let threadcount = parseInt(rammax / ns.getScriptRam("remotehack.js")) - 1
	var servers = ns.read(servertxt).split(",")
	let threadsperscript = threadcount / servers.length
	for(let server of servers)
	{
		ns.exec("remotehack.js", ns.getHostname(), threadsperscript, server)
	}
}