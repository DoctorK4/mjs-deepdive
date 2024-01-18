const $button = document.querySelector('button');

const buttonClickHandler = function() {
  var e = document.getElementById('time').value;
  if (e > 0 && Number.isInteger(+e) === true) {
    for (let i = e - 1; i >= 0; i--) {
      setTimeout(() => {
        document.getElementById('result').innerText = i;
      }, (e - i) * 1000);
    }
  }
  if (e == 0) {
    document.getElementById('result').innerHTML = '끝!';
  }
  if(e < 0 || Number.isInteger(+e) !== true) {
    alert('잘못된 형식입니다.')
  }
}
$button.addEventListener('click', buttonClickHandler);

