const express = require('express') 
const logger = require('morgan')
const errorhandler = require('errorhandler')
const bodyParser = require('body-parser')
const routes = require('./routes')

let store = {
  posts: [
    {name: 'Franklin D. Roosevelt',
    url: 'https://webapplog.com/es6',
    text: 'When you reach the end of your rope, tie a knot in it and hang on.',
    comments: [
      {text: 'When you reach the end of your rope, tie a knot in it and hang on.'},
      {text: 'There is nothing permanent except change.'},
      {text: 'Learning never exhausts the mind.'} 
    ]
  }
]
}


let app = express()

app.use(bodyParser.json())
app.use(logger('dev'))
app.use(errorhandler())
app.use((req, res, next) => {
  req.store = store
  next()
})

app.get('/posts', routes.posts.getPosts)
app.post('/posts', routes.posts.addPost)
app.put('/posts/:postId', routes.posts.updatePost)
app.delete('/posts/:postId', routes.posts.removePost)

app.get('/posts/:postId/comments', routes.comments.getComments)
app.post('/posts/:postId/comments', routes.comments.addComment)
app.put('/posts/:postId/comments/:commentId', routes.comments.updateComment)
app.delete('/posts/:postId/comments/:commentId', routes.comments.removeComment)


app.listen(3000)