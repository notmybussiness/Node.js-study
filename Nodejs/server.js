const express = require('express')
const app = express()

app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs')



const { MongoClient } = require('mongodb')

let db
const url = 'mongodb+srv://admin:qwe123@forum.8qdxb.mongodb.net/?retryWrites=true&w=majority&appName=forum'
new MongoClient(url).connect().then((client)=>{
  console.log('DB연결성공')
  db = client.db('forum')
  app.listen(8080, ()=>{
    console.log('http://localhost:8080 에서 서버 실행중')
})
}).catch((err)=>{
  console.log(err)
})



app.get('/', (요청, 응답) => {
    응답.sendFile(__dirname + '/index.html')
})

// app.get('/news', (요청, 응답) => {
//     응답.send('Today News~')
//     db.collection('post').insertOne({title: '어쩌구 쌸라샬라 테스트용'})
// })

app.get('/list', async (요청, 응답) => {
    let result = await db.collection('post').find().toArray()
    // 응답.send(result[1].content) 응답은 한번만
    응답.render('list.ejs', {글목록: result})
  })

app.get('/time', (요청, 응답) => {
  let nowtime = new Date()
  응답.render('time.ejs', {시간: nowtime})
})