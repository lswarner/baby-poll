import type { EntityCollection, GroupEntity } from './types'

import { fetchGroupById, fetchOrCreateParticipant, storeParticipantsGuesses } from './entities/groups'

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
    fetchOrCreateParticipant,
    storeParticipantsGuesses
}
