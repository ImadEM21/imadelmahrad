import makeFakeProject from "../../__test__/fixtures/project";
import makeProject from "./";
import { Project, FroozenProject, Source, FroozenSource } from "../interfaces";

describe("project", () => {
  it("must have a title", () => {
    const project: Project = makeFakeProject({ title: null });
    expect(async () => await makeProject(project)).toThrow(
      "Project title must have at least one character"
    );
  });

  it("must have an ID", () => {
    const noId: Project = makeFakeProject({ id: undefined });
    expect(async () => await makeProject(noId)).not.toThrow();
    const project: Project = makeFakeProject({ id: "invalid" });
    expect(async () => await makeProject(project)).toThrow(
      "Project must have a valid id."
    );
  });

  it("must have a description", () => {
    const project: Project = makeFakeProject({ description: null });
    expect(async () => await makeProject(project)).toThrow(
      "Project description must have at least one character"
    );
  });

  it("url must be valid", () => {
    const project: Project = makeFakeProject({ url: "noturl" });
    expect(async () => await makeProject(project)).toThrow(
      "URL provided isn't valid"
    );
  });

  it("repo must be valid url", () => {
    const project: Project = makeFakeProject({ url: "notrepo" });
    expect(async () => await makeProject(project)).toThrow(
      "Repo url isn't valid"
    );
  });

  it("title can be sanitized", async () => {
    const sane: FroozenProject = await makeProject({
      ...makeFakeProject({ title: "<p>This is ok</p>" }),
    });
    const insane: FroozenProject = await makeProject({
      ...makeFakeProject({
        title: "<script>This is not ok</script><p>but this is ok</p>",
      }),
    });
    const totallyInsane: Project = makeFakeProject({
      title: "<script>This is not ok</script>",
    });

    expect(sane.getTitle()).toBe("<p>This is ok</p>");
    expect(insane.getTitle()).toBe("<p>but this is ok</p>");
    expect(async () => await makeProject(totallyInsane)).toThrow(
      "Title text is not usable"
    );
  });

  it("description can be sanitized", async () => {
    const sane: FroozenProject = await makeProject({
      ...makeFakeProject({ description: "<p>This is ok</p>" }),
    });
    const insane: FroozenProject = await makeProject({
      ...makeFakeProject({
        description: "<script>This is not ok</script><p>but this is ok</p>",
      }),
    });
    const totallyInsane: Project = makeFakeProject({
      description: "<script>This is not ok</script>",
    });

    expect(sane.getTitle()).toBe("<p>This is ok</p>");
    expect(insane.getTitle()).toBe("<p>but this is ok</p>");
    expect(async () => await makeProject(totallyInsane)).toThrow(
      "Description text is not usable"
    );
  });

  it("can be published", async () => {
    const unPublished: Project = makeFakeProject({ published: false });
    const project: FroozenProject = await makeProject(unPublished);
    expect(project.isPublished).toBe(false);
    project.publish();
    expect(project.isPublished).toBe(true);
  });

  it("can be unpublished", async () => {
    const published: Project = makeFakeProject({ published: true });
    const project: FroozenProject = await makeProject(published);
    expect(project.isPublished).toBe(true);
    project.unPublish();
    expect(project).toBe(false);
  });

  it("can have source", () => {
    const noSource: Project = makeFakeProject({ source: undefined });
    expect(async () => await makeProject(noSource)).toThrow(
      "Project must have a source."
    );
  });

  it("can have source ip", () => {
    const noIp: Project = makeFakeProject({ source: { ip: undefined } });
    expect(async () => await makeProject(noIp)).toThrow(
      "Project source must contain an IP."
    );
  });

  it("can have source browser", () => {
    const project: Project = makeFakeProject({});
    expect(
      async () => await makeProject(project).getSource().getBrowser()
    ).toBe(project.source.browser);
  });

  it("can have source referrer", () => {
    const project: Project = makeFakeProject({});
    expect(
      async () => await makeProject(project).getSource().getReferrer()
    ).toBe(project.source.referrer);
  });
});
