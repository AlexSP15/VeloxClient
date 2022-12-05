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
                        alert('El envio se añadió correctamente');
                    },
                    function(tx, error) {
                        alert('El envio no se añadió, revisa la conexión');
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
                        alert('El envio se eliminó correctamente');
                    },
                    function(tx, error) {
                        alert('El envio no se eliminó, revisa la conexión');
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
    updateEnvio: function(
        id,
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
                    'UPDATE envios SET numeroGuia = ?1, estatus = ?2, remitente = ?3, direccion = ?4, destinatario = ?5, referencia = ?6 WHERE id=?7', [
                        numeroGuia,
                        estatus,
                        remitente,
                        direccion,
                        destinatario,
                        referencia,
                        id,
                    ],
                    function(tx, resultado) {
                        alert('El envio se actualizó correctamente');
                    },
                    function(tx, error) {
                        alert('El envio no se actualizó, revisa la conexión');
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
                        alert('Carga no válida, revisa la conexión');
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