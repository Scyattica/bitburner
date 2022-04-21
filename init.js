/** @param {NS} ns */
export async function main(ns) {
    ns.rm("servers.old.txt")
    ns.move(ns.getHostname(), "servers.txt", "servers.old.txt")
    ns.exec("remotehack.js", ns.getHostname(), threadsperscript, server)
}