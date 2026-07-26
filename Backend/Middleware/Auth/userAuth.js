
const authUser = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).send("Not Authorized")
    }
    next()
}

export default authUser