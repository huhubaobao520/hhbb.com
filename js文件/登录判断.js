// 全局变量
var code = '';
var countdown = 60;
var timer = null;

// 获取验证码
function getCode() {
  var phone = document.querySelector('input[name="phone"]');
  if (!phone) {
    alert("请先输入手机号！");
    return;
  }
  var phoneVal = phone.value.trim();

  if (!phoneVal || phoneVal.length !== 11 || isNaN(phoneVal)) {
    alert('请输入正确的11位手机号！');
    return;
  }

  if (timer) return;

  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  code = '';
  for (var i = 0; i < 4; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  alert('您的验证码：' + code);

  var btn = document.querySelector('.code-btn');
  btn.disabled = true;
  countdown = 60;
  btn.innerText = countdown + '秒后重发';

  timer = setInterval(function () {
    countdown--;
    btn.innerText = countdown + '秒后重发';
    if (countdown <= 0) {
      clearInterval(timer);
      timer = null;
      btn.disabled = false;
      btn.innerText = '获取';
    }
  }, 1000);
}

// 登录（手机号登录）
function doLogin() {
  var phone = document.querySelector('input[name="username"]').value.trim();
  var pwd = document.querySelector('input[name="password"]').value.trim();

  if (!phone) {
    alert('请输入手机号！');
    return;
  }
  if (!pwd) {
    alert('请输入密码！');
    return;
  }

  var localPhone = localStorage.getItem('phone');
  var localPwd = localStorage.getItem('password');

  if (phone === localPhone && pwd === localPwd) {
    alert('登录成功！');
    location.href = '页面文件/zhuym.html';
  } else {
    alert('手机号或密码错误！');
  }
}

// 注册（无用户名，只验证手机号+验证码+密码）
function doRegister() {
  var phone = document.querySelector('input[name="phone"]').value.trim();
  var inputCode = document.querySelector('input[name="code"]').value.trim();
  var pwd = document.querySelector('input[name="password"]').value.trim();
  var repwd = document.querySelector('input[name="repassword"]').value.trim();

  if (!phone || phone.length !== 11) {
    alert('请输入正确11位手机号！');
    return;
  }
  if (!inputCode) {
    alert('请输入验证码！');
    return;
  }
  if (inputCode.toUpperCase() !== code.toUpperCase()) {
    alert('验证码错误！');
    return;
  }
  if (!pwd || pwd.length < 6) {
    alert('密码至少6位！');
    return;
  }
  if (pwd !== repwd) {
    alert('两次密码不一致！');
    return;
  }

  // 保存手机号+密码
  localStorage.setItem('phone', phone);
  localStorage.setItem('password', pwd);

  alert('注册成功！请妥善保管密码，网站不会保留任何信息');
  location.href = '../index.html';
}

// 找回密码
function resetPwd() {
  var phone = document.querySelector('input[name="phone"]').value.trim();
  var inputCode = document.querySelector('input[name="code"]').value.trim();
  var newpwd = document.querySelector('input[name="newpwd"]').value.trim();

  if (!phone || phone.length !== 11) {
    alert('请输入正确11位手机号！');
    return;
  }
  if (!inputCode) {
    alert('请输入验证码！');
    return;
  }
  if (inputCode.toUpperCase() !== code.toUpperCase()) {
    alert('验证码错误！');
    return;
  }
  if (!newpwd) {
    alert('请输入新密码！');
    return;
  }

  localStorage.setItem('phone', phone);
  localStorage.setItem('password', newpwd);

  alert('密码重置成功！');
  location.href = '../index.html';
}
document.getElementById("doLogin()").addEventListener("click", function() {
    this.textContent = "登录中";
    this.disabled = true; 
    setTimeout(function() {
      window.location.href = "登录.html";
    }, 1000); 
  });