import reducer from '../store/chat'

test('Should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(
        {
            lastUpdate: null,
            conversations: {}
        }
    )
})

