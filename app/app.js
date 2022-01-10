$(document).ready(function() {
    // app settings
    let edit = false;
  
    // check the availability of jquery
    console.log('jquery is working!');
    fetchTasks();
  
    $('#task-form').submit(e => {
      e.preventDefault();
      const postData = {
        name: $('#name').val(),
        id: $('#taskId').val()
      };
      const url = edit === false ? 'task-add.php' : 'task-edit.php';
      console.log(postData, url);
      $.post(url, postData, (response) => {
        console.log(response);
        $('#task-form').trigger('reset');
        fetchTasks();
      });
    });
  
    // Fetching Tasks
    function fetchTasks() {
      $.ajax({
        url: 'tasks-list.php',
        type: 'GET',
        success: function(response) {
          const tasks = JSON.parse(response);
          let template = '';
          tasks.forEach(task => {
            template += `
                    <tr taskId="${task.id}">
                    <td>${task.id}</td>
                    <td>
                    <a href="#" class="task-item">
                      ${task.name} 
                    </a>
                    </td>
                    <td>
                      <button class="task-delete btn btn-danger">
                       Delete 
                      </button>
                    </td>
                    </tr>
                  `
          });
          $('#tasks').html(template);
        }
      });
    }
  
    $(document).on('click', '.task-item', (e) => {
      const element = $(this)[0].activeElement.parentElement.parentElement;
      const id = $(element).attr('taskId');
      $.post('task-single.php', {id}, (response) => {
        const task = JSON.parse(response);
        $('#name').val(task.name);
        $('#taskId').val(task.id);
        edit = true;
      });
      e.preventDefault();
    });
  
    $(document).on('click', '.task-delete', (e) => {
      if(confirm('Are you sure you want to delete it?')) {
        const element = $(this)[0].activeElement.parentElement.parentElement;
        const id = $(element).attr('taskId');
        $.post('task-delete.php', {id}, (response) => {
          fetchTasks();
        });
      }
    });
  });