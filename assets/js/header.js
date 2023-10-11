  const item = document.querySelector('#show_phone');
  const secondDiv = document.querySelector('#menu_call');
  let isOpen = false
  item.addEventListener('click', function() {
      if(isOpen){
          secondDiv.style.width = '0';
          secondDiv.style.height = '0'
          isOpen = false
      }
      else{
          secondDiv.style.width = '100%';
          secondDiv.style.height = '150px';
          isOpen = true
      }
      
    });
const calc = document.querySelector('#show_calc');
calc.addEventListener('click', function() {
      const targetId = this.getAttribute('data-target');
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
          
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  

