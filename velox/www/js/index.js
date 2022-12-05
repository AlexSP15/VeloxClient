document.addEventListener('deviceready', onDeviceReady, false);

var cursor = {
    id: -1,
    nombre: '',
    email: '',
    contraseña: '',
};

function onDeviceReady() {
    base_datos.createDB();
    //addEnvio();
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
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

function addUser() {
    var nombre = document.getElementById('txtName').value;
    var email = document.getElementById('txtEmail').value;
    var password = document.getElementById('txtPassword').value;

    if (nombre == null || nombre == '') {
        alert('Favor de ingresar el nombre');
        cambiarColor(0);
    } else if (email == null || email == '') {
        alert('Favor de ingresar el email');
        cambiarColor(0);
    } else if (password == null || password == '') {
        alert('Favor de ingresar la contraseña');
        cambiarColor(0);
    } else {
        cambiarColor(1);
        usuarios.addUser(nombre, email, password);
        $('#txtName').val('');
        $('#txtEmail').val('');
        $('#txtPassword').val('');

        window.location.href = 'index.html';
    }
}

function comprobar() {
    usuarios.loadUser(mostrarUsuario);
}

function mostrarUsuario(resultado) {
    console.log(resultado.rows);
    var length = resultado.rows.length;

    var email = document.getElementById('loginEmail').value;
    var password = document.getElementById('loginPassword').value;

    var comprobarUser = 0;

    for (var i = 0; i < length; i++) {
        var item = resultado.rows.item(i);

        if (item.email === email && item.contraseña === password) {
            comprobarUser = 1;
            cambiarColor(1);
            console.log('existe el user');
            window.location.href = 'home.html';
        } else {
            console.log('no exists');
        }
    }

    if (comprobarUser === 1) {
        cambiarColor(1);
        window.location.href = 'home.html';
    } else {
        if (comprobarUser === 0) {
            cambiarColor(0);
            console.log('alerta');

            const alertPlaceholder = document.getElementById('liveAlertPlaceholder');

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

            alert('¡Email y/o contraseña incorrecto!', 'danger');

            setTimeout(function() {
                $('.alert').fadeOut(1000);
            }, 3000);

            $email = document.querySelector('#loginEmail');
            $email.focus();

            $('#loginPassword').val('');
        }
    }
}

function addEnvio() {
    console.log('Entro a addEnvio');
    var numeroGuia = 4536789610;
    var estatus = 'En transito';
    var remitente = 'Alejandro Soledad';
    var direccion = 'Independencia 05';
    var destinatario = 'Paulina Villanueva';
    var referencia = 'Casa color naranja';

    envios.addEnvio(
        numeroGuia,
        estatus,
        remitente,
        direccion,
        destinatario,
        referencia
    );
}

function rastreo() {
    envios.loadEnvio(mostrarEnvios);
}

function mostrarEnvios(resultado) {
    /*envios.deleteEnvio(2);
                                                                                                                envios.deleteEnvio(3);
                                                                                                                envios.deleteEnvio(4);
                                                                                                                envios.deleteEnvio(5);
                                                                                                                envios.deleteEnvio(6);
                                                                                                                envios.deleteEnvio(7);
                                                                                                                envios.deleteEnvio(8);*/
    console.log(resultado.rows);
    var length = resultado.rows.length;
    var envio = [];
    var numGuia = document.getElementById('txtNumGuia').value;

    var verficacion = 0;

    for (var i = 0; i < length; i++) {
        var item = resultado.rows.item(i);

        if (item.numeroGuia == numGuia) {
            console.log(item.numeroGuia);
            verficacion = 1;
            envio.push(item.numeroGuia);
            envio.push(item.estatus);
            envio.push(item.remitente);
            envio.push(item.direccion);
            envio.push(item.destinatario);
            envio.push(item.referencia);
            console.log(envio);

            cambiarColor(1);

            $('#labelEstatus').prepend(
                '<span id="estatusInfo" class="estatusInfo">' + item.estatus + '</span>'
            );
            $('#labelRemitente').prepend(
                '<span id="txtRemitente" class="infoEnvio">' +
                item.remitente +
                '</span>'
            );
            $('#labelDireccion').prepend(
                '<span id="txtDireccion" class="infoEnvio">' +
                item.direccion +
                '</span>'
            );
            $('#labelDestinatario').prepend(
                '<span id="txtRemitente" class="infoEnvio">' +
                item.destinatario +
                '</span>'
            );
            $('#labelReferencias').prepend(
                '<span id="txtRemitente" class="infoEnvio">' +
                item.referencia +
                '</span>'
            );
        } else {
            verficacion = 0;
            cambiarColor(0);
        }
    }

    if (verficacion === 1) {
        console.log(envio[1]);
        var estatus = envio[1].toString();
        var remitente = envio[2].toString();
        var direccion = envio[3].toString();
        var destinatario = envio[4].toString();
        var referencia = envio[5].toString();

        cambiarColor(1);
    } else {
        if (verficacion === 0) {
            cambiarColor(0);
            alert('Número de Guía Incorrecto o Inexistente');
        }
    }
    console.log(verficacion);
}

function deleteUser() {
    var respuesta = confirm('¿Deseas eliminar el usuario?');

    if (respuesta) {
        usuarios.deleteUser(cursor.id);
        usuarios.loadUser(mostrarUsuario);
    }

    $('#popupUpdateDelete').popup('close');
}

/*function addRecoleccion() {
    var nombre = document.getElementById('txtNombreRecoleccion').value;
    var telefono = document.getElementById('txtTelefonoRecoleccion').value;
    var email = document.getElementById('txtEmailRecoleccion').value;
    var coordsUbicacion = onSuccess();
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
}*/

function updateUser() {
    var nuevoNombre = $('#txtNewName').val();
    var nuevaCantidad = $('#txtNewQuantity').val();

    usuarios.updateUser(cursor.id, nuevoNombre, nuevaCantidad);
    $('#popupUpdateDelete').dialog('close');
}

var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },

    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
};

app.initialize();