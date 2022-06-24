const express = require('express')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 3001
const DB_URL = `mongodb+srv://user:user@cluster0.kvsae.mongodb.net/?retryWrites=true&w=majority`

const app = express()
const jsonParser = express.json()


async function startApp() {
  try {
      await mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true})
      app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT))
  } catch (e) {
      console.log(e)
  }
}

startApp()


const userSchema = mongoose.Schema({
      CardNumber: Number,
      ExpDate: Number,
      Cvv: Number,
      Amount: Number
})

const User = mongoose.model('User', userSchema)


app.post("/api", jsonParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)

  const user = new User({
    CardNumber: req.body.CardNumber,
    ExpDate: req.body.ExpDate,
    Cvv: req.body.ExpDate,
    Amount: req.body.Amount,
  })
  user.save((err, result) => {
    if (err) {
      console.log('err', err)
    }
    res.send({ RequestId: result.insertedId, Amount: user.Amount })
  })
})
  