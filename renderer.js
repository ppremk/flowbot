// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process

// In renderer process (web page).
const {ipcRenderer} = require('electron')

window.addEventListener("keyup", dealWithKeyboard, true);

function dealWithKeyboard(e) {
    if (e.keyCode == "65") {
        // alert("The 'a' key is pressed.");
        e.preventDefault()
        ipcRenderer.send('keyuptrigger-a')
    }
    if (e.keyCode == "67") {
        // alert("The 'c' key is pressed.");
        e.preventDefault()
        ipcRenderer.send('item:clear')
    }        
}

const ul = document.getElementById('courseSteps');
// const ul = document.querySelector('ul');

ipcRenderer.on('item:add', function(e, item){
  ul.className = 'list-group';
  const li = document.createElement('li');
  li.className = 'list-group-item';
  const itemText = document.createTextNode(item);
  li.appendChild(itemText);
  ul.appendChild(li);
});

ipcRenderer.on('item:clear', function(){
  ul.className = '';
  ul.innerHTML = '';
});

ul.addEventListener('dblclick', removeItem);
function removeItem(e){
  event.target.remove();
  if(ul.children.length == 0){
    ul.className = '';
  }
}