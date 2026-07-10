
const checkLogin = (req, res, next) => {
    if (!req.body.email) {
        res.send("please login")
    }
    else{
        next()
    }
}

export default checkLogin