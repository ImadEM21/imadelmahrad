import Id from "../Id";
import buildMakeProject from "./project";
import buildMakeSource from "./source";
import ipRegex from "ip-regex";
import sanitizeHtml from "sanitize-html";
import urlExist from "url-exist";

const makeSource = buildMakeSource({ isValidIp });
const makeProject = buildMakeProject({ Id, sanitize, urlExist, makeSource });

export default makeProject;

function isValidIp(ip: string) {
  return ipRegex({ exact: true }).test(ip);
}

function sanitize(text: string) {
  // TODO: allow more coding embeds
  return sanitizeHtml(text, {
    allowedIframeHostnames: ["codesandbox.io", "repl.it"],
  });
}
