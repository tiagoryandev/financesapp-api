import "colors";
import os from "os";
import cluster from "cluster";

const startPrimaryProcess = () => {
	const cpus = os.cpus().length * 2;
    
	console.log(`[PRIMARY: ${process.pid}]`.yellow + " Process Primary is Running.");
	console.log("[CUSTER]".yellow + " Generate " + `${cpus}`.gray + " Workers.");

	for (let index = 0; index < cpus; index++)
		cluster.fork();

	cluster.on("exit", (worker, code) => {
		if (code !== 0 && !worker.exitedAfterDisconnect) {
			console.log(`[WORKER: ${worker.process.pid}]`.red + " Worker died.");
			cluster.fork();
		}
	});
};

const startWorkerProcess = async () => {
	await import("./server");
};

cluster.isPrimary ? startPrimaryProcess() : startWorkerProcess();