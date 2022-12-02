var usuarios = {
    addUser: function(nombre, email, contraseña) {
        base_datos.bd.transaction(
            function(tx) {
                tx.executeSql(
                    'INSERT INTO usuario(nombre, email, contraseña) VALUES (?1, ?2, ?3)', [nombre, email, contraseña],
                    function(tx, resultado) {
                        alert('El usuario se añadió correctamente');
                    },
                    function(tx, error) {
                        alert('El usuario no se añadió, revisa la conexión');
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
    deleteUser: function(id) {
        base_datos.bd.transaction(
            function(tx) {
                tx.executeSql(
                    'DELETE FROM usuario WHERE id = ?1', [id],
                    function(tx, resultado) {
                        alert('El usuario se eliminó correctamente');
                    },
                    function(tx, error) {
                        alert('El usuario no se eliminó, revisa la conexión');
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
    updateUser: function(id, nombre, email, contraseña) {
        base_datos.bd.transaction(
            function(tx) {
                tx.executeSql(
                    'UPDATE usuario SET nombre = ?1, email=?2, contraseña=?3 WHERE id=?4', [nombre, email, contraseña, id],
                    function(tx, resultado) {
                        alert('El usuario se actualizó correctamente');
                    },
                    function(tx, error) {
                        alert('El usuario no se actualizó, revisa la conexión');
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
    loadUser: function(mostrarUsuario) {
        base_datos.bd.transaction(
            function(tx) {
                tx.executeSql(
                    'SELECT * FROM usuario', [],
                    function(tx, resultado) {
                        mostrarUsuario(resultado);
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