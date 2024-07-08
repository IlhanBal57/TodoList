//Tüm Elementleri Seçmek

const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const filterInput = document.querySelector("#todoSearch");



runEvents();

function runEvents() {
    form.addEventListener("submit", addTodo);
    secondCardBody.addEventListener("click",deleteTodos);
    clearButton.addEventListener("click",deleteAll);
    filterInput.addEventListener("keyup",filter);
}


function addTodo(e) {
    const inputText = addInput.value.trim();
    if (inputText == null || inputText == "") {
        showAlert("warning", "Lütfen boş bırakmayınız!")
    } else {
        addTodoToUI(inputText);
        showAlert("success", "Todo Eklendi")
    }

    
    

    e.preventDefault();
}

function addTodoToUI(newTodo) {
    /*
<li class="list-group-item d-flex justify-content-between">Todo 1
                            <a href="#" class="delete-item">
                                <i class="fa fa-remove"></i>
                            </a>
                        </li>
                        */
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";
    li.textContent = newTodo;

    const a = document.createElement("a");
    a.href = "#";
    a.className = "delete-item";

    const i = document.createElement("i");
    i.className = "fa fa-remove";

    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);

    addInput.value = "";
}


function showAlert(type, message) {
    const div = document.createElement("div");
    div.className = `alert alert-${type}`;
    div.textContent = message;
    firstCardBody.appendChild(div);

    setTimeout(function () {
        div.remove();
    }, 2000);
}


function deleteTodos(e){
    if(e.target.className=="fa fa-remove"){
        const todo = e.target.parentElement.parentElement;
        todo.remove();
        showAlert("dark","Todo Silindi.")
    }
}

function deleteAll(){
    const todoListesi = document.querySelectorAll(".list-group-item");
    if(todoListesi.length>0){
        todoListesi.forEach(function(todo){
            todo.remove();
             });
             showAlert("success","Tüm Todolar temizlendi")
    }else{
        showAlert("warning","Todo silmek için en az bir Todo olmalıdır")
    }
}


function filter(e){
    const filterValue = e.target.value.toLowerCase().trim();   //kullanıcın girdiği veriyi aldık , küçük harf yaptık , boşlukları sildik
    const todoListesi = document.querySelectorAll(".list-group-item");  // varolan todoları yakaladık. 

    if(todoListesi.length>0){            // varolan todo varsa işleme aldık.
        todoListesi.forEach(function(todo){    // bütün todoların üstünde döndük
            if(todo.textContent.toLowerCase().trim().includes(filterValue)){      // eğer todoların içindeki content kullanıcının girdiği değeri içeriyorsa dedik
                todo.setAttribute("style","display : block");   // displayi gösterdik
            }else{
                todo.setAttribute("style", "display : none !important");   // değilse displayi none dedik ama boostrapden ötürü important yaptık.. bunu zorunlu kıldık...
            }
        })
    }
}