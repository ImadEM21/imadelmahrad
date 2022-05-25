import Id from "../../Id";

export default function makeProjectsDb({ makeDb }: any) {
  return Object.freeze({
    findAll,
    findById,
    findByName,
    insert,
    remove,
    update,
  });

  async function findAll({ publishedOnly = true }: any) {
    const db = await makeDb();
    const query = publishedOnly ? { published: true } : {};
    const projects = await db.collection("projects").find(query);
    return (await result.toArray()).map(({ _id: id, ...found }) => ({
      id,
      ...found,
    }));
  }
}
