import type { EntityCollection, GroupEntity } from './types'

import { fetchGroupById, storeParticipant, storeParticipantsGuesses } from './entities/groups'

const initialEntityCollection = {
    id: [],
    entities: {},
}

export type {
    EntityCollection,
    GroupEntity,
}

export {
    initialEntityCollection,
    fetchGroupById,
    storeParticipant,
    storeParticipantsGuesses
}
