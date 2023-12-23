function truncateCards(){
    let cards = document.querySelectorAll(".card");
    let length = Number(prompt("Сколько символов оставить?"));
    let original;
    let truncated;
    if(typeof(length) == "number"){
      if(length < 1){
        alert("Слишком маленькая длина строки!");
        return;
      }
      for(card of cards){
        original = card.querySelector(".card-text");
        truncated = card.querySelector(".truncated-text");
        truncated.innerHTML = String(original.innerHTML).substring(0, length) + "...";
        truncated.style.display = "block";
        original.style.display = "none";
      }
    }
  }