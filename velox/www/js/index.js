document.addEventListener('deviceready', onDeviceReady, false);

var cursor = {
    id: -1,
    estatus: '',
};

function onDeviceReady() {
    base_datos.createDB();

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
        const alertPlaceholder = document.getElementById(
            'liveAlertPlaceholderRegistro'
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
    } else if (email == null || email == '') {
        const alertPlaceholder = document.getElementById(
            'liveAlertPlaceholderRegistro'
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
    } else if (password == null || password == '') {
        const alertPlaceholder = document.getElementById(
            'liveAlertPlaceholderRegistro'
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

        alert('¡Favor de ingresar la contraseña!', 'warning');

        setTimeout(function() {
            $('.alert').fadeOut(1000);
        }, 1500);

        cambiarColor(0);
        cambiarColor(2);
    } else {
        cambiarColor(1);
        cambiarColor(2);
        usuarios.addUser(nombre, email, password);
        $('#txtName').val('');
        $('#txtEmail').val('');
        $('#txtPassword').val('');
        setTimeout(function() {
            window.location.href = 'index.html';
        }, 3000);
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
            cambiarColor(2);
            console.log('existe el user');
            window.location.href = 'home.html';
        } else {
            console.log('no exists');
        }
    }

    if (comprobarUser === 1) {
        cambiarColor(1);
        cambiarColor(2);
        window.location.href = 'home.html';
    } else {
        if (comprobarUser === 0) {
            cambiarColor(0);
            cambiarColor(2);

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
    $('#checkEntrega').prop('disabled', false);
    $('#btnRastreo').prop('disabled', true);
}

var isDelivery;

function mostrarEnvios(resultado) {
    console.log(resultado.rows);

    var numItem = resultado.rows.length;

    for (var i = 1; i < numItem; i++) {
        console.log(i);
        envios.deleteEnvio(i + 1);
    }

    var length = resultado.rows.length;
    var envio = [];
    var numGuia = document.getElementById('txtNumGuia').value;

    var verficacion = 0;
    var item = resultado.rows.item(0);
    if (item.estatus == 'Entregado') {
        $('#checkEntrega').prop('checked', true);
    } else if (item.estatus == 'En transito') {
        $('#checkEntrega').prop('checked', false);
    }
    console.log(item);

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
        if (item.estatus == 'En transito') {
            isDelivery = 0;
        } else if (item.estatus == 'Entregado') {
            isDelivery = 1;
        }
        cambiarColor(1);
        cambiarColor(2);

        $('#labelEstatus').prepend(
            '<span id="estatusInfo" class="estatusInfo">' + item.estatus + '</span>'
        );
        $('#labelRemitente').prepend(
            '<span id="txtRemitente" class="infoEnvio">' + item.remitente + '</span>'
        );
        $('#labelDireccion').prepend(
            '<span id="txtDireccion" class="infoEnvio">' + item.direccion + '</span>'
        );
        $('#labelDestinatario').prepend(
            '<span id="txtDestinatario" class="infoEnvio">' +
            item.destinatario +
            '</span>'
        );
        $('#labelReferencias').prepend(
            '<span id="txtReferencias" class="infoEnvio">' +
            item.referencia +
            '</span>'
        );
    } else {
        verficacion = 0;
        cambiarColor(0);
        cambiarColor(2);
    }

    if (verficacion === 1) {
        console.log(envio[1]);
        var estatus = envio[1].toString();
        var remitente = envio[2].toString();
        var direccion = envio[3].toString();
        var destinatario = envio[4].toString();
        var referencia = envio[5].toString();

        cambiarColor(1);
        cambiarColor(2);
    } else {
        if (verficacion === 0) {
            cambiarColor(0);
            cambiarColor(2);

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

            alert('Número de Guía Incorrecto o Inexistente', 'danger');

            setTimeout(function() {
                $('.alert').fadeOut(1000);
            }, 1500);
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
}

function updateEnvio() {
    var id = 1;
    $('#checkEntrega').prop('disabled', true);
    if ((isDelivery = 0)) {
        if (document.getElementById('checkEntrega').checked) {
            var estatus = 'En transito';
            envios.updateEnvio(id, estatus);
            $('#estatusInfo').remove();
            $('#txtRemitente').remove();
            $('#txtDireccion').remove();
            $('#txtDestinatario').remove();
            $('#txtReferencias').remove();
            rastreo();
        } else {
            var estatus = 'Entregado';
            envios.updateEnvio(id, estatus);
            $('#estatusInfo').remove();
            $('#txtRemitente').remove();
            $('#txtDireccion').remove();
            $('#txtDestinatario').remove();
            $('#txtReferencias').remove();
            rastreo();
        }
    } else {
        if (document.getElementById('checkEntrega').checked) {
            var estatus = 'Entregado';
            envios.updateEnvio(id, estatus);
            $('#estatusInfo').remove();
            $('#txtRemitente').remove();
            $('#txtDireccion').remove();
            $('#txtDestinatario').remove();
            $('#txtReferencias').remove();
            rastreo();
        } else {
            var estatus = 'En transito';
            envios.updateEnvio(id, estatus);
            $('#estatusInfo').remove();
            $('#txtRemitente').remove();
            $('#txtDireccion').remove();
            $('#txtDestinatario').remove();
            $('#txtReferencias').remove();
            rastreo();
        }
    }
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