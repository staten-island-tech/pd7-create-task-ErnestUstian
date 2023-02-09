fetch("https://countryflagsapi.com/:filetype/:code").then(response => {
    response.json().then(data => {
        food = data.results
        display(food)
    })
})
