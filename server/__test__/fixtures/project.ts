import cuid from "cuid";
import casual from "casual";
import { Project } from "../../src/interfaces";

const Id = Object.freeze({
  makeId: cuid,
  isValidId: cuid.isCuid,
});

export default function makeFakeProject(overrides: Object): Project {
  const project: Project = {
    id: Id.makeId(),
    title: casual.title,
    description: casual.description,
    published: true,
    repo: "https://github.com/ImadEM21/imadelmahrad-back.git",
    image:
      "https://raw.githubusercontent.com/ImadEM21/imadelmahrad-back/master/images/1608211730564131580013_228169928692560_7616803618203489004_n.png?token=GHSAT0AAAAAABTJIWECA7X2IAWZA72OUVQKYUOSKAQ",
    url: "https://imadelmahrad.com",
    source: {
      ip: casual.ip,
      referrer: casual.url,
      browser: casual.user_agent,
    },
    stack: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  return {
    ...project,
    ...overrides,
  };
}
