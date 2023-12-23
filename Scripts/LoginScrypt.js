

let drawing = false;
let imgCounter = 0;
let lastImg = {x: null, y: null};

/*let result = prompt('Желаете пройти регистрацию на сайте?', '');

if (result=='Да'){
    alert('Круто!');
} else{
    alert('Попробуй ещё раз');
}*/

function login(){
    let login = prompt('Введите свой логин', '');

    if (!login){
        alert('Отменено');
        return;
    }
if (login=='Админ'){
    let password = prompt('Введите ваш пароль', '');
    if(!password){
        alert('Отменено');
    }
    if (password == 'Я главный'){
        alert('Здравствуйте!');
    } else {
        alert('Неверный пароль');
    }
} else {
    alert('Я вас не знаю');
}
}

function makePictures(event){
    let borderLeft = 16;
    let borderRight = event.target.clientWidth - 16;
    let borderTop = 16 + 50;
    let borderBottom = event.target.clientHeight - 16 + 50;
    let x = event.clientX
    let y = event.clientY
    let mouseXok = x > (borderLeft) && x < borderRight;
    let mouseYok = y > borderTop && y < borderBottom;
    if(mouseXok && mouseYok){
      let frequencyCondition;
      const diff = 16;
      frequencyCondition = (Math.abs(x - lastImg.x) > diff) || (Math.abs(y - lastImg.y) > diff);
      let layout = document.querySelector(".layout");
      if(frequencyCondition && layout){
        let image = document.createElement("img");
        image.id = `img-draw-${imgCounter}`;
        image.style.position = "absolute";
        image.style.top = `${y - borderTop}px`;
        image.style.left = `${x - borderLeft}px`;
        image.src="c:/Users/Dmitry/Desktop/ПРОГРАМНАЯ ИНЖЕНЕРИЯ/2 КУРС/РКЧИР/ОБЩАЯ РАБОТА/src/5340810.png";
        image.zIndex = 0;
        layout.appendChild(image);
        imgCounter++;
        lastImg.x = x;
        lastImg.y = y;
      }
    }
  }
  
  function draw(){
    let main = document.querySelector("section")
    if(drawing){
      drawing = false;
      main.removeEventListener("mousemove", makePictures);
  
    }else{
      drawing = true;
      main.addEventListener("mousemove", makePictures);
    }
  }
  
  function clearLayout(){
    console.log("clicked");
    let layout = document.querySelector(".layout");
    layout.innerHTML = "";
  }

  /*CAPTCHA--------------------------------------------------------*/

  function randomInt(min, max){
    if(min > max){
      return 0;
    }
    max++;
    return Math.trunc(Math.random() * (max - min) + min);
  }
  
  function randomString(length=6){
    let min = "a".charCodeAt(0);
    let max = "z".charCodeAt(0);
    let result = "";
    let upper;
    let char;
    for(let i = 0; i < length; i++){
      upper = randomInt(0,1);
      char = String.fromCharCode(randomInt(min, max));
      result += upper ? char.toUpperCase() : char;
    }
    return result;
  }
  
  function randomNumber(length=3){
    if(length < 1){
      return 0;
    }
    return randomInt(0, Number.MAX_SAFE_INTEGER) % (10**length);
  }
  
  function prepareCaptcha(text=true, length=10){
    let captchaText = document.querySelector("#captcha-task");
    let captchaInput = document.querySelector("#captcha-input");
    let button = document.querySelector("#captcha-protected");
    if(text){
      captchaText.innerHTML = randomString()
    }else{
      captchaText.innerHTML = `${randomNumber()} + ${randomNumber()}`;
    }
    captchaInput.removeAttribute("disabled");
    button.setAttribute("disabled", "");
  }
  
  function checkCaptcha(){
    let captchaText = document.querySelector("#captcha-task").innerHTML;
    let captchaInput = document.querySelector("#captcha-input").value;
    let button = document.querySelector("#captcha-protected");
  
    let solution = String(captchaInput).trim();
    let textTask = !captchaText.includes("+") && (solution == captchaText);
    let numTask = captchaText.includes("+");
    if(numTask){
      let nums = captchaText.split(" + ").map((el) => Number(el));
      numTask = (nums[0] + nums[1]) == Number(solution);
    }
    if(textTask || numTask){
      button.removeAttribute("disabled");
    }else{
      button.setAttribute("disabled", "");
    }
  }
  
  function changeCaptcha(){
    prepareCaptcha(false);
  }

  /*---------------------------------------------------------------*/

  window.onload = function(){
    // для vercel
    if(
      !location.pathname.endsWith(".html")
      && !location.pathname.endsWith("/")
    ){
      location.pathname += "/"
    }
    // по работе
    let captchaText = document.querySelector("#captcha-task");
    let captchaInput = document.querySelector("#captcha-input");
    if(!captchaText || !captchaInput){
      alert("Что-то пошло не так при загрузке страницы");
    }else{
      prepareCaptcha();
      captchaInput.addEventListener("input", checkCaptcha);
    }
    document.querySelector("form").addEventListener("submit", (event) => {
      event.preventDefault();
      return false;
    }, true);
  }