 import { registerHealthWorker } from "shared/src/queue"; 
import { logger } from "shared/src/logger"; 
(async function main(){ 
registerHealthWorker(async (p)=> logger.info({ p }, "health 
OK")); 
logger.info("worker started"); 
})(); 