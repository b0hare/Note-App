function profileController(req, res) {
    res.send(`Welcome ${req.session.userName}`);
}

export default profileController