const request=require('request')
const forecast=(lat,long,callback)=>{
    const url='https://api.darksky.net/forecast/724d7aae04f00958e7c253cc57497762/'+lat+','+long
    request({ url, json:true},(error,{body})=>{
        if(error) {
            callback('There are some problem in location findings',undefined)
        } else if(body.error) {
            console.log(lat,long)
            callback('Location doesnot exixts. Try another',undefined)
        } else {
            callback(undefined,body.daily.data[0].summary+' It is currently '+body.currently.temperature+' degree temp out there.')
        }
    })
}
module.exports=forecast