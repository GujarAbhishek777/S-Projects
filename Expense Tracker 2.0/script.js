 var s=document.getElementById('abhi7');
 s.addEventListener('click',saveToLocalStorage)


function saveToLocalStorage() {
    // preventDefault();
    const examount = document.getElementById('examount').value;
    const Description = document.getElementById('Description').value;
    const Category = document.getElementById('Category').value;

    // localStorage.setItem('name',name);
    // localStorage.setItem('email',email);
    // localStorage.setItem('phone ',phone);

    const obj = {
        examount: examount,
       Description:Description,
       Category:Category
    }

    axios.post("https://crudcrud.com/api/e747cf01588e47e6bbe6910c2d29cbc8/expenses", obj)
    .then((response) => {
        showNewUserOnScreen(response.data);
        console.log(response);

    }).catch((err) => {
        // document.body.innerHTML=document.body.innerHTML+"<h4>Something Went Wrong</h4>"
        console.log(err);

    })


    // the new functionality for the n no. of users
    // localStorage.setItem(Description, JSON.stringify(obj));
    // showNewUserOnScreen(obj);

}


window.addEventListener("DOMContentLoaded", () => {

    axios.get("https://crudcrud.com/api/e747cf01588e47e6bbe6910c2d29cbc8/expenses")
    .then((res) => {
        console.log(res);
        for (var i = 0; i < res.data.length; i++) {
            showNewUserOnScreen(res.data[i]);
        }

    }).catch((err) => {
        console.log(err);

    })
    // const localStorageObj = localStorage;
    // const localstoragekeys = Object.keys(localStorageObj)

    // for (var i = 0; i < localstoragekeys.length; i++) {
    //     const key = localstoragekeys[i]
    //     const userDetailsString = localStorageObj[key];
    //     const userDetailsObj = JSON.parse(userDetailsString);
    //     showNewUserOnScreen(userDetailsObj)
    // }
})

function showNewUserOnScreen(user) {


    document.getElementById('examount').value = '';
        document.getElementById('Description').value = '';
        document.getElementById('Category').value ='';



    // if(localStorage.getItem(user.Description) !== null){
    //         removeUserFromScreen(user.Description)
    //     }
    const parentNode = document.getElementById('listOfItems');
    const childHTML = `<li id="${user._id}"> ${user.examount} - ${user.Description} - ${user.Category}
                                <button id="abhi" onclick=deleteUser('${user._id}')> Delete Expense </button>
                                <button id="abhi1" onclick=editUserDetails('${user.Description}','${user.examount}','${user.Category}','${user._id}')>Edit Expense </button>

                             </li>`

    parentNode.innerHTML = parentNode.innerHTML + childHTML;
}



function editUserDetails(Description, examount,Category,userId) {

    document.getElementById('Description').value = Description;
    document.getElementById('examount').value = examount;
    document.getElementById('Category').value = Category;

    deleteUser(userId)
}


function deleteUser(userId) {
    console.log(userId)

    axios
    .delete(`https://crudcrud.com/api/e747cf01588e47e6bbe6910c2d29cbc8/expenses/${userId}`)
    .then((res) => {
        removeUserFromScreen(userId);
        console.log(userId);
    })
    .catch(err => console.error(err));
    // localStorage.removeItem(Description);
    removeUserFromScreen(userId);

}

function removeUserFromScreen(userId) {
    const parentNode = document.getElementById('listOfItems');
    const childNodeToBeDeleted = document.getElementById(userId);

    if(childNodeToBeDeleted) {
            parentNode.removeChild(childNodeToBeDeleted)
        }
}
