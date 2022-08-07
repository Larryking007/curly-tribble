const authRoutes= require('./authRoutes');
const {checkAuth} = require('../middleware/auth')
const initRoutes = app => {
    app.use('/auth', authRoutes);
    app.all("*", (req,res)=>{
        return res.status(404).send('Sorry, requested route not found')
    })

}

module.exports = initRoutes