let cars = JSON.parse(localStorage.getItem('cars')) || [];

function displayCars() {
    const carList = document.getElementById('carList');
    carList.innerHTML = '';
    cars.forEach(car => {
        carList.innerHTML += `
            <tr>
                <td>${car.carName}</td>
                <td>${car.carBrand}</td>
                <td>${car.year}</td>
                <td>${car.price}</td>
                <td>${car.color}</td>
                <td>${car.horsePower}</td>
                <td>${car.electroCar}</td>
                <td>
                    <button onclick="editCar(${car.id})" class="btn btn-warning btn-sm">Tahrirlash</button>
                    <button onclick="deleteCar(${car.id})" class="btn btn-danger btn-sm">O‘chirish</button>
                </td>
            </tr>
        `;
    });
}

function addCar(carName, carBrand, year, price, color, horsePower, electroCar) {
    const car = { id: Date.now(), carName, carBrand, year, price, color, horsePower, electroCar };
    cars.push(car);
    localStorage.setItem('cars', JSON.stringify(cars));
    displayCars();
}

function editCar(id) {
    const car = cars.find(c => c.id === id);
    if (car) {
        document.getElementById('editId').value = car.id;
        document.getElementById('editCarName').value = car.carName;
        document.getElementById('editCarBrand').value = car.carBrand;
        document.getElementById('editYear').value = car.year;
        document.getElementById('editPrice').value = car.price;
        document.getElementById('editColor').value = car.color;
        document.getElementById('editHorsePower').value = car.horsePower;
        document.getElementById('editElectroCar').value = car.electroCar;
        new bootstrap.Modal(document.getElementById('editModal')).show();
    }
}

function updateCar(id, carName, carBrand, year, price, color, horsePower, electroCar) {
    const carIndex = cars.findIndex(c => c.id === id);
    if (carIndex !== -1) {
        cars[carIndex] = { id, carName, carBrand, year, price, color, horsePower, electroCar };
        localStorage.setItem('cars', JSON.stringify(cars));
        displayCars();
    }
}

function deleteCar(id) {
    if (confirm('Rostdan o‘chirilsinmi?')) {
        cars = cars.filter(c => c.id !== id);
        localStorage.setItem('cars', JSON.stringify(cars));
        displayCars();
    }
}

document.getElementById('carForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const errorMessage = document.getElementById('error-message');
    errorMessage.classList.add('d-none');

    const carName = document.getElementById('carName').value;
    const carBrand = document.getElementById('carBrand').value;
    const year = document.getElementById('year').value;
    const price = document.getElementById('price').value;
    const color = document.getElementById('color').value;
    const horsePower = document.getElementById('horsePower').value;
    const electroCar = document.getElementById('electroCar').value;

    if (year < 1900 || year > 2025) {
        errorMessage.textContent = 'Yil 1900 dan 2025 gacha bo‘lishi kerak!';
        errorMessage.classList.remove('d-none');
        return;
    }
    if (price < 0) {
        errorMessage.textContent = 'Narx 0 dan kichik bo‘lmasligi kerak!';
        errorMessage.classList.remove('d-none');
        return;
    }
    if (horsePower < 0) {
        errorMessage.textContent = 'Dvigatel kuchi 0 dan kichik bo‘lmasligi kerak!';
        errorMessage.classList.remove('d-none');
        return;
    }
    if (!electroCar) {
        errorMessage.textContent = 'Elektr mashina tanlanishi kerak!';
        errorMessage.classList.remove('d-none');
        return;
    }

    addCar(carName, carBrand, year, price, color, horsePower, electroCar);
    e.target.reset();
});

document.getElementById('editForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const errorMessage = document.getElementById('editError');
    errorMessage.classList.add('d-none');

    const id = document.getElementById('editId').value;
    const carName = document.getElementById('editCarName').value;
    const carBrand = document.getElementById('editCarBrand').value;
    const year = document.getElementById('editYear').value;
    const price = document.getElementById('editPrice').value;
    const color = document.getElementById('editColor').value;
    const horsePower = document.getElementById('editHorsePower').value;
    const electroCar = document.getElementById('editElectroCar').value;

    if (year < 1900 || year > 2025) {
        errorMessage.textContent = 'Yil 1900 dan 2025 gacha bo‘lishi kerak!';
        errorMessage.classList.remove('d-none');
        return;
    }
    if (price < 0) {
        errorMessage.textContent = 'Narx 0 dan kichik bo‘lmasligi kerak!';
        errorMessage.classList.remove('d-none');
        return;
    }
    if (horsePower < 0) {
        errorMessage.textContent = 'Dvigatel kuchi 0 dan kichik bo‘lmasligi kerak!';
        errorMessage.classList.remove('d-none');
        return;
    }
    if (!electroCar) {
        errorMessage.textContent = 'Elektr mashina tanlanishi kerak!';
        errorMessage.classList.remove('d-none');
        return;
    }

    updateCar(parseInt(id), carName, carBrand, year, price, color, horsePower, electroCar);
    bootstrap.Modal.getInstance(document.getElementById('editModal')).hide();
});

displayCars();