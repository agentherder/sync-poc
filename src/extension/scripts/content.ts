import { log } from "../../shared/log";
import { isTodoSyncEnvelope } from "../../shared/types";

log("extension content script loading");

const port = chrome.runtime.connect({ name: "todos" });

window.addEventListener("message", (e) => {
  if (e.source !== window) return;
  if (!isTodoSyncEnvelope(e.data)) return;
  if (!e.data.cmd) return;
  port.postMessage(e.data);
});

port.onMessage.addListener((msg) => {
  if (!isTodoSyncEnvelope(msg)) return;
  if (!msg.evt) return;
  window.postMessage(msg, "*");
});
