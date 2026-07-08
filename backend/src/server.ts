import app from "./app";
import { env } from "./config/env";

const PORT = env.port;

app.listen(PORT, () => {
  console.log(`
=========================================
 EthiopiaHub Images API
=========================================
 Environment : ${env.nodeEnv}
 Port        : ${PORT}
=========================================
`);

console.log(env.backendUrl);
});