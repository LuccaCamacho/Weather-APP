const inputElement = document.getElementById('city-input');
const buttonElement = document.getElementById('search-btn');
const weatherInfoElement = document.getElementById('weather-info');
const backUpButton = document.getElementById('back-up');

buttonElement.addEventListener('click', () => {
    const cityName = inputElement.value.trim();
    if (!cityName) {
        alert('Por Favor, insira o nome da Cidade!');
        return;
    }

    // URL da API
    const apiKey = '1764e33a8aaf41c2904134738252801';
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}&lang=pt`;

    // Fazendo a requisição
    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Cidade não encontrada!');
        }
        return response.json();
    })

    .then(data => {
        const { location, current } = data;

        // Tornando a div visível após o clique
        weatherInfoElement.style.display = 'block';

        weatherInfoElement.innerHTML = `
            <h2>Clima em ${location.name}, ${location.region} - ${location.country}</h2>
            <p><strong>Temperatura:</strong> ${current.temp_c}°C</p>
            <p><strong>Condição:</strong> ${current.condition.text}</p>
            <img src="${current.condition.icon}" alt="Ícone do clima"></img>
            <p><strong>Umidade:</strong> ${current.humidity}%</p>
            <p><strong>Vento:</strong> ${current.wind_kph} km/h, direção: ${current.wind_dir}</p>
            <p><strong>Sensação Térmica:</strong> ${current.feelslike_c}°C</p>
            <p><strong>Precipitação:</strong> ${current.precip_mm} mm</p>
        `;

        // Rolando suavemente para a div com as informações do clima
        weatherInfoElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Exibindo o botão "Voltar" após sucesso da requisição
        backUpButton.style.display = 'block';
    })

    .catch(error => {
        // Exibindo o erro caso a requisição falhe
        weatherInfoElement.style.display = 'block'; 
        weatherInfoElement.innerHTML = `<p style="color: red;">Erro: ${error.message}</p>`;

        // Exibindo o botão "Voltar" em caso de erro também
        backUpButton.style.display = 'block';
    });
});

// Botão para voltar ao topo
backUpButton.addEventListener('click', () => {
    // Faz a rolagem suave para o topo da página
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});



       
