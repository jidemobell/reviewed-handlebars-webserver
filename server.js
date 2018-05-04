const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

//express uses views as def directory for templates
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')


app.use((req,res,next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append to server.log')
        }
    })
    next();
})

app.use(express.static(__dirname+'/public'))

// app.use((req, res, next) => {
//     res.render('maintenance.hbs')
// })

hbs.registerHelper('currentYear', ()=>{
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
})

app.get('/', (req,res)=>{
     // res.send('<h1>Hello Express</h1>');
    //  res.send({
    //      name: 'Jide',
    //      Likes: [
    //          'Football','Coding'
    //      ]
    //  })
    res.render('home.hbs' , {
        pageTitle: 'Home Page',
        welcomeMessage : 'Welcome to my homepage',
        
    })
})

app.get('/about', (req,res) => {
  //  res.send('About Page')
  res.render('about.hbs', {
          pageTitle: 'About Page',
         
  })     //to render templates
})

app.get('/bad', (req,res) => {
    res.send({
        errorMessage: 'Unable to fufill request'
    })
})

app.listen(3000, ()=>{
    console.log('Server running on port 3000')
});