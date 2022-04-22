/** @param {NS} ns **/
export async function main(ns) {
	var server = ns.args[0]
	let rammax = ns.getServerMaxRam(ns.getHostname())
	let threadcount = parseInt(rammax / ns.getScriptRam("remotehack.js")) - 10
	let threadsperscript = threadcount
	ns.exec("remotehack.js", ns.getHostname(), threadsperscript, server)
}