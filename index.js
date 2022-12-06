const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./authRouter')
const path = require('path')
const exphbs = require('express-handlebars')
const PORT = process.env.PORT || 5000

const app = express()
const hbs = exphbs.create({
    defaultLayout: 'index',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({extended: true}))

app.use(express.static(path.join(__dirname, 'css')))

app.use(authRouter)


app.use(express.json())
app.use("/auth", authRouter)

const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://Cap:Oxfordinebrogi1@cluster0.5h3zbae.mongodb.net/forms'),
        {
            useNewUrlParser: true,
            useFindAndModify: false
            
        },
        app.listen(PORT, () => console.log(`Server has started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()