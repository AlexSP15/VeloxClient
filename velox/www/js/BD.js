var base_datos = {
    bd: null,
    createDB: function() {
        if (window.cordova.platformId === 'browser') {
            this.bd = window.openDatabase('usuarios.db', '1.0', 'Inventario', 1000);
        } else {
            this.bd = window.sqlitePlugin.openDatabase({
                name: 'usuarios.db',
                location: 'default',
            });
        }
        this.bd.transaction(function(tx) {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS usuario(id integer primary key, nombre text, email text, contraseña text)', [],
                function(tx, resultado) {
                    const alertPlaceholder = document.getElementById(
                        'liveAlertPlaceholder'
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

                    alert('¡Cargando recursos! 1 de 3', 'success');

                    setTimeout(function() {
                        $('.alert').fadeOut(1000);
                    }, 1500);
                },
                function(tx, error) {
                    const alertPlaceholder = document.getElementById(
                        'liveAlertPlaceholder'
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

                    alert('¡Error al cargar recursos!', 'danger');

                    setTimeout(function() {
                        $('.alert').fadeOut(1000);
                    }, 1500);
                }
            );
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS envios(id integer primary key, numeroGuia integer, estatus text, remitente text, direccion text, destinatario text, referencia text)', [],
                function(tx, resultado) {
                    const alertPlaceholder = document.getElementById(
                        'liveAlertPlaceholder'
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

                    alert('¡Cargando recursos! 2 de 3', 'success');

                    setTimeout(function() {
                        $('.alert').fadeOut(1000);
                    }, 1500);
                },
                function(tx, error) {
                    const alertPlaceholder = document.getElementById(
                        'liveAlertPlaceholder'
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

                    alert('¡Error al cargar recursos!', 'danger');

                    setTimeout(function() {
                        $('.alert').fadeOut(1000);
                    }, 1500);
                }
            );

            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS Agenda(id integer primary key, nombre text, telefono integer, email text, ubicacion text)', [],
                function(tx, resultado) {
                    const alertPlaceholder = document.getElementById(
                        'liveAlertPlaceholder'
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

                    alert('¡Cargando recursos! 3 de 3', 'success');

                    setTimeout(function() {
                        $('.alert').fadeOut(1000);
                    }, 1500);
                },
                function(tx, error) {
                    const alertPlaceholder = document.getElementById(
                        'liveAlertPlaceholder'
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

                    alert('¡Error al cargar recursos!', 'danger');

                    setTimeout(function() {
                        $('.alert').fadeOut(1000);
                    }, 1500);
                }
            );
        });
    },
    function(error) {
        console.log('Error: ' + console.error.message);
    },
    function() {
        console.log('Funciona Correctamente');
    },
};