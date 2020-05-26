$(document).ready(function () {
    // Getting content from Local storage
    let notesArray, count;

    // Refreshing the list
    function notesListRefresh() {
        if (localStorage.getItem('notes') != null) {
                notesArray = JSON.parse(localStorage.getItem('notes'));
                count = notesArray.length;
        } else {
            notesArray = [];
            count = 0;
        }

        $("#list").empty();

        for (let i = 0; i < notesArray.length; i++) {
            let name = notesArray[i].name, date = new Date(notesArray[i].date);

            let month = date.getMonth() + 1;
            let dateString = date.getDate() + "/" + month + "/" + date.getFullYear();

            let element = $('<li data-id="' + notesArray[i].id + '" data-name="' + notesArray[i].name + '">');

            element.append($('<div class="div-name">').text(name));
            element.append($('<div class="div-date">').text(dateString));

            $("#list").append(element);
            $("#list").append("<hr class='m-0'>");
        }
    }

    notesListRefresh();

    // Clicking on any item in the shows the edit option
    $("#list").on("click", "li", function () {
        let id = $(this).data("id"), content = "", name = $(this).data("name");
        $("#list li.selected").removeClass("selected");
        $(this).addClass("selected");

        for (let i = 0; i < notesArray.length; i++) {
            if (notesArray[i].id === id) {
                content = notesArray[i].content;
            }
        }

        $("#edit-name").val(name);
        $("#edit-content").val(content);

        $("#div-edit").removeClass("hide");
    });

    // Adding notes
    $("#add").on("click", function () {
        let name = $("#name").val(), content = $("#content").val(), date = new Date();

        if (name === "" || content === "") {
            alert("Don't leave anything empty!");
        } else {
            notesArray.push({
                id: count,
                name: name,
                content: content,
                date: date,
            });

            localStorage.setItem('notes', JSON.stringify(notesArray))

            showToast('Note added successfully!')
        }

        count++;

        $("#content").val("");
        $("#name").val("");

        notesListRefresh();
    });

    // Saving notes
    $("#save").on("click", function () {
        let id = $("#list li.selected").data("id"), name = $("#edit-name").val(), content = $("#edit-content").val();

        for (let i = 0; i < notesArray.length; i++) {
            if (notesArray[i].id === id) {
                notesArray[i].name = name;
                notesArray[i].content = content;
                break;
            }
        }

        localStorage.setItem('notes', JSON.stringify(notesArray))

        showToast('Note saved successfully!');

        notesListRefresh();

        $('#list li[data-id="' + id + '"]').addClass("selected");
    });

    // Cancelling the edit notes
    $("#cancel").on("click", function () {
        $("#div-edit").addClass("hide");
        $("#list li.selected").removeClass("selected");
    });

    // Removing a note
    $("#remove").on("click", function () {
        let id = $("#list li.selected").data("id");

        let r = confirm("Are you sure you want to remove this note?");
        if (r) {
            for (let i = 0; i < notesArray.length; i++) {
                if (notesArray[i].id === id) {
                    notesArray.splice(i, 1);
                    break;
                }
            }

            localStorage.setItem('notes', JSON.stringify(notesArray))

            showToast('Note removed successfully!');

            notesListRefresh();

            $("#div-edit").addClass("hide");
        }
    });

    // Removing all notes
    $("#clearAll").on("click", function() {
        localStorage.clear();

        notesListRefresh();

        showToast('Local Storage cleared successfully!');

        $("#div-edit").addClass("hide");
    });

    // Function to show toast
    function showToast(message) {
        $('.toast-body')[0].innerHTML = message;
        $('.toast').toast('show');
    }
});
