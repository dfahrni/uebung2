document.getElementById('calculate-route').addEventListener('click', async () => {
    const start = document.getElementById('start').value;
    const destination = document.getElementById('destination').value;

    if (start && destination) {
        const startCoords = await geocode(start);
        const destCoords = await geocode(destination);

        if (startCoords && destCoords) {
            const route = await getRoute(startCoords, destCoords);
            displayRoute(route);
        }
    } else {
        alert('Bitte Start- und Zielort eingeben.');
    }
});

async function geocode(place) {
    const response = await fetch(`https://api.openrouteservice.org/geocode/search?api_key=YOUR_API_KEY&text=${place}`);
    const data = await response.json();
    return data.features[0].geometry.coordinates;
}

async function getRoute(startCoords, destCoords) {
    const response = await fetch('https://api.openrouteservice.org/v2/directions/driving-car', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': '5b3ce3597851110001cf6248a311c8afdd41493f8ed70cb1cc798cc5'
        },
        body: JSON.stringify({
            coordinates: [startCoords, destCoords]
        })
    });
    const data = await response.json();
    return data.routes[0];
}

function displayRoute(route) {
    // Implementiere die Anzeige der Route auf der Karte.
    // Hier könntest du Leaflet oder eine andere Kartenbibliothek verwenden.
    console.log(route);
}
