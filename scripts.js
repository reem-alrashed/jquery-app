$(function () {
    var todos = [
      {
        task : 'Learn jQuery',
        isCompleted: false
      },
      {
        task:'take a nap',
        isCompleted:true
      }
  
    ];
    var app = {
      showTodos: () => {
        var todosListEl = $('#todos-list');
  
        todosListEl.html('');
        todos.forEach((todo) => {
          var taskClasses = 'todo-task' + (todo.isCompleted ? ' is-completed':'');
  
          todosListEl.append(`
            <tr>
              <td class="${taskClasses}">${todo.task}</td>
              <td>
                <button type="button" class="btn btn-secondary edit-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"></path>
                </svg>
               </button>
                <button type="button" class="btn btn-secondary delete-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
                </svg>
              </button>       
              <button type="button" class="btn btn-secondary save-button" style="display:none;">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-save" viewBox="0 0 16 16">

              <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"></path>

              </svg>
            </button>

            <button type="button" class="btn btn-secondary cancel-button" style="display:none;">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path>
                </svg>
              </button>
              </td>
            </tr>
            
            `);
        });
      },
  
      addTodo: function(event) {
        // prevent the page from refreshing
        event.preventDefault();
  
        let createInput = $('#create-input');
        let createInputValue = createInput.val();
        let error = null;

        if(!createInputValue){
          error = 'Please provide a task to add!';
        } else {
          todos.forEach(function(todo){
            if(todo.task === createInputValue){
              error = 'Task already added';
            }
          });
        }
        if(error){
          app.showError(error);
          return;
        }
  
        // Add input in the todos array
        todos.push({
          task: createInputValue,
          isCompleted: false
        });

        // Reset input
        createInput.val('');
        app.showTodos();
      },
  

      toggleTodo: function() {
        todos.forEach(function(todo) {
          if(todo.task === $(this).text()){
            todo.isCompleted = !todo.isCompleted;
          }
        }.bind(this));
        app.showTodos();
      },
  
      // Edit task 
      enterEditMode: function() {
        var actionCell = $(this).closest('td');
        var taskCell = actionCell.prev();
  
        // HIDE delete and edit, SHOW save and cancel
        actionCell.find('.save-button').show();
        actionCell.find('.cancel-button').show();
        actionCell.find('.edit-button').hide();
        actionCell.find('.delete-button').hide();
  
        taskCell.removeClass('todo-task');
        app.currentTask = taskCell.text();
        taskCell.html(`<input type="text" class="edit-input" value="${app.currentTask}" >`);
      },
  
      exitEditMode: function() {
        var actionCell = $(this).closest('td');
        var taskCell = actionCell.prev();
  
        actionCell.find('.save-button').hide();
        actionCell.find('.cancel-button').hide();
        actionCell.find('.edit-button').show();
        actionCell.find('.delete-button').show();
  
        taskCell.addClass('todo-task');
        taskCell.html(app.currentTask);
      },
  
      saveTask: function() {
        var newTask = $('.edit-input').val();
  
        todos.forEach(function(todo) {
          if(app.currentTask === todo.task){
            todo.task = newTask;
          }
        });
        app.currentTask = newTask;
        app.exitEditMode.call(this);
      },
  
      deleteTask : function() {
        var taskToDelete = $(this).parent('td').prev().text();
        var found=false;
        todos.forEach(function(todo,index){
          if(!found && taskToDelete === todo.task){
            todos.splice(index,1);
            found=true;
          }
        });
        app.showTodos();
      },
  
      showError: function(message){
        $('.error-message').html(message).slideDown();
      },
  
      clearError: function(){
        $('.error-message').fadeOut();
      }
    };
  
    $('#create-form button').css('background','blue');
    $('#create-form button').css({
      color:'yellow',
      borderRadius: '8px'
    });
  
    app.showTodos();
    $('table').on('click','.todo-task',app.toggleTodo);
    $('#create-form').on('submit',app.addTodo);
    $('#create-input').on('keyup',app.clearError);
    $('table').on('click','.edit-button',app.enterEditMode);
    $('table').on('click','.cancel-button',app.exitEditMode);
    $('table').on('click','.save-button',app.saveTask);
    $('table').on('click','.delete-button',app.deleteTask);
  });