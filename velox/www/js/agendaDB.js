var agenda = {
    addAgenda: function(nombre, telefono, email, ubicacion) {
        base_datos.bd.transaction(
            function(tx) {
                tx.executeSql(
                    'INSERT INTO agenda(nombre, telefono, email,ubicacion) VALUES (?1, ?2, ?3, ?4)', [nombre, telefono, email, ubicacion],
                    function(tx, resultado) {
                        alert('Se añadió correctamente');
                    },
                    function(tx, error) {
                        alert('No se añadió, revisa la conexión');
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