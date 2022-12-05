document.addEventListener('deviceready', onDeviceReady, false);

var cursor = {
    id: -1,
    nombre: '',
    email: '',
    contraseña: '',
};

function onDeviceReady() {
    base_datos.createDB();

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
}

function addUser() {
    var nombre = document.getElementById('txtName').value;
    var email = document.getElementById('txtEmail').value;
    var password = document.getElementById('txtPassword').value;

    if (nombre == null || nombre == '') {
        alert('Favor de ingresar el nombre');
    } else if (email == null || email == '') {
        alert('Favor de ingresar el email');
    } else if (password == null || password == '') {
        alert('Favor de ingresar la contraseña');
    } else {
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

    var comprobar = 0;

    for (var i = 0; i < length; i++) {
        var item = resultado.rows.item(i);

        if (item.email === email && item.contraseña === password) {
            comprobar = 1;
            console.log('existe el user');
        } else {
            console.log('no exists');
        }
    }

    if (comprobar === 1) {
        window.location.href = 'https://professor-falken.com';
    } else {
        if (comprobar === 0) {
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
    console.log(comprobar);
}

function deleteUser() {
    var respuesta = confirm('¿Deseas eliminar el usuario?');

    if (respuesta) {
        usuarios.deleteUser(cursor.id);
        usuarios.loadUser(mostrarUsuario);
    }

    $('#popupUpdateDelete').popup('close');
}

$(document).on('pagebeforeshow', '#updatedialog', function() {
    $('#txtNewName').val(cursor.nombre);
    $('#txtNewQuantity').val(cursor.cantidad);
});

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
    }
};

app.initialize();