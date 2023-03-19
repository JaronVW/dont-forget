export const createUserNode =
  'CREATE (n:User {mongoId: $idParam, username: $usernameParam})';
export const getSharedNoteBlocks =
  'MATCH (n {mongoId: $idParam})-[r:sharedWith]->(c) RETURN c';
export const followUser =
  'MATCH (a:User {mongoId: $idParam}), (b:User {username: $usernameParam}) MERGE (a)-[r:follows]->(b) RETURN b';
export const getFollowing =
  'MATCH (a:User {mongoId: $idParam})-[r:follows]->(b) RETURN b';
export const shareNoteBlockWith =
  'MATCH (a:User {mongoId: $idParam}), (b:NoteBlock {name: $nbIdParam}) create (a)-[r:sharedWith]->(b) RETURN b';
export const getFollowersFollowing = `MATCH (u:User {mongoId: $idParam})-[:follows*2..4]->(user:User) WHERE NOT (u)-[:follows]->(user) AND user <>u return user`;
export const unfollowUser = `MATCH (a:User {mongoId: $idParam})-[r:follows]->(b:User {username: $usernameParam}) DELETE r`;
export const followsMe = `MATCH (a:User {mongoId: $idParam})<-[r:follows]-(b:User) RETURN b`;
export const followsMeRemove = `MATCH (a:User {mongoId: $idParam})<-[r:follows]-(b:User {username: $usernameParam}) DELETE r`;
export const deleteShared = 'MATCH (a:User {mongoId: $idParam})-[r:sharedWith]->(b:NoteBlock {name: $nbIdParam}) DELETE r'