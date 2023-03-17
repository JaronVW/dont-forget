export const createUserNode =
  'CREATE (n:User {mongoId: $idParam, username: $usernameParam})';
export const getSharedNoteBlocks =
  'MATCH (n {mongoId: $idParam})-[r:shared]->(c) RETURN c';
export const followUser =
  'MATCH (a:User {mongoId: $idParam}), (b:User {username: $usernameParam}) MERGE (a)-[r:follows]->(b) RETURN b';
export const getFollowing =
  'MATCH (a:User {mongoId: $idParam})-[r:follows]->(b) RETURN b';
export const shareNoteBlockWith =
  'MATCH (n:User {mongoId: $idParam}) CREATE (n) -[r: shared]-> (p:NoteBlock {name: $nbIdParam});';
export const getFollowersFollowing = `MATCH (u:User {mongoId: $idParam})-[:follows*2..4]->(user:User) WHERE NOT (u)-[:follows]->(user) AND user <>u return user`;
export const unfollowUser = `MATCH (a:User {mongoId: $idParam})-[r:follows]->(b:User {username: $usernameParam}) DELETE r`;