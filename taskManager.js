$(document).ready(function () {
    $("#taskInput").keyup(function (event) {
        if (event.keyCode == 13) {
            $("#plus").click();
        }
    })
});

/*$(document).ready(function () {
var backgroundMap = new Map();
backgroundMap.set('cats/1.jpg', '#494b73');
backgroundMap.set('cats/2.jpg', '#5c65ad');
backgroundMap.set('cats/3.jpg', '#b3d0db');
backgroundMap.set('cats/4.jpg', '#9fbdd2');
backgroundMap.set('cats/5.jpg', '#a9cbdf');
backgroundMap.set('cats/6.jpg', '#a2a1fb');

var min = 1;
var max = 6;

var num = Math.random() * (max - min) + min;
num = 'cats/' + Math.round(num) + '.jpg';

document.getElementById('listWrapper').style.backgroundImage = 'url('+num+')';
document.getElementById('content').style.backgroundColor = backgroundMap.get(num);
});*/


$(document).ready(function () {
var min = 1;
var max = 7;

var num = Math.random() * (max - min) + min;
num = 'cars/' + Math.round(num) + '.jpg';

document.getElementById('listWrapper').style.backgroundImage = 'url('+num+')';
document.getElementById('content').style.backgroundColor = '#343433';
});





var completedTasks = [];
var tasks = [];

function setTasks() {
    if (document.getElementById('json').value != '') {
        tasks = JSON.parse(document.getElementById('json').value);
        updateListView();
    }
}

window.onload = function () {
    document.getElementById('plus').onclick = saveTask;
}

/////// ADD NEW TASK IN LIST TASKS, UPDATING HTML, SAVING IN LOCAL STORAGE ////////
function addToList(task) {

    tasks.push({
        name: task,
        done: false
    });

    updateListView();
}

/////// DELETE FROM LIST TASKS, UPDATING HTML, SAVING IN LOCAL STORAGE /////
function deleteFromList(e) {
    tasks.splice(e.target.parentElement.id, 1);
    updateListView();
}


/////// "PLUS" CLICK EVENT, CALL ADDTOLIST FUNCTION //////
function saveTask() {

    var itemValue = $('.new-todo').val();

    if (itemValue !== '') {

        addToList(itemValue);
    }

    $('.new-todo').val(null);

    $('.new-todo').focus();
}

/////// "REMOVE" CLICK EVENT, CALL "DELETEFROMLIST" FUNCTION ///////
$("#remove").click(function () {
    deleteFromList();
});


/////// UPDATING OF HTML //////
function updateListView() {

    var ul = document.getElementById('taskList');
    ul.innerHTML = '';

    if (tasks.length != 0) {
        tasks.forEach(function (task) {

            var li = document.createElement("li");
            li.className = "task";
            li.id = tasks.indexOf(task);

            var ch = document.createElement("input");
            ch.className = "toggle";
            ch.type = "checkbox";
            ch.onclick = toggleChecked;
            ch.id = tasks.indexOf(task);

            var label = document.createElement("label");
            label.className = "taskText";
            label.textContent = task.name;

            var span = document.createElement("span");
            span.className = "remove glyphicon glyphicon-remove";
            span.onclick = deleteFromList;

            li.appendChild(ch);
            li.appendChild(label);
            li.appendChild(span);

            ul.insertBefore(li, ul.firstChild);
            $('.new-todo').focus();

            document.getElementById('json').value = JSON.stringify(tasks);
        });
    } else {
        document.getElementById('json').value = '';
    }
    saveData();

}

function toggleChecked() {

    if ($(this).is(':checked')) {
        $(this).siblings('label').css('text-decoration', 'line-through');
    }
    else {
        $(this).siblings('label').css('text-decoration', 'none');
    }
    $('.new-todo').focus();
}

$(".toggle").on('click', toggleChecked);