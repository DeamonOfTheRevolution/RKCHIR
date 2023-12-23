let liked = false;

function switchlike(){
    let likebox = document.querySelector(".like-box");
    let like = document.querySelector(".like");

  if(!liked){
    liked = true;
    const myImg = document.getElementById('myImg');
    myImg.src = 'c:/Users/Dmitry/Desktop/ПРОГРАМНАЯ ИНЖЕНЕРИЯ/2 КУРС/РКЧИР/ОБЩАЯ РАБОТА/src/Soul_Trigger_Determination_0.png';
    likebox.classList.add("like-box-active");
  } else {
    liked = false;
    const myImg = document.getElementById('myImg');
    myImg.src = 'c:/Users/Dmitry/Desktop/ПРОГРАМНАЯ ИНЖЕНЕРИЯ/2 КУРС/РКЧИР/ОБЩАЯ РАБОТА/src/Soul_Trigger_Integrity_0.png';
    likebox.classList.remove("like-box-active");
  }
}