const form = document.getElementById("form_costing");
const btn = document.querySelector('[name="button"]')
btn.addEventListener("click", function (event) {
    
    event.preventDefault();
    const formDate = document.querySelector('[name="date"]').value
    const formFromCountry = document.querySelector('[name="from_country"]').value
    const formFromTown = document.querySelector('input[name="from_town"]').value;
    const formToCountry = document.querySelector('[name="to_country"]').value
    const formToTown = document.querySelector('input[name="to_town"]').value;
    const formNameCargo = document.querySelector('input[name="name_cargo"]').value;
    
    const formNameClient = document.querySelector('input[name="name_client"]').value;
    const formTel = document.querySelector('input[name="tel"]').value;
    const formEmail = document.querySelector('input[name="email"]').value;
    const formButtom = document.querySelector('input[name="button"]').val;
    
    
    const formData = {};
    
    formData['Дата Перевозки'] = formDate
    formData['Страна погрузки'] = formFromCountry
    formData['Город или Код'] = formFromTown
    formData['Страна выгрузки'] = formToCountry
    formData['Город или код выгрузки'] = formToTown
    formData['Наименование грузка, тоннаж, обьём'] = formNameCargo
    formData['Укажите свое имя'] = formNameClient
    formData['Ваш номер телефона'] = formTel
    formData['Ваш email']  = formEmail
    console.log(formData)
    const jsonData = JSON.stringify(formData)
    fetch("save_form_data.php", {
        method: "POST",
        body: jsonData})
        .then(response => response.text())
            .then(data => {
            console.log("Ответ от сервера:", data);
    })
    .catch(error => {
        console.error("Ошибка:", error);
    });
        
        
    
   
})