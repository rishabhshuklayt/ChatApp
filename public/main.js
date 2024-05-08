const socket = io()

const clientTotal = document.getElementById('clients-total')
// -------------------

var username = prompt("Enter username to continue")
if (username === null || username === "") {
    alert("Username cannot be empty. Please enter a valid username.");
} else {
    alert("Hello, " + username + "!");
}



const messageContainer = document.getElementById('chatbox')
// const username = document.getElementById('')
const messageForm = document.getElementById('message-form')
const messageInput = document.getElementById('inputbox')
    
    socket.on("clients-total", (data)=>{
        clientTotal.innerText = `Send || Total users.. ${data}`
    })

    messageForm.addEventListener("submit" ,(e)=>{
        e.preventDefault()
        // inputbox.value = '';
        inputbox.focus();

        sendMessage()
    })

    function sendMessage(){
        console.log(messageInput.value)
        const data = {
            name: username,
            message: messageInput.value,
            dateTime: new Date()
        }
        socket.emit('message', data)
        addMessageToUI(true, data)
        messageInput.value =''
    }

    socket.on("chat-message", (data)=>{
        console.log(data)
        addMessageToUI(false , data)
    })

    // function addMessageToUI(isOwnMessage, data){
    //     const element = ` <li class="${isOwnMessage ? "incoming" : "outgoing" }">
    //     <span class="material-symbols-outlined"></span>
    //     <p>${isOwnMessage ? "you" : data.name}:${data.message}</p>
    // </li>`

  

    
    function addMessageToUI(isOwnMessage, data){
        //  const formattedDateTime = moment(data.dateTime).format('HH:mm');
        const element = `<div class="${isOwnMessage ? "user" : "chatbot" }">
        <sub class="">🔔${data.name } || ${moment(data.dateTime).fromNow()}</sub>
        <p class="message">${data.message}</p>
    </div>`
    
        messageContainer.innerHTML += element 

        messageContainer.scrollTop = messageContainer.scrollHeight;
        

    }