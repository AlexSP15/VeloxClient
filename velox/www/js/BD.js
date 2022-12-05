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
                    alert('La base de datos ha sido creada');
                },
                function(tx, error) {
                    alert('No se creó la base de datos, verifica la función');
                }
            );
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS envios(id integer primary key, numeroGuia integer, estatus text, remitente text, direccion text, destinatario text, referencia text)', [],
                function(tx, resultado) {
                    alert('La base de datos ha sido creada');
                },
                function(tx, error) {
                    alert('No se creó la base de datos, verifica la función');
                }
            );

            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS Agenda(id integer primary key, nombre text, telefono integer, email text, ubicacion text)', [],
                function(tx, resultado) {
                    alert('La base de datos ha sido creada');
                },
                function(tx, error) {
                    alert('No se creó la base de datos, verifica la función');
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