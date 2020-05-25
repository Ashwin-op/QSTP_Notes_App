$(document).ready(function () {
    let notesArray = [], count = 0;

    // Refreshing the list
    function listRefresh() {
        $("#list").empty();

        for (let i = 0; i < notesArray.length; i++) {
            let name = notesArray[i].name, date = notesArray[i].date, dateString, month, element;

            month = date.getMonth() + 1;
            dateString = date.getDate() + "/" + month + "/" + date.getFullYear();

            element = $('<li data-id="' + notesArray[i].id + '" data-name="' + notesArray[i].name + '">');

            element.append($('<div class="div-name">').text(name));
            element.append($('<div class="div-date">').text(dateString));

            $("#list").append(element);
            $("#list").append("<hr class='m-0 bg-light'>");
        }
    }

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

            $('.toast-body')[0].innerHTML = 'Note added successfully!';
            $('.toast').toast('show');
        }

        count++;

        $("#content").val("");
        $("#name").val("");

        listRefresh();
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

        $('.toast-body')[0].innerHTML = 'Note saved successfully!';
        $('.toast').toast('show');

        listRefresh();

        $('#list li[data-id="' + id + '"]').addClass("selected");
    });

    // Cancelling the edit notes
    $("#cancel").on("click", function () {
        $("#div-edit").addClass("hide");
        $("#list li.selected").removeClass("selected");
    });

    // Removing notes
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

            $('.toast-body')[0].innerHTML = 'Note removed successfully!';
            $('.toast').toast('show');

            listRefresh();

            $("#div-edit").addClass("hide");
        }
    });
});
