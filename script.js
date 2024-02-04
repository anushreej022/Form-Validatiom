document.addEventListener('DOMContentLoaded', function () {
    var form = document.querySelector('form');
    var submitButton = document.getElementById('submitButton');

    // Disable the submit button initially
    submitButton.disabled = true;

    // Event listener for input fields to perform real-time validation
    form.addEventListener('input', function (event) {
        var inputElement = event.target;
        var fieldName = inputElement.id;
        var errorMessageId = 'error' + fieldName.charAt(0).toUpperCase() + fieldName.slice(1);

        // Remove any existing error message
        removeErrorMessage(errorMessageId);

        // Validate the input based on the field name
        switch (fieldName) {
            case 'title':
                validateTitle();
                break;
            case 'firstName':
                validateInput(inputElement, errorMessageId, [validateRequired, validateLength, validateAlphanumeric]);
                break;
            case 'lastName':
                validateInput(inputElement, errorMessageId, [validateRequired, validateLength, validateAlphanumeric]);
                break;
            case 'emailId':
                validateInput(inputElement, errorMessageId, [validateRequired, validateEmail, validateNUEmail]);
                break;
            case 'phoneNumber':
                validateInput(inputElement, errorMessageId, [validateRequired, validatePhoneNumber]);
                break;
            case 'zipcode':
                validateInput(inputElement, errorMessageId, [validateRequired, validateZipcode]);
                break;
            case 'source':
                validateHowDidYouHear();
                break;
            case 'comments':
                validateInput(inputElement, errorMessageId, [validateRequired, validateLength]);
                break;
        }

        // Enable the submit button if all validations pass
        submitButton.disabled = !isFormValid();
    });

    // Event listener for the submit button
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Create table row with form data
        var newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${getSelectedTitle()}</td>
            <td>${getValue('firstName')}</td>
            <td>${getValue('lastName')}</td>
            <td>${getValue('emailId')}</td>
            <td>${getValue('phoneNumber')}</td>
            <td>${getValue('zipcode')}</td>
            <td>${getSelectedSources()}</td>
            <td>${getValue('comments')}</td>
        `;

        // Append the new row to the result table body
        var resultBody = document.getElementById('resultBody');
        resultBody.appendChild(newRow);

        // Show the result table
        var resultTable = document.getElementById('resultTable');
        resultTable.style.display = 'table';

        // Clear form fields
        form.reset();

        // Disable the submit button after submission
        submitButton.disabled = true;
    });

    function validateInput(input, errorMessageId, validationFunctions) {
        var isValid = true;

        for (var i = 0; i < validationFunctions.length; i++) {
            if (!validationFunctions[i](input)) {
                isValid = false;
                showErrorMessage(errorMessageId, input, validationFunctions[i]);
                break;
            }
        }

        // Add a class to mark invalid fields
        if (!isValid) {
            input.classList.add('invalid');
        } else {
            input.classList.remove('invalid');
        }
    }

    function validateRequired(input) {
        return input.value.trim() !== '';
    }

    function validateLength(input) {
        var minLength = parseInt(input.getAttribute('data-min-length')) || 0;
        var maxLength = parseInt(input.getAttribute('data-max-length')) || Infinity;
        var value = input.value.trim();
        return value.length >= minLength && value.length <= maxLength;
    }

    function validateEmail(input) {
        // Basic email validation
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(input.value);
    }

    function validatePhoneNumber(input) {
        // Phone number validation without dashes and requiring a length of 10 digits
        var phoneRegex = /^\d{10}$/;
        return phoneRegex.test(input.value);
    }

    function validateZipcode(input) {
        // Basic zipcode validation (xxxxx)
        var zipRegex = /^\d{5}$/;
        return zipRegex.test(input.value);
    }

    function validateAlphanumeric(input) {
        var alphanumericRegex = /^[a-zA-Z0-9]*$/;
        return alphanumericRegex.test(input.value);
    }

    function validateNUEmail(input) {
        // Northeastern University email validation
        var nueRegex = /^[^\s@]+@northeastern\.edu$/;
        return nueRegex.test(input.value);
    }

    function showErrorMessage(errorMessageId, input, validationFunction) {
        // Create a div for the error message
        var errorMessageDiv = document.getElementById(errorMessageId);
        if (!errorMessageDiv) {
            errorMessageDiv = document.createElement('div');
            errorMessageDiv.className = 'error-message';
            errorMessageDiv.id = errorMessageId;
            input.parentNode.insertBefore(errorMessageDiv, input.nextSibling);
        }

        errorMessageDiv.textContent = validationFunction(input);
    }

    function removeErrorMessage(errorMessageId) {
        // Remove any existing error message for the given field
        var errorMessageDiv = document.getElementById(errorMessageId);
        if (errorMessageDiv) {
            errorMessageDiv.remove();
        }
    }

    function isFormValid() {
        // Check if all input fields are valid
        var inputs = form.querySelectorAll('input, textarea, select');
        for (var i = 0; i < inputs.length; i++) {
            var errorMessageId = 'error' + inputs[i].id.charAt(0).toUpperCase() + inputs[i].id.slice(1);
            if (inputs[i].classList.contains('invalid') || document.getElementById(errorMessageId)) {
                return false;
            }
        }

        // Check if a title is selected
        var titleInputs = document.querySelectorAll('input[name="title"]');
        if (!Array.from(titleInputs).some(input => input.checked)) {
            return false;
        }

        // Check if a source is selected
        var sourceInputs = document.querySelectorAll('input[name="source"]');
        if (!Array.from(sourceInputs).some(input => input.checked)) {
            return false;
        }

        return true;
    }

    function getSelectedTitle() {
        var titleInputs = document.querySelectorAll('input[name="title"]');
        var selectedTitle = Array.from(titleInputs).find(input => input.checked);
        return selectedTitle ? selectedTitle.value : '';
    }

    function getValue(fieldName) {
        return document.getElementById(fieldName).value.trim();
    }

    function getSelectedSources() {
        var sourceInputs = document.querySelectorAll('input[name="source"]:checked');
        return Array.from(sourceInputs).map(input => input.value).join(', ');
    }

    function validateTitle() {
        var titleInputs = document.querySelectorAll('input[name="title"]');
        var errorMessageId = 'errorTitle';

        // Remove any existing error message
        removeErrorMessage(errorMessageId);

        // Check if any title option is selected
        var isSelected = Array.from(titleInputs).some(input => input.checked);

        // Display error message if no title is selected
        if (!isSelected) {
            var firstTitleInput = titleInputs[0];
            showErrorMessage(errorMessageId, firstTitleInput, validateRequired);
        }
    }

    function validateHowDidYouHear() {
        var sourceInputs = document.querySelectorAll('input[name="source"]');
        var errorMessageId = 'errorSource';

        // Remove any existing error message
        removeErrorMessage(errorMessageId);

        // Check if any source option is selected
        var isSelected = Array.from(sourceInputs).some(input => input.checked);

        // Display error message if no source is selected
        if (!isSelected) {
            var firstSourceInput = sourceInputs[0];
            showErrorMessage(errorMessageId, firstSourceInput, validateRequired);
        }
    }
});