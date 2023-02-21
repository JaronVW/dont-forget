export const createUserNode =
  'CREATE (n:User {mongoId: $idParam, username: $usernameParam})';
export const getSharedNoteBlocks =
  'MATCH (n {mongoId: $idParam})-[r:shared]->(c) RETURN c';
export const followUser =
  'MATCH (a:User {mongoId: $idParam}), (b:User {username: $usernameParam}) MERGE (a)-[r:follows]->(b) RETURN r';
export const getFollowing =
  'MATCH (a:User {mongoId: $idParam})-[r:follows]->(b) RETURN b';
export const shareNoteBlockWith =
  'MATCH (n:User {mongoId: $idParam}) CREATE (n) -[r: shared]-> (p:NoteBlock {name: $nbIdParam});';
