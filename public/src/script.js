var createAccountBtn = document.getElementById('create account')
var loginBtn = document.getElementById('login')
var modal = document.getElementById('myModal')
var submitBtn = document.getElementById('subbmit')


// createAccountBtn.addEventListener('click', function() {
//             app.get('/create', (req, res) => {
//                     res.render( // create account )
//                     })
//             })

loginBtn.addEventListener('click', () => {
    modal.style.display = "block"
    console.log('im here')
});
submitBtn.addEventListener('click', () => {
    modal.style.display = 'none'
});