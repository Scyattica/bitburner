/** @param {NS} ns */
export async function main(ns) {
    let serverstxt = "servers.txt"
    ns.rm("servers.old.txt")
    ns.mv(ns.getHostname(), serverstxt, "servers.old.txt")
    ns.exec("serverstxtmaker.js", ns.getHostname(), 1, serverstxt)
    while(ns.ps().some(function(item) {return item.filename === 'serverstxtmaker.js'}) != false){ //is the servermaker still running?
        ns.tprint("Servers txt maker still running...hopefully?")
        await ns.sleep(1000)
    }
    ns.exec("portopener.js", ns.getHostname(), 1, serverstxt)
    ns.exec("lol.js", ns.getHostname(), 1, "run.js", serverstxt) // run lol.js run.js servers.txt
    ns.exec("runremote-onhome.js", ns.getHostname(), 1, "n00dles")
}