let socket = io();

$('#loginBox').show()
$('#chatBox').hide()

$('#btnStart').click(() => {
    socket.emit('login', {
        username: $('#inputUsername').val(),
        password: $('#inputPassword').val()
    })
})

socket.on('logged_in', () => {
    $('#loginBox').hide()
    $('#chatBox').show()
})

$('#btnSendMsg').click(() => {
    socket.emit('msg_send', {
        to: $('#inpToUser').val(),
        msg: $('#inpNewMsg').val()
    })
})

socket.on('msg_recvd', (data) => {
    $('#ulMsgs').append($('<li>').text(data.msg))
})

socket.on('login_failed', () => {
    window.alert("Username or password is invalid")
})