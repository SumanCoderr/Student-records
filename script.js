let selectedRow = null;
let index;
let data = [];
let body = document.querySelector("body");
let p = document.createElement("p");
let letter = /^[a-zA-Z]*$/
let table = document.querySelector("table")
let records = document.querySelector(".records")
body.addEventListener("load", onload());





// load webpage
function onload() {
  data = JSON.parse(localStorage.getItem("studentDetails")) || [];
  for (let i = 0; i < data.length; i++) {
    let tbody = document.querySelector("#body");
    let row = document.createElement("tr");
    
    let td1 = document.createElement("td");
    td1.innerHTML = data[i].name;
    
    let td2 = document.createElement("td");
    td2.innerHTML = data[i].id;
    
    let td3 = document.createElement("td");
    td3.innerHTML = data[i].email;
    
    let td4 = document.createElement("td");
    td4.innerHTML = data[i].contact;
    
    let td5 = document.createElement("td");
    let delet = document.createElement("button");
    delet.classList.add("del");
    delet.innerHTML = "Delete";

    // delete row at the time of loading
    delet.addEventListener("click", function del() {
      delet.parentElement.parentElement.remove();
    if(table.rows.length<9){
      records.style.removeProperty('overflow-y')
    }
      let updatedData = data.filter(
        (e) =>
          e.name !== delet.parentElement.parentElement.cells[0].innerHTML ||
        e.id !== delet.parentElement.parentElement.cells[1].innerHTML ||
        e.email !== delet.parentElement.parentElement.cells[2].innerHTML ||
        e.contact !== delet.parentElement.parentElement.cells[3].innerHTML
      );
      data = updatedData;
      addInLocalStorage(data);
    });
    
    let edit = document.createElement("button");
    edit.classList.add("edit");
    edit.innerHTML = "Edit";

    //edit existing row at the of loading
    edit.addEventListener("click", function edi() {
      selectedRow = edit.parentElement.parentElement;
      document.getElementById("name").value = selectedRow.cells[0].innerHTML;
      document.getElementById("id").value = selectedRow.cells[1].innerHTML;
      document.getElementById("email").value = selectedRow.cells[2].innerHTML;
      document.getElementById("contact").value = selectedRow.cells[3].innerHTML;
      
      for (let i = 0; i < data.length; i++) {
        if (
          data[i].name === selectedRow.cells[0].innerHTML &&
          data[i].id === selectedRow.cells[1].innerHTML &&
          data[i].email === selectedRow.cells[2].innerHTML &&
          data[i].contact === selectedRow.cells[3].innerHTML
        )
        index = i;
      }
    });
    td5.appendChild(delet);
    td5.appendChild(edit);
    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);
    row.appendChild(td4);
    row.appendChild(td5);
    tbody.appendChild(row);
    if(table.rows.length>8){
      records.style.cssText += "overflow-Y : scroll; scrollbar-width :thin " //add scrollbar
    }
  }
}

// validation on form
function validation(formData) {
  if (                              //when all the fields are empty
    formData.name === "" ||
    formData.id === "" ||
    formData.email === "" ||
    formData.contact === ""
  ) {
    alert("Please Fill All Fields");
    return false;
  }else if(!formData.name.match(letter)){ //name field contains number and special character
    alert("Name contains only alphabets")
  } else if (formData.id < 0 || formData.contact < 0) { // id and contact contain negative numbers 
    alert("Negative values are not valid");
    return false;
  } else if (formData.contact.length !== 10) {   //contact contain less or more than 10 digits
    alert("Contact should be 10 digits");
    return false;
  } else {
    return true;
  }
}

// submit data in table
function submiForm() {
  let formData = readData();
  data = JSON.parse(localStorage.getItem("studentDetails")) || []; 
  if (validation(formData)) {
    if (selectedRow == null) {  //to create new row
      data.push(formData);
      addInLocalStorage(data);
      createROw(formData);
    } else {      //to update existing row
      update(formData);
    }
  }
  emptyInput();
}

// Read form data
function readData() {
  let formData = {};
  formData["name"] = document.getElementById("name").value;
  formData["id"] = document.getElementById("id").value;
  formData["email"] = document.getElementById("email").value;
  formData["contact"] = document.getElementById("contact").value;
  return formData;
}

// add data[] in local storage
function addInLocalStorage(formData) {
  localStorage.setItem("studentDetails", JSON.stringify(formData));
}

// entry of a new student in the table 
function createROw(formData) {
  let tbody = document.querySelector("#body");
  let row = document.createElement("tr");
  let td1 = document.createElement("td");
  td1.innerHTML = formData.name;

  let td2 = document.createElement("td");
  td2.innerHTML = formData.id;

  let td3 = document.createElement("td");
  td3.innerHTML = formData.email;

  let td4 = document.createElement("td");
  td4.innerHTML = formData.contact;

  let td5 = document.createElement("td");
  var delet = document.createElement("button");
  delet.classList.add("del");

  delet.innerHTML = "Delete";

  // to delete existing row
  delet.addEventListener("click", function del() {
    delet.parentElement.parentElement.remove();
    if(table.rows.length<9){
      records.style.removeProperty('overflow-y') //add scrollbar in the table
    }
    let updatedData = data.filter(
      (e) =>
        e.name !== delet.parentElement.parentElement.cells[0].innerHTML ||
        e.id !== delet.parentElement.parentElement.cells[1].innerHTML ||
        e.email !== delet.parentElement.parentElement.cells[2].innerHTML ||
        e.contact !== delet.parentElement.parentElement.cells[3].innerHTML
    );
    data = updatedData; //update data[] after deleting the row
    addInLocalStorage(data);
    
  });
  let edit = document.createElement("button");
  edit.classList.add("edit");

  edit.innerHTML = "Edit";

  // to edit existing row 
  edit.addEventListener("click", function edi() {
    selectedRow = edit.parentElement.parentElement;
    document.getElementById("name").value = selectedRow.cells[0].innerHTML;
    document.getElementById("id").value = selectedRow.cells[1].innerHTML;
    document.getElementById("email").value = selectedRow.cells[2].innerHTML;
    document.getElementById("contact").value = selectedRow.cells[3].innerHTML;
    for (let i = 0; i < data.length; i++) {
      if (
        data[i].name === selectedRow.cells[0].innerHTML &&
        data[i].id === selectedRow.cells[1].innerHTML &&
        data[i].email === selectedRow.cells[2].innerHTML &&
        data[i].contact === selectedRow.cells[3].innerHTML
      ) {
        index = i;
      }
    }
  });

  td5.appendChild(delet);
  td5.appendChild(edit);
  row.appendChild(td1);
  row.appendChild(td2);
  row.appendChild(td3);
  row.appendChild(td4);
  row.appendChild(td5);
  tbody.appendChild(row);


  if(table.rows.length>8){
    records.style.cssText += "overflow-Y : scroll; scrollbar-width :thin " //to add scrollbar
  }
  
}

// empty all the inputbox when data is sent to the table
function emptyInput() {
  document.getElementById("name").value = "";
  document.getElementById("id").value = "";
  document.getElementById("email").value = "";
  document.getElementById("contact").value = "";
}

// update the existing row data
function update(formData) {
  selectedRow.cells[0].innerHTML = formData.name;
  selectedRow.cells[1].innerHTML = formData.id;
  selectedRow.cells[2].innerHTML = formData.email;
  selectedRow.cells[3].innerHTML = formData.contact;
  data[index].name = formData.name;
  data[index].id = formData.id;
  data[index].email = formData.email;
  data[index].contact = formData.contact;
  addInLocalStorage(data);
}
