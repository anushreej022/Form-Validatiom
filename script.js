
    var inputForm = document.getElementById("myForm");

    //set default value to dropdown
    document.getElementById("drinks").selectedIndex = 0;

    inputForm.addEventListener("submit", formSubmit);

    //boolean variables to check if fields are valid or not
    var validFirstName = false;
    var validLastName = false;
    var validEmail = false;
    var validPhone = false;
    var validZipCode = false;
    var validTitle = false;
    var validHear = false;
    var validComment = false;
    var validStreetAdd = false;
    var validState = false;
    var validCity = false;
    var validDrink = false;
    var validCustom = false;

    var allChkBox = document.getElementsByName("title");

    var hear = document.getElementsByName("source");

    var comments = document.getElementById("comments");

    var firstName = document.getElementById("firstName");
    firstName.addEventListener("input", validateFields);

    var lastName = document.getElementById("lastName");
    lastName.addEventListener("input", validateFields);

    var email = document.getElementById("emailId");
    email.addEventListener("input", validateFields);

    var phoneNumber = document.getElementById("phoneNumber");
    phoneNumber.addEventListener("input", validateFields);

    var state = document.getElementById("state");
    state.addEventListener("input", validateFields);

    var city = document.getElementById("city");
    city.addEventListener("input", validateFields);

    var zipCode = document.getElementById("zipcode");
    zipCode.addEventListener("input", validateFields);

    var drinks = document.getElementById("drinks");
    drinks.addEventListener("change", createNewElement);

    var newSpace = document.getElementById("newSpace");

    //regex for different fields
    var regExName = /^[a-zA-Z]+$/;
    var regExEmail = /([\w\.]+)@northeastern\.edu$/;
    var regExPhone = /\d{3}-?\d{3}-\d{4}$/;
    var regExZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
    var regExState = /^[a-zA-Z]+$/;
    var regExCity = /^[a-zA-Z]+$/;

    //function to validate all fields
    function validateFields(field) {
        var value = field.target.value;
        var fieldType = this.id;
        var errorFieldName = "error_" + fieldType;

        switch (fieldType) {
            case "firstName":
                if (!value.trim().match(regExName)) {
                    document.getElementById(errorFieldName).style.display = "block";
                    this.style.border = "2px solid red";
                    validFirstName = false;
                }
                else {
                    document.getElementById(errorFieldName).style.display = "none";
                    this.style.border = "";
                    validFirstName = true;
                }
                break;
            case "lastName":
                if (!value.trim().match(regExName)) {
                    document.getElementById(errorFieldName).style.display = "block";
                    this.style.border = "2px solid red";
                    validLastName = false;
                }
                else {
                    document.getElementById(errorFieldName).style.display = "none";
                    this.style.border = "";
                    validLastName = true;
                }
                break;
            case "emailId":
                if (!value.trim().match(regExEmail)) {
                    document.getElementById(errorFieldName).style.display = "block";
                    this.style.border = "2px solid red";
                    validEmail = false;
                }
                else {
                    document.getElementById(errorFieldName).style.display = "none";
                    this.style.border = "";
                    validEmail = true;
                }
                break;
            case "phoneNumber":
                if (!value.trim().match(regExPhone)) {
                    document.getElementById(errorFieldName).style.display = "block";
                    this.style.border = "2px solid red";
                    validPhone = false;
                }
                else {
                    document.getElementById(errorFieldName).style.display = "none";
                    this.style.border = "";
                    validPhone = true;
                }
                break;
            case "zipcode":
                if (!value.trim().match(regExZip)) {
                    document.getElementById(errorFieldName).style.display = "block";
                    this.style.border = "2px solid red";
                    validZipCode = false;
                }
                else {
                    document.getElementById(errorFieldName).style.display = "none";
                    this.style.border = "";
                    validZipCode = true;
                }
                break;
            case "state":
                if (!value.trim().match(regExState)) {
                    document.getElementById(errorFieldName).style.display = "block";
                    this.style.border = "2px solid red";
                    validState = false;
                }
                else {
                    document.getElementById(errorFieldName).style.display = "none";
                    this.style.border = "";
                    validState = true;
                }
                break;
            case "city":
                if (!value.trim().match(regExCity)) {
                    document.getElementById(errorFieldName).style.display = "block";
                    this.style.border = "2px solid red";
                    validCity = false;
                }
                else {
                    document.getElementById(errorFieldName).style.display = "none";
                    this.style.border = "";
                    validCity = true;
                }
                break;
        }
    }

    //function to create new element (checkbox & text field)
    function createNewElement() {
        var txtForField;
        var chckElement = document.getElementById('checkbox1');

        //check if checkbox is already there or not, if not create new checkbox
        if (chckElement == null) {

            var newElement = document.createElement('input');
            if (drinks.value == "Iced Tea") {
                txtForField = " Normal ($1.5 extra) ";
            }
            else if (drinks.value = "Latte") {
                txtForField = " Grande ($2 extra) ";
            }
            else if (drinks.value = "Cappuccino") {
                txtForField = " Venti ($2.5 extra) ";
            }
            //label for checkbox
            var txt = document.createElement('label');
            txt.htmlFor = "checkbox1";
            txt.id = "newCheck";
            txt.appendChild(document.createTextNode(txtForField));
            newSpace.appendChild(txt);
            newElement.setAttribute('type', 'checkbox');
            newElement.setAttribute('id', 'checkbox1');
            newElement.setAttribute('name', 'checkbox1');
            newElement.setAttribute('value', txtForField);
            newSpace.appendChild(newElement);
            //add event listener to check if checkbox is clicked or not, if clicked create new text box or delete existing one
            newElement.addEventListener("change", checkClick);
            function checkClick() {
                if (this.checked) {
                    var chckTextField = document.getElementById('newField');
                    //check if text field already exists or not
                    if (chckTextField == null) {
                        var newBr = document.createElement('br');
                        newSpace.appendChild(newBr);
                        newBr = document.createElement('br');
                        newSpace.appendChild(newBr);
                        var newTextField = document.createElement('input');
                        newTextField.setAttribute('name', 'newField');
                        newTextField.setAttribute('id', 'newField');
                        newTextField.setAttribute('placeholder', 'Enter some value');
                        var chckLbl = document.getElementById('newLbl');
                        if(chckLbl == null) {
                            var newLbl = document.createElement('label');
                            newLbl.htmlFor = 'newField';
                            newLbl.id = 'newLbl';
                            newLbl.appendChild(document.createTextNode("Customisations*"))
                            newSpace.appendChild(newLbl);
                        }
                        //append new text field to div
                        newSpace.appendChild(newTextField);
                    }
                }
                else {
                    //text field already exists, delete text field from div
                    var existingTextField = document.getElementById('newField');
                    var newLbl = document.getElementById('newLbl');
                    var newBreak = document.querySelectorAll('#newSpace br');
                    newSpace.removeChild(newBreak[0]);
                    newSpace.removeChild(newBreak[1]);
                    newSpace.removeChild(existingTextField);
                    newSpace.removeChild(newLbl);
                }
            }

            newSpace.appendChild(txt);
        }
        //checkbox already present, change text based on selection of drink
        else {
            var newChckBox = document.getElementById('checkbox1');
            var newLbl = document.getElementById('newCheck');
            if (drinks.value == "Latte") {
                newLbl.innerHTML = " Grande ($2 extra) ";
                newChckBox.nodeValue = " Grande ($2 extra) ";
            }
            else if (drinks.value == "Cappuccino") {
                newLbl.innerHTML = " Venti ($2.5 extra) ";
                newChckBox.nodeValue = " Grande ($2 extra) ";
            }
            else if (drinks.value == "Iced Tea") {
                newLbl.innerHTML = " Normal ($1.5 extra) ";
                newChckBox.nodeValue = " Grande ($2 extra) ";
            }
        }
    }


    //function for submit form
    function formSubmit(e) {
        e.preventDefault();

        var fName = document.getElementById("firstName");
        var lName = document.getElementById("lastName");
        var em = document.getElementById("emailId");
        var mob = document.getElementById("phoneNumber");
        var add1 = document.getElementById("streetAddress1");
        var add2 = document.getElementById("streetAddress2");
        var city = document.getElementById("city");
        var state = document.getElementById("state");
        var zip = document.getElementById("zipcode");
        var comment = document.getElementById("comments");
        var extraSize = "No Size Preference"; //var for checkbox text
        var extraCustomisation = "No Extra Customisation"; //var for text field extra customisation

        //default values
        validStreetAdd = false;
        validTItle = false;
        validComment = false;
        validDrink = false;
        validHear = false;
        validCustom = false;

        //check if address is blank
        if(add1.value.trim() == ""){
            document.getElementById('error_streetAddress1').style.display = "block";
            validStreetAdd = false;
        }
        else {
            document.getElementById('error_streetAddress1').style.display = "none";
            validStreetAdd = true;
        }

        //check if title is selected or not
        for (var isSelect in allChkBox) {
            if (allChkBox[isSelect].checked)
                validTitle = true;
        }
        //if title is not selected display error
        if(validTitle != true) {
            document.getElementById('error_radioTitle').style.display = "block";
        }

        else {
            document.getElementById('error_radioTitle').style.display = "none";
        }

        if(drinks[0].selected) {
            document.getElementById('error_drinks').style.display = "block";
            validDrink = false;
        }

        else {
            validDrink = true;
            document.getElementById('error_drinks').style.display = "none";
        }

        //check if any checkbox of how did u hear is selected or not
        for (var isSelect in hear) {
            if (hear[isSelect].checked) {
                validHear = true;
                break;
            }
        }


        //if comments text area contains text
        if(!(comment.value.trim().length < 1))
            validComment = true;

        //check to see if input box is selected or not
        var extras = document.getElementById("checkbox1");
        var lblTxt = document.getElementById("newCheck");
        if(extras != null) {
            if (extras.checked) {
                var txtField = document.getElementById('newField');
                if (txtField.value.trim() == "") {
                    alert("Enter some customisation or deselect extra customisation!!");
                    validCustom = false;
                } else {
                    extraSize = lblTxt.textContent;
                    extraCustomisation = txtField.value;
                    validCustom = true;
                }
            } else {
                validCustom = true;
            }
        }

        if (validFirstName && validLastName && validEmail && validPhone && validZipCode && validTitle && validHear
                && validComment && validStreetAdd && validState && validCity && validDrink && validCustom) {
            alert("data is saved succesfully");

            var title;
            var extras = document.getElementById("checkbox1");
            var lbl = document.getElementById("newCheck");
            var size;
            var side;
            var newField = document.getElementById("newField");
            var refer = document.getElementsByName("source");
            var ref = "";


            //get radio button title
            if (allChkBox[0].checked)
                title = allChkBox[0].value;
            else if (allChkBox[1].checked)
                title = allChkBox[1].value;
            else if (allChkBox[2].checked)
                title = allChkBox[2].value;

            //get selected drink text
            var selectedText;
            if (drinks[1].selected)
                selectedText = drinks[1].text;
            else if (drinks[2].selected)
                selectedText = drinks[2].text;
            else if (drinks[3].selected)
                selectedText = drinks[3].text;

            console.log("Drink selected : " + selectedText);
            console.log(drinks[1].selected);
            console.log(drinks[2].selected);
            console.log(drinks[3].selected);

                //get table from html div
                var dataTable = document.getElementById('dataTable');

                //add form data to table
                var newTr = document.createElement('tr');
                var newTd = document.createElement('td');
                newTd.appendChild(document.createTextNode(title));
                newTr.appendChild(newTd);

                newTd = document.createElement('td');
                newTd.appendChild(document.createTextNode(fName.value));
                newTr.appendChild(newTd);

                newTd = document.createElement('td');
                newTd.appendChild(document.createTextNode(lName.value));
                newTr.appendChild(newTd);

                newTd = document.createElement('td');
                newTd.appendChild(document.createTextNode(em.value));
                newTr.appendChild(newTd);

                newTd = document.createElement('td');
                newTd.appendChild(document.createTextNode(mob.value));
                newTr.appendChild(newTd);

                newTd = document.createElement('td');
                newTd.appendChild(document.createTextNode(add1.value));
                newTr.appendChild(newTd);

                newTd = document.createElement('td');
                newTd.appendChild(document.createTextNode(add2.value));
                newTr.appendChild(newTd);

                newTd = document.createElement('td');
                newTd.appendChild(document.createTextNode(city.value));
                newTr.appendChild(newTd);

                newTd = document.createElement('td');
                newTd.appendChild(document.createTextNode(state.value));
                newTr.appendChild(newTd);

                newTd = document.createElement('td');
                newTd.appendChild(document.createTextNode(zip.value));
                newTr.appendChild(newTd);

                newTd = document.createElement('td');
                newTd.appendChild(document.createTextNode(selectedText));
                newTr.appendChild(newTd);

                newTd = document.createElement('td');
                newTd.appendChild(document.createTextNode(extraSize));
                newTr.appendChild(newTd);

                newTd = document.createElement('td');
                newTd.appendChild(document.createTextNode(extraCustomisation));
                newTr.appendChild(newTd);


                if (refer[0].checked)
                    ref += " " + refer[0].value;
                if (refer[1].checked)
                    ref += " " + refer[1].value;
                if (refer[2].checked)
                    ref += " " + refer[2].value;

                newTd = document.createElement('td');
                newTd.appendChild(document.createTextNode(ref));
                newTr.appendChild(newTd);

                newTd = document.createElement('td');
                newTd.appendChild(document.createTextNode(comment.value));
                newTr.appendChild(newTd);

                dataTable.appendChild(newTr);
                var newDiv = document.getElementById('submitTable');
                newDiv.appendChild(dataTable);

                var newDiv = document.getElementById('newSpace');
                var chck = document.getElementById("checkbox1");
                var txt = document.getElementById("newField");
                var remCheck = document.getElementById("newCheck");
                console.log(remCheck);
                var newLbl = document.getElementById('newLbl');
                var newBreak = document.querySelectorAll('#newSpace br');
                newDiv.removeChild(chck);
                if(txt != null)
                    newDiv.removeChild(txt);
                newDiv.removeChild(remCheck);
                if(newLbl != null)
                    newDiv.removeChild(newLbl);
                if(newBreak.length != 0) {
                    newDiv.removeChild(newBreak[0]);
                    newDiv.removeChild(newBreak[1]);
                }
                inputForm.reset();

        }
        else {
            alert("Please enter all the mandatory field");
        }
    }

