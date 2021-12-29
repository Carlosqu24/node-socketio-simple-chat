const socket = io();

const $message = document.querySelector('#message')
const $usernameInput = document.querySelector('#username-input')
const $messageInput = document.querySelector('#message-input')
const $sendButton = document.querySelector('#send-message')
const $output = document.querySelector('#output')
const $actions = document.querySelector('#actions')


$sendButton.addEventListener('click', e => {
      const newMessage = { 
            username: $usernameInput.value, 
            message: $messageInput.value
      };

      socket.emit('chat:message', newMessage);
});

$messageInput.addEventListener('keypress', e => {
      console.log("asd")

      socket.emit('chat:typing', $usernameInput.value)
})

socket.on('chat:message', function(data) {
      $actions.innerHTML = ''
      // console.log(data)
      $output.innerHTML += `
            <p class="message">${data.username}: ${data.message}</p>
      `
});

socket.on('chat:typing', username => {
      $actions.innerHTML += `
            <p>${username} is typing...</p>
      `
})