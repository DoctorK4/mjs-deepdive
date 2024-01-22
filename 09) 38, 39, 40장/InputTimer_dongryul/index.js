const $input = document.getElementById('userInput');
const $button = document.getElementById('submitButton');
const $form = document.getElementById('inputForm');
const $clock = document.querySelector('.clock');

const addStartTimer = (e) => {
  e.preventDefault();
  const seconds = Number($input.value);
  $input.value = "";
  $button.disabled = true;
  if (Number.isNaN(seconds)) {
    alert('wrong type!');
    $input.value = "";
    return;
  }
  
  let count = seconds;
  $clock.innerText = count;
  const timerId = setInterval(() => {
    if (count-- === 1) {
      clearInterval(timerId);
      $button.disabled = false;
    }
    $clock.innerText = count;
  }, 1000);
};

$button.addEventListener('click', addStartTimer);