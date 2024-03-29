import { int } from 'neo4j-driver'
import { Node, Relationship } from 'neo4j-driver-core/lib/graph-types'
import { Result } from 'neo4j-driver-core/lib/result'

let _nodeId = 0
let _relationshipId = 0

// credit: https://github.com/adam-cowley/nest-neo4j

export const nodeId = () => {
    _nodeId++;
    return int(_nodeId)
}

export const mockNode = (labels: string | string[], properties: object = {}): Node => {
    return new Node(nodeId(), Array.isArray(labels) ? labels : [labels], properties)
}

export const mockRelationship = (type: string, properties: object, start?: Node, end?: Node): Relationship => {
    _relationshipId++;

    return new Relationship(
        int(_relationshipId),
        start instanceof Node ? start.identity : nodeId(),
        end instanceof Node ? end.identity :
            nodeId(), type, properties
    )
}

export const mockResult = (rows: object[]): Result => {
    return {
        records: rows.map(row => ({
            keys: Object.keys(row),
            // eslint-disable-next-line no-prototype-builtins
            get: (key: string) => row.hasOwnProperty(key) ? row[key] : null,
        }))
    }
}