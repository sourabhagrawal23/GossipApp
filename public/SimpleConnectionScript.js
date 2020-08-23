let socket = io();


let btnSend = document.getElementById('btnSend')
let inpMsg = document.getElementById('inpMsg')
let ulMsgList = document.getElementById('ulMsgList')

btnSend.onclick = function () {
    socket.emit('msg_send', {
        msg: inpMsg.value
    })
    inpMsg.value = ''
}

socket.on('msg_rcvd', (data) => {
    let liNewMsg = document.createElement('li')
    liNewMsg.innerText = data.msg
    ulMsgList.appendChild(liNewMsg)
})
// let boomBtn = document.getElementById('boom')
// boomBtn.onclick = function () {
//     socket.emit('boom')
// }

// socket.on('whizz', () => {
//     let div = document.createElement('div')
//     div.innerText = 'whizz'
//     document.body.appendChild(div)
// })