import '@testing-library/jest-dom';
import config from './config.json'

const { createServer } = require("http");
const { Server } = require("socket.io");
const Client = require("socket.io-client");

describe("my awesome project", () => {
  let io, serverSocket, clientSocket;
  console.log("starting")
  beforeAll((done) => {
    const httpServer = createServer();
    io = new Server(httpServer);
    httpServer.listen(() => {
      const port = httpServer.address().port;
      clientSocket = new Client(`${config.URL}:${port}`);
      io.on("connection", (socket) => {
        serverSocket = socket;
      });
      clientSocket.on("connect", done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  test("join room test", (done) =>{
    let data = {user: "test user", room: "test room"};
    clientSocket.on("message sent", (arg) => {
        expect(arg.text).toBe(`${data.user} has connected`);
        done();
    })
    clientSocket.emit("join room", data);
  });
});