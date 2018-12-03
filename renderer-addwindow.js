const {ipcRenderer} = require('electron');

document.querySelector('form').addEventListener('submit', submitForm);

function submitForm(e){
    e.preventDefault();
    console.log('item add ipcRendered')
    const item = document.querySelector('#item').value;
    ipcRenderer.send('item:add', item);
}
