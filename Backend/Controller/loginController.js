const email = "abc@gmail.com"
const password = "1234"

function loginControll(req, res) {
    if(req.body.email !== email){
        res.send("Register first!")
    }
    if(req.body.email === email && req.body.password !== password){
        res.send("Incorrect Credentials")
    }
    
    if(req.body.email === email && req.body.password === password){
        req.session.email = email
        res.send(`Welcome , ${req.body.user}`)
    }
    
}

export default loginControll