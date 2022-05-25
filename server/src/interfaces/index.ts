interface HttpResponse {
  headers: {
    "Content-Type": string;
    "Last-Modified": string;
  };
  statusCode: number;
  body: object;
}

interface Source {
  ip: string;
  referrer: string;
  browser: string;
}

interface FroozenSource {
  getIp: () => string;
  getBrowser: () => string;
  getReferrer: () => string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  published: boolean;
  image: string;
  source: Source;
  repo: string;
  createdAt: Date;
  updatedAt: Date;
  url: string;
  stack: [];
}
interface FroozenProject {
  getTitle: () => string;
  getDescription: () => string;
  getId: () => string;
  getImage: () => string;
  getUrl: () => string;
  getSource: () => Source;
  getRepo: () => string;
  getStack: () => [];
  isPublished: () => boolean;
  getCreatedAt: () => Date;
  getLastModified: () => Date;
  publish: () => void;
  unPublish: () => void;
}

export { HttpResponse, Project, FroozenProject, Source, FroozenSource };
