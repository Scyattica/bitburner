/** @param {NS} ns **/
export async function main(ns) {
	var servername = ns.args[0]
	var maxMoney = ns.getServerMaxMoney(servername)
	var minsec = ns.getServerMinSecurityLevel(servername)
	let rammax = ns.getServerMaxRam(servername)
	let threadcount = parseInt(rammax / 3.45)
	ns.exec("remotehack.js", servername, threadcount, servername)
}