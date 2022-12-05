document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log('listo');
}

var color = ['FF0000', '00FF00', '000000'];

function cambiarColor(index) {
    StatusBar.backgroundColorByHexString(color[index]);
    StatusBar.show();
    setTimeout(() => {
        StatusBar.backgroundColorByHexString(color[2]);
        StatusBar.show();
    }, 2000);
}

function getDatos() {
    navigator.geolocation.getCurrentPosition(onSuccess, onError, {
        maximunAge: 300000,
        timeout: 10000,
        enableHighAccuracy: true,
    });
}

function onSuccess(position) {
    var latitud = document.getElementById('lat');
    var longitud = document.getElementById('lon');
    latitud.innerHTML = '' + position.coords.latitude;
    longitud.innerHTML = '' + position.coords.longitude;
    var coords = new google.maps.LatLng(
        position.coords.latitude,
        position.coords.longitude
    );

    cambiarColor(1);

    var opciones = {
        center: coords,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    };

    var mapa = new google.maps.Map(document.getElementById('map'), opciones);

    var marcador = new google.maps.Marker({
        position: coords,
        map: mapa,
        title: ':D',
        animation: google.maps.Animation.DROP,
    });

    coord1 = position.coords.latitude;
    coord2 = position.coords.longitude;

    coordsMap = [coord1, coord2];

    console.log(coordsMap);

    return coordsMap;
}

function onError(err) {
    console.log('codigo de err:' + err.code + '  msj=' + err.message);
}

function addRecoleccion() {
    var nombre = document.getElementById('txtNombreRecoleccion').value;
    var telefono = document.getElementById('txtTelefonoRecoleccion').value;
    var email = document.getElementById('txtEmailRecoleccion').value;

    console.log(coordsUbicacion);
    var lat = coordsUbicacion[0];
    var long = coordsUbicacion[1];
    var ubicacion = 'https://www.google.com/maps/@' + lat + ',' + long + ',21z';

    if (nombre == null || nombre == '') {
        alert('Favor de ingresar el nombre');
        cambiarColor(0);
    } else if (telefono == null || telefono == '') {
        alert('Favor de ingresar el teléfono');
        cambiarColor(0);
    } else if (email == null || email == '') {
        alert('Favor de ingresar el email');
        cambiarColor(0);
    } else if (lat == null || lat == '') {
        console.log(ubicacion);
        alert('Favor presiona Detectar Ubicación');
        cambiarColor(0);
    } else {
        console.log(lat);
        console.log(long);
        console.log(ubicacion);
        agenda.addAgenda(nombre, telefono, email, ubicacion);
        $('#txtNombreRecoleccion').val('');
        $('#txtTelefonoRecoleccion').val('');
        $('#txtEmailRecoleccion').val('');
        cambiarColor(1);
        window.location.href = 'home.html';
    }
}