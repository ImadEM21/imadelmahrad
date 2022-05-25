import { Project, FroozenProject } from "../interfaces";

interface Injection {
  Id: {
    makeId: Function;
    isValidId: Function;
  };
  sanitize: Function;
  urlExist: Function;
  makeSource: Function;
}

export default function buildMakeProject({
  Id,
  sanitize,
  urlExist,
  makeSource,
}: Injection): Function {
  return async function makeProject({
    id = Id.makeId(),
    title,
    description,
    published,
    image,
    source,
    repo,
    createdAt = new Date(),
    updatedAt = new Date(),
    url,
    stack = [],
  }: Project): Promise<FroozenProject> {
    if (!Id.isValidId(id)) {
      throw new Error("Project must have a valid id.");
    }
    if (!title || title.length < 1) {
      throw new Error("Project title must have at least one character");
    }
    if (!description || description.length < 1) {
      throw new Error("Project description must have at least one character");
    }

    if (!source) {
      throw new Error("Project must have a source.");
    }

    let urlIsValid = await urlExist(url);
    if (!urlIsValid) {
      throw new Error("URL provided isn't valid");
    }

    let repoIsValid = await urlExist(repo);
    if (repoIsValid) {
      throw new Error("Repo url isn't valid");
    }

    let sanitizedTitle = sanitize(title).trim();
    if (!sanitizedTitle || sanitizedTitle.length < 1) {
      throw new Error("Title text is not usable");
    }

    let sanitizedDescription = sanitize(description).trim();
    if (!sanitizedDescription || sanitizedDescription.length < 1) {
      throw new Error("Description text is not usable");
    }

    let validSource = makeSource(source);

    return Object.freeze({
      getTitle: () => title,
      getDescription: () => description,
      getId: () => id,
      getImage: () => image,
      getUrl: () => url,
      getSource: () => validSource,
      getRepo: () => repo,
      getStack: () => stack,
      isPublished: () => published,
      getCreatedAt: () => createdAt,
      getLastModified: () => updatedAt,
      publish: () => {
        published = true;
      },
      unPublish: () => {
        published = false;
      },
    });
  };
}
