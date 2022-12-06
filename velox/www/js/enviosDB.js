var envios = {
    addEnvio: function(
        numeroGuia,
        estatus,
        remitente,
        direccion,
        destinatario,
        referencia
    ) {
        base_datos.bd.transaction(
            function(tx) {
                tx.executeSql(
                    'INSERT INTO envios(numeroGuia, estatus, remitente, direccion, destinatario, referencia) VALUES (?1, ?2, ?3, ?4, ?5, ?6)', [numeroGuia, estatus, remitente, direccion, destinatario, referencia],
                    function(tx, resultado) {
                        console.log('Se añadió correctamente', 'success');
                    },
                    function(tx, error) {
                        console.log('No se añadió, revisa la conexión', 'warning');
                    }
                );
            },
            function(error) {
                console.log('Tenemos un problema' + error.message);
            },
            function() {
                console.log('Todo bien');
            }
        );
    },
    deleteEnvio: function(id) {
        base_datos.bd.transaction(
            function(tx) {
                tx.executeSql(
                    'DELETE FROM envios WHERE id = ?1', [id],
                    function(tx, resultado) {
                        console.log('El envio se eliminó correctamente');
                    },
                    function(tx, error) {
                        console.log('El envio no se eliminó, revisa la conexión');
                    }
                );
            },
            function(error) {
                console.log('Tenemos un problema' + error.message);
            },
            function() {
                console.log('Todo bien');
            }
        );
    },
    updateEnvio: function(id, estatus) {
        base_datos.bd.transaction(
            function(tx) {
                tx.executeSql(
                    'UPDATE envios SET estatus = ?1 WHERE id=?2', [estatus, id],
                    function(tx, resultado) {
                        const alertPlaceholder = document.getElementById(
                            'liveAlertPlaceholderRastrear'
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

                        alert('El envio se actualizó correctamente', 'success');

                        setTimeout(function() {
                            $('.alert').fadeOut(1000);
                        }, 1500);
                    },
                    function(tx, error) {
                        const alertPlaceholder = document.getElementById(
                            'liveAlertPlaceholderRastrear'
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

                        alert('No se actualizó, revisa la conexión', 'warning');

                        setTimeout(function() {
                            $('.alert').fadeOut(1000);
                        }, 1500);
                    }
                );
            },
            function(error) {
                console.log('Tenemos un problema' + error.message);
            },
            function() {
                console.log('Todo bien');
            }
        );
    },
    loadEnvio: function(mostrarEnvios) {
        base_datos.bd.transaction(
            function(tx) {
                tx.executeSql(
                    'SELECT * FROM envios', [],
                    function(tx, resultado) {
                        mostrarEnvios(resultado);
                    },
                    function(tx, error) {
                        const alertPlaceholder = document.getElementById(
                            'liveAlertPlaceholderRastrear'
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

                        alert('Carga no válida, revisa la conexión', 'warning');

                        setTimeout(function() {
                            $('.alert').fadeOut(1000);
                        }, 1500);
                    }
                );
            },
            function(error) {
                console.log('Tenemos un problema' + error.message);
            },
            function() {
                console.log('Todo bien');
            }
        );
    },
};