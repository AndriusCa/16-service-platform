// susiimportina
import { server } from "./lib/server.js"


// turi savo programos pasileidima // kaip inicijuoti app`a
// iskviecia funkcija
export const init = () => {
  console.log("App init...")
  server.init();
}

// app - rinkinys funkciju
// reikia priregistruoti nauja funkcija prie objekto
export const app = {
  init,
 
}

export default app

// ir tiesiog pasileidzia
app.init();
