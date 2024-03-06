const USERNAME = 'test@gmail.com';
const PASSWORD = '123123';
const PASSWORD_RULE = {
  containNumber: true,
  containUpperCase: true,
  minLength: 8,
};
function validateEmail(email) {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
const toggleClass = (element, className) => {
  if (element.classList.contains(className)) {
    element.classList.remove(className);
  } else {
    element.classList.add(className);
  }
};
const passwordValidation = (password) => {
  const status = {
    isValidated: false,
    message: '',
  };
  if (password.length < PASSWORD_RULE.minLength) {
    status.message = 'Mật khẩu phải chứa ít nhất 8 ký tự.';
    return status;
  }
  if (!/\d/.test(password) && PASSWORD_RULE.containNumber) {
    status.message = 'Mật khẩu phải chứa ít nhất một số.';
    return status;
  }
  if (!/[A-Z]/.test(password) && PASSWORD_RULE.containUpperCase) {
    status.message = 'Mật khẩu phải chứa ít nhất một chữ hoa.';
    return status;
  }
  status.isValidated = true;
  return status;
};
const loginForm = document.getElementById('login_form_id');
loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const username = formData.get('username');
  const password = formData.get('password');
  // validation
  if (validateEmail(username) === false) {
    loginStatusNoti(false, 'Email không hợp lệ.');
    return;
  }
//   if (passwordValidation(password).isValidated === false) {
//     loginStatusNoti(false, passwordValidation(password).message);
//     return;
//   }
  // end validation
  if (username === USERNAME && password === PASSWORD) {
    window.location.href = 'main.html';
  } else {
    loginStatusNoti(false, 'Tài khoản hoặc mật khẩu không hợp lệ.');
  }
});

const loginStatusNoti = (isPositive, message) => {
  const loginStatus = document.querySelector('#login__status_noti');
  toggleClass(loginStatus, 'd-block');
  const loginStatusMessage = document.querySelector(
    '#login__status_noti > p > span'
  );
  loginStatusMessage.innerHTML = message;
  loginStatusMessage.style.color = isPositive ? 'green' : 'red';
};
