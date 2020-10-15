const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messagefour = document.querySelector('#message-4')
const messagefive = document.querySelector('#message-5')
const messagesix = document.querySelector('#message-6')
const messageseven = document.querySelector('#message-7')
const messageeight = document.querySelector('#message-8')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    messageThree.textContent=''
    messagefour.textContent=''
    messagefive.textContent=''
    messagesix.textContent=''
    messageseven.textContent=''
    messageeight.textContent=''


    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.temperature
                messageThree.textContent=data.humidity
                messagefour.textContent=data.description
                messagefive.textContent=data.wind_speed
                messagesix.textContent=data.wind_dir
                messageseven.textContent=data.precip
                messageeight.textContent=data.address
                
            }
        })
    })
})
