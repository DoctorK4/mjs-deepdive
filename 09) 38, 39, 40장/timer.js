const input = document.querySelector('.timer__input');
const startBtn = document.querySelector('.start__btn');
const stopBtn = document.querySelector('.stop__btn');
const indicator = document.querySelector('.indicator');
const form = document.querySelector('form');

form.addEventListener('click', (e) => e.preventDefault());
stopBtn.style.display = 'none';

let timeId;
function startTimer(seconds) {
  if (timeId) return;
  if (!Number(seconds) || seconds <= 0)
    return alert('0보다 큰 정수를 입력해주세요.');

  showSelectedBtn('stop');
  updateIndicator(seconds);
  timeId = setInterval(() => {
    if (seconds === 1) {
      return clearTimer();
    }
    updateIndicator(--seconds);
  }, 1000);
}

function stopTimer() {
  return clearTimer();
}

function showSelectedBtn(selected) {
  if (selected === 'start') {
    startBtn.style.display = 'inline-block';
    stopBtn.style.display = 'none';
  }
  if (selected === 'stop') {
    startBtn.style.display = 'none';
    stopBtn.style.display = 'inline-block';
  }
}

function updateIndicator(content) {
  indicator.textContent = content;
}

function clearTimer() {
  clearInterval(timeId);
  showSelectedBtn('start');
  timeId = null;
  input.value = '';
  updateIndicator('종료!');
  setTimeout(() => updateIndicator(''), 3000);
}

startBtn.addEventListener('click', () => startTimer(input.value));
stopBtn.addEventListener('click', () => stopTimer());
