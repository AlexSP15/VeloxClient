document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log('listo');
}

var coordsMap = [];

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

    coordsMap.push(coord1);
    coordsMap.push(coord2);

    console.log(coordsMap);
}

function onError(err) {
    console.log('codigo de err:' + err.code + '  msj=' + err.message);
}

function addRecoleccion() {
    var nombre = document.getElementById('txtNombreRecoleccion').value;
    var telefono = document.getElementById('txtTelefonoRecoleccion').value;
    var email = document.getElementById('txtEmailRecoleccion').value;

    console.log(coordsMap);
    var lat = coordsMap[0];
    var long = coordsMap[1];
    var ubicacion = 'https://www.google.com/maps/@' + lat + ',' + long + ',21z';

    if (nombre == null || nombre == '') {
        const alertPlaceholder = document.getElementById(
            'liveAlertPlaceholderAgenda'
        );

        const alert = (message, type) => {
            const wrapper = document.createElement('div');
            wrapper.innerHTML = [
                `<div class="alert alert-${type} alert-dismissible" role="alert">`,
                `   <div>${message}</div>`,
                '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
                '</div>',
            ].join('');

            alertPlaceholder.append(wrapper);
        };

        alert('¡Favor de ingresar el nombre!', 'warning');

        setTimeout(function() {
            $('.alert').fadeOut(1000);
        }, 1500);
        cambiarColor(0);
        cambiarColor(2);
    } else if (telefono == null || telefono == '') {
        const alertPlaceholder = document.getElementById(
            'liveAlertPlaceholderAgenda'
        );

        const alert = (message, type) => {
            const wrapper = document.createElement('div');
            wrapper.innerHTML = [
                `<div class="alert alert-${type} alert-dismissible" role="alert">`,
                `   <div>${message}</div>`,
                '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
                '</div>',
            ].join('');

            alertPlaceholder.append(wrapper);
        };

        alert('¡Favor de ingresar el teléfono!', 'warning');

        setTimeout(function() {
            $('.alert').fadeOut(1000);
        }, 1500);
        cambiarColor(0);
        cambiarColor(2);
    } else if (email == null || email == '') {
        const alertPlaceholder = document.getElementById(
            'liveAlertPlaceholderAgenda'
        );

        const alert = (message, type) => {
            const wrapper = document.createElement('div');
            wrapper.innerHTML = [
                `<div class="alert alert-${type} alert-dismissible" role="alert">`,
                `   <div>${message}</div>`,
                '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
                '</div>',
            ].join('');

            alertPlaceholder.append(wrapper);
        };

        alert('¡Favor de ingresar el email!', 'warning');

        setTimeout(function() {
            $('.alert').fadeOut(1000);
        }, 1500);
        cambiarColor(0);
        cambiarColor(2);
    } else if (lat == null || lat == '') {
        const alertPlaceholder = document.getElementById(
            'liveAlertPlaceholderAgenda'
        );

        const alert = (message, type) => {
            const wrapper = document.createElement('div');
            wrapper.innerHTML = [
                `<div class="alert alert-${type} alert-dismissible" role="alert">`,
                `   <div>${message}</div>`,
                '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
                '</div>',
            ].join('');

            alertPlaceholder.append(wrapper);
        };

        alert('¡Favor de presionar Detectar Ubicación!', 'warning');

        setTimeout(function() {
            $('.alert').fadeOut(1000);
        }, 1500);
        cambiarColor(0);
        cambiarColor(2);
    } else {
        console.log(lat);
        console.log(long);
        console.log(ubicacion);
        console.log(nombre, telefono, email, ubicacion);
        agenda.addAgenda(nombre, telefono, email, ubicacion);
        const alertPlaceholder = document.getElementById(
            'liveAlertPlaceholderAgenda'
        );

        const alert = (message, type) => {
            const wrapper = document.createElement('div');
            wrapper.innerHTML = [
                `<div class="alert alert-${type} alert-dismissible" role="alert">`,
                `   <div>${message}</div>`,
                '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
                '</div>',
            ].join('');

            alertPlaceholder.append(wrapper);
        };

        alert('¡Recolección Registrada Correctamente!', 'success');

        setTimeout(function() {
            $('.alert').fadeOut(1000);
        }, 3000);
        $('#txtNombreRecoleccion').val('');
        $('#txtTelefonoRecoleccion').val('');
        $('#txtEmailRecoleccion').val('');
        cambiarColor(1);
        cambiarColor(2);
        setTimeout(function() {
            window.location.href = 'home.html';
        }, 4500);
    }
}