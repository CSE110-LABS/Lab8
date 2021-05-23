/**
 * @jest-environment jsdom
 */

import { pushToHistory } from "../scripts/router.js";

describe("pushToHistory test", () => {
  let currHistory;
  test("test settings state", () => {
    currHistory = pushToHistory("settings");
    expect(currHistory.state.page).toBe("settings");
    expect(currHistory.length).toBe(history.length);
  });

  test("test entry state", () => {
    currHistory = pushToHistory("entry", 1);
    expect(currHistory.state.page).toBe("entry1");
    expect(currHistory.length).toBe(history.length);
  });

  test("test default state", () => {
    const currHistory = pushToHistory();
    expect(currHistory.state.page).toBe(undefined);
    expect(currHistory.length).toBe(history.length);
  });
});
