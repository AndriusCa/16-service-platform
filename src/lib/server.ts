import http, { IncomingMessage, ServerResponse } from 'node:http';
import { file } from './file.js';

export const serverLogic = async (req: IncomingMessage, res: ServerResponse) => {
  const baseUrl = `http://${req.headers.host}`;
  const parsedUrl = new URL(req.url ?? '', baseUrl);
  const trimmedPath = parsedUrl.pathname
    .replace(/^\/+|\/+$/g, "")
    .replace(/\/\/+/g, "/")
  
  const textFileExtensions = ["css", "js", "svg", "webmanifest"]
  const binaryFileExtensions = ["gif", "png", "jpg", "jpeg", "webp", "ico", "eot", "ttf", "woff", "woff2", "otf",];

  const fileExtension = trimmedPath.slice(trimmedPath.lastIndexOf(".") + 1)
  
  const isTextFile = textFileExtensions.includes(fileExtension);
  const isBinaryFile = binaryFileExtensions.includes(fileExtension);
  const isAPI = trimmedPath.startsWith('/api');
  const isPage = !isTextFile && !isBinaryFile && !isAPI;

  let responseContent = '';


  

  if (isTextFile) {
    console.log('>>>>>', trimmedPath);
    const [err, msg] = await file.readPublic(trimmedPath);

    if (err) {
      responseContent = `Error: could not find file: ${trimmedPath}`;
    } else {
       responseContent = msg;
    }
  }

  if (isBinaryFile) {
    responseContent = "BINARY FILE"
  }

  if (isAPI) {
    responseContent = "API RESPONSE"
  }

  if (isPage) {
    responseContent = `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
          <link rel="stylesheet" href=""/css/main.css>
          <link rel="stylesheet" href=""/css/main2.css>
        </head>
        <body>
          
        </body>
        </html>`
  }

  res.end(responseContent);
  

  
}

export const httpServer = http.createServer(serverLogic);

export const init = () => {
  console.log('App init');
  httpServer.listen(4424, () => {
    console.log(' Server is running on http://localhost:4424')
  })
};



export const server = {
  init,
  httpServer
};


export default server;