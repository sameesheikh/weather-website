const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utilies/geocode')
const forecast=require('./utilies/forecast')
const app=express()
// console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__dirname,'../public'))

//Express path for express config
const dirpath=path.join(__dirname,'../public')
const viewpath=path.join(__dirname,'../templates/views')
const partialspath=path.join(__dirname,'../templates/partials')

//setup handlebars and views location
app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partialspath)

//setup static directory to serve
app.use(express.static(dirpath))

app.get('',(req,res)=>{
    res.render('index',{
        name:'samee',
        title:'Weather App'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        text:'help text',
        name:'samee',
        title:'Help Desk'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        name:'samee',
        title:'About Me'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address) {
        return res.send({
            error:'address should be provided.'
        })
    }
    geocode(req.query.address,(error,{ latitude,longitude,location }={})=>{
        if(error)
            return res.send({ error: error})
        forecast(latitude,longitude,(error,data)=>{
            if(error) 
                return res.send({ error: error})
            //console.log(data)
            res.send({
                data,
                location,
                address:req.query.address
            })
        })
    })
})
app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'404.',
        name:'samee',
        error:'help article not found.'
    })
})
app.get('*',(req,res)=>{
    res.render('error',{
        title:'404.',
        name:'samee',
        error:'page not found.'
    })
})
app.listen(3000,()=>{
    console.log('server starting up.')
})

