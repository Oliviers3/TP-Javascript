import React from 'react';
import App from './App';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

let container = null;

beforeEach(() => {
    jest.useFakeTimers();
    
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    jest.clearAllTimers();
});

it("renders without crashing", () => {
    act(() => {
        render(<App />, container);
    });
    expect(container.textContext).toMatch("0min : 0s");
   
    act(() => {
        jest.advanceTimersByTime(100);
    });
    expect(container.textContext).toMatch("0min : 0s");
    
    act(() => {
        jest.advanceTimersByTime(1000);
    });
    expect(container.textContent).toMatch("0min : 1s");
    
    act(() => {
        jest.advanceTimersByTime(59000);
    });
    expect(container.textConent).toMatch("1min : 0s");
    
    act(() => {
        jest.adavanceTimersByTime(60*1000 + 60*60*1000);
    });
    expect(container.textContent).toMatch("0min : 0s");
});