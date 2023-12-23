function Accumulator(startingValue){
    this.value = startingValue;
    this.content = {};
    this.read = function(name){
      let amount = Number(prompt(`Какое количество товара ${name} добавить?`));
      if(typeof(amount) == "number"){
        this.value += amount;
        let exist = this.content.hasOwnProperty(name);
        if(exist){
          this.content[name] += amount;
        }else{
          this.content[name] = amount;
        }
      }
    }
  }
  
  let state;
  
  function addToCart(name){
    if(!state){
      state = new Accumulator(0);
    }
    state.read(name);
  }
  
  function alertCart(){
    if(!state){
      state = new Accumulator(0);
    }
    alert(`Всего товаров: ${state.value}, из них добавлено вручную: ${JSON.stringify(state.content)}`);
  }
  
  function clearCart(){
    if(state){
      state = new Accumulator(0);
    }
  }

  //--------------------------------------------------------------------//