const firstNameInput = document.querySelector('#firstName');
const lastNameInput = document.querySelector('#lastName');
const emailInput = document.querySelector('#email');
const emailConfirmInput = document.querySelector('#emailConfirm');
const submitButton = document.querySelector('#submit');
const alertMessage = document.querySelector('#alertMessage');

// disable button if all fields are empty
window.addEventListener('load', handleLoad);

// enable button if any field is not empty
firstNameInput.addEventListener('input', handleInputs);

lastNameInput.addEventListener('input', handleInputs);

emailInput.addEventListener('input', handleInputs);

emailConfirmInput.addEventListener('input', handleInputs);

submitButton.addEventListener('click', onSubmit);

window.addEventListener('unload', handleUnload);

function handleLoad() {
  if (
    firstNameInput.value === '' &&
    lastNameInput.value === '' &&
    emailInput.value === '' &&
    emailConfirmInput.value === ''
  ) {
    submitButton.disabled = true;
  } else {
    submitButton.disabled = false;
  }
}

function handleInputs() {
  if (
    firstNameInput.value !== '' ||
    lastNameInput.value !== '' ||
    emailInput.value !== '' ||
    emailConfirmInput.value !== ''
  ) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

async function onSubmit(e) {
  e.preventDefault();

  const firstName = firstNameInput.value;
  const lastName = lastNameInput.value;
  const email = emailInput.value;
  const emailConfirm = emailConfirmInput.value;

  if (!firstName || !lastName || !email || !emailConfirm) {
    return;
  }

  const payload = {
    firstName,
    lastName,
    email,
    emailConfirm,
  };

  try {
    const url = new URL(window.location.origin);
    url.pathname = '/profile/edit';

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();

    if (data.success) {
      alertMessage.classList.remove('alert-danger');
      alertMessage.classList.add('alert');
      alertMessage.classList.add('alert-success');
      alertMessage.classList.add('mt-4');
      alertMessage.textContent = data.message;
      // reload page
      const timeout = setTimeout(() => {
        window.location.reload();
      }, 2000);

      return;
    }

    alertMessage.classList.remove('alert-success');
    alertMessage.classList.add('alert');
    alertMessage.classList.add('alert-danger');
    alertMessage.classList.add('mt-4');
    alertMessage.textContent = data.message;
  } catch (error) {
    console.log('error', error);
  }

  // clear inputs
  firstNameInput.value = '';
  lastNameInput.value = '';
  emailInput.value = '';
  emailConfirmInput.value = '';
}

// clear listeners on unmount
function handleUnload() {
  firstNameInput.removeEventListener('input', handleInputs);
  lastNameInput.removeEventListener('input', handleInputs);
  emailInput.removeEventListener('input', handleInputs);
  emailConfirmInput.removeEventListener('input', handleInputs);
  submitButton.removeEventListener('click', onSubmit);
}
