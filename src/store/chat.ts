import { createSlice } from '@reduxjs/toolkit'

import { Conversation } from '../types/conversation'
import { Message } from '../types/message'

interface StoreConversation extends Conversation {
    messages: Message[];
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        lastUpdate: null,
        conversations: <Record<number, StoreConversation>>{},
    },
    reducers: {
        loadConversation: (state, messages) => {
            if (undefined !== messages[0]) {
                state.conversations[Number(messages[0].payload.conversationId)].messages = messages.payload
            }
        },
        addMessageToConversation: (state, message) => {
            state.conversations[message.payload.conversationId].messages.push(message.payload)
            state.conversations[message.payload.conversationId].lastMessageTimestamp = message.payload.timestamp
        },
        addConversation: (state, conversation) => {
            state.conversations[Number(conversation.payload.id)] = conversation.payload
        },
        setConversations: (state, conversations) => {
            conversations.payload.map((c) => {
                const storeC = {
                    messages: [],
                    ...c
                }
                state.conversations[c.id] = storeC
            })
        },
        setChatLastUpdate: (state, lastUpdate) => {
            state.lastUpdate = lastUpdate.payload
        },
        removeConversation: (state, conversation) => {
            delete state.conversations[conversation.payload]
        },
        removeMessageFromConversation: (state, message) => {
            const conversationId = message.payload.conversationId;
            state.conversations[conversationId].messages = state.conversations[conversationId].messages.filter(
                (m) => message.payload.id !== m.id
            )
        },
    },
})

export const {
    addConversation,
    addMessageToConversation,
    loadConversation,
    setConversations,
    setChatLastUpdate,
    removeConversation,
    removeMessageFromConversation
} = chatSlice.actions

export default chatSlice.reducer