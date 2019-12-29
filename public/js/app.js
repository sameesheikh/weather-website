fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })
})

const weather_form=document.querySelector('form')
const search=document.querySelector('input')
const msg1=document.querySelector('#msg1')
const msg2=document.querySelector('#msg2')
weather_form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    console.log(location)
    msg1.textContent='Loading...'
    msg2.textContent=''
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error)
                msg1.textContent=data.error
            else {
                msg1.textContent=data.data
                msg2.textContent=data.location
            }
        })
    })
    // url='http://localhost:3000/weather?address='+location
    // request({ url, json:true },(error,response)=>{
    //     if(error) {

    //         console.log(response.body.error)
    //     } else {
    //         console.log(response.body)
    //     }
    // })
})