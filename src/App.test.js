import '@testing-library/jest-dom';
import exp from 'constants';
import config from './config.json'
import io from 'socket.io-client';
import { shallow } from 'enzyme';
import Chat from './chatroom/Chat';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import { EnzymeAdapter } from 'enzyme/build';
import * as enzyme from 'enzyme';
import mount from 'enzyme/build/mount';
import render from 'enzyme/build/render';
import { act } from 'react-dom/test-utils';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const { createServer } = require("http");
const { Server } = require("socket.io");
const Client = require("socket.io-client");

describe("my awesome project", () => {
  let serverSocket, clientSocket;
  console.log("starting")
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    const useEffect = jest.spyOn(React, "useEffect");
    useEffect.mockImplementation(f => f());
  });
  
  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  enzyme.configure({ adapter: new Adapter() });

  jest.mock('socket.io-client', () => {
    const mSocket = {
      emit: jest.fn(),
    };
    return jest.fn(() => mSocket);
  })

  describe("join room test", () =>{
    it("joins a chat", () => {
      act(() => {
        ReactDOM.render(<Chat />, container);
      });
      const ENDPOINT = 'localhost:5000';
      const mockSocket = io(ENDPOINT);
      // const joinWrapper = render(<Chat />);
      // //joinWrapper.find().simulate('change', { target: { value: 'Hello' }});
      // //joinWrapper.find('#roomInput').simulate('change', { target: { value: '1' }});
      // joinWrapper.find('#roomInput').val('1');
      // joinWrapper.find('#userInput').val('Saul');
      
      const button = container.querySelector('#joinRoomButton');
      console.log(button);
      act(() => {
        // Invoke the button's click handler, but this time directly, instead of
        // via an Enzyme API
        button.dispatchEvent(new MouseEvent('click', {bubbles: true}))
      });
      // Refresh Enzyme's view of the output
      // joinWrapper.update();
      // joinWrapper.find('#userInput').simulate('change', { target: { value: 'Saul' }});
      // joinWrapper.find('#joinRoomButton').simulate('click');
      expect(mockSocket.emit).toHaveBeenCalled('join room', { user: 'Saul', room: '1'}, expect.any(Function));
    })
  });
/**
 * Node {
        type: 'tag',
        name: 'button',
        namespace: 'http://www.w3.org/1999/xhtml',
        attribs: [Object: null prototype] { id: 'joinRoomButton' },
        'x-attribsNamespace': [Object: null prototype] { id: undefined },
        'x-attribsPrefix': [Object: null prototype] { id: undefined },
        children: [ [Node] ],
        parent: Node {
          type: 'tag',
          name: 'div',
          namespace: 'http://www.w3.org/1999/xhtml',
          attribs: [Object: null prototype],
          'x-attribsNamespace': [Object: null prototype],
          'x-attribsPrefix': [Object: null prototype],
          children: [Array],
          parent: [Node],
          prev: null,
          next: null
        },
        prev: Node {
          type: 'tag',
          name: 'input',
          namespace: 'http://www.w3.org/1999/xhtml',
          attribs: [Object: null prototype],
          'x-attribsNamespace': [Object: null prototype],
          'x-attribsPrefix': [Object: null prototype],
          children: [],
          parent: [Node],
          prev: [Node],
          next: [Circular *1]
        },
        next: Node {
          type: 'tag',
          name: 'br',
          namespace: 'http://www.w3.org/1999/xhtml',
          attribs: [Object: null prototype] {},
          'x-attribsNamespace': [Object: null prototype] {},
          'x-attribsPrefix': [Object: null prototype] {},
          children: [],
          parent: [Node],
          prev: [Circular *1],
          next: [Node]
        }
      },
      length: 1,
      options: { xml: false, decodeEntities: true },
      _root: <ref *2> LoadedCheerio {
        '0': Node {
          type: 'root',
          name: 'root',
          parent: null,
          prev: null,
          next: null,
          children: [Array],
          'x-mode': 'quirks'
        },
        length: 1,
        options: { xml: false, decodeEntities: true },
        _root: [Circular *2]
      },
      prevObject: LoadedCheerio {
        '0': Node {
          type: 'tag',
          name: 'div',
          namespace: 'http://www.w3.org/1999/xhtml',
          attribs: [Object: null prototype],
          'x-attribsNamespace': [Object: null prototype],
          'x-attribsPrefix': [Object: null prototype],
          children: [Array],
          parent: [Node],
          prev: null,
          next: null
        },
        length: 1,
        options: { xml: false, decodeEntities: true },
        _root: <ref *2> LoadedCheerio {
          '0': [Node],
          length: 1,
          options: [Object],
          _root: [Circular *2]
        }
      }
    }
 */
  // afterAll(() => {
  //   io.close();
  //   clientSocket.close();
  // });
});