// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import exp from 'constants';
import { stringify } from 'querystring';
import config from './config.json'

const { createServer } = require("http");
const { Server } = require("socket.io");
const Client = require("socket.io-client");

describe("my awesome project", () => {
  let io, serverSocket, clientSocket;

  beforeAll((done) => {
    const httpServer = createServer();
    io = new Server(httpServer);
    httpServer.listen(() => {
      clientSocket = new Client(`${config.URL}:${config.SOCKET_PORT}`);
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