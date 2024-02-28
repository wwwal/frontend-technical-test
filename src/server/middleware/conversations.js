const path = require('path')
const db = require(`${path.dirname(__filename)}/../db.json`)

// Need this middleware to catch some requests
// and return both conversations where userId is sender or recipient
module.exports = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (undefined === authorization) {
        res.status(401).json({ message: 'Unauthorized' })
        return
    }

    const token = authorization.split(' ')[1];
    const userId = db.users.find((user) => token === user.token)?.id;

    if (undefined === userId) {
        res.status(401).json({ message: 'Unknown token' })
        return
    }

    if (/conversations/.test(req.url) && req.method === 'GET') {
        const result = db?.conversations?.filter(
            conv => conv.senderId === userId || conv.recipientId === userId
        ).map((c) => {
            const otherUserId = userId === c.recipientId ? c.senderId : c.recipientId;
            const otherUserNickname = userId === c.recipientId ? c.senderNickname : c.recipientNickname;
            return {
                id: c.id,
                recipientId: otherUserId,
                recipientNickname: otherUserNickname,
                recipientOnline: Boolean(Math.random() < 0.5),
                lastMessageTimestamp: c.lastMessageTimestamp
            }
        });

        res.status(200).json(result)
        return
    }

    next()
}