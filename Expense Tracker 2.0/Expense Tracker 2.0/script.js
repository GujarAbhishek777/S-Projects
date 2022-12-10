var s = document.getElementById('abhi7');
s.addEventListener('click', save)

function save() {
    const examount = document.getElementById('examount').value;
    const Description = document.getElementById('Description').value;
    const Category = document.getElementById('Category').value;

    const obj = {
        examount: examount,
        Description: Description,
        Category: Category
    }

    axios.post("https://crudcrud.com/api/78f7e4b2cfdb4afc9b4ff1ca09cf9834/expenses", obj)
        .then((response) => {
            showNewUserOnScreen(response.data);
            console.log(response);

        }).catch((err) => {
            console.log(err);
        })
}

window.addEventListener("DOMContentLoaded", () => {

    axios.get("https://crudcrud.com/api/78f7e4b2cfdb4afc9b4ff1ca09cf9834/expenses")
        .then((res) => {
            console.log(res);
            for (var i = 0; i < res.data.length; i++) {
                showNewUserOnScreen(res.data[i]);
            }

        }).catch((err) => {
            console.log(err);

        })
})

function showNewUserOnScreen(user) {


    document.getElementById('examount').value = '';
    document.getElementById('Description').value = '';
    document.getElementById('Category').value = '';

    const parentNode = document.getElementById('listOfItems');
    const childHTML = `<li id="${user._id}"> ${user.examount} - ${user.Description} - ${user.Category}
                                <button id="abhi" onclick=deleteUser('${user._id}')> Delete</button>
                                <button id="abhi1" onclick=editUserDetails('${user.Description}','${user.examount}','${user.Category}','${user._id}')>Edit</button>

                             </li>`
    parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

function editUserDetails(Description, examount, Category, userId) {

    document.getElementById('Description').value = Description;
    document.getElementById('examount').value = examount;
    document.getElementById('Category').value = Category;

    deleteUser(userId)
}

function deleteUser(userId) {
    axios
        .delete(`https://crudcrud.com/api/78f7e4b2cfdb4afc9b4ff1ca09cf9834/expenses/${userId}`)
        .then((res) => {
            removeUserFromScreen(userId);
            console.log(userId);
        })
        .catch(err => console.error(err));
    removeUserFromScreen(userId);
}

function removeUserFromScreen(userId) {
    const parentNode = document.getElementById('listOfItems');
    const childNodeToBeDeleted = document.getElementById(userId);

    if (childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted)
    }
}
