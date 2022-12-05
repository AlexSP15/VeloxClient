var agenda = {
    addAgenda: function(nombre, telefono, email, ubicacion) {
        base_datos.bd.transaction(
            function(tx) {
                tx.executeSql(
                    'INSERT INTO Agenda(nombre, telefono, email, ubicacion) VALUES (?1, ?2, ?3, ?4)', [nombre, telefono, email, ubicacion],
                    function(tx, resultado) {
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

                        alert('Se añadió correctamente', 'success');

                        setTimeout(function() {
                            $('.alert').fadeOut(1000);
                        }, 1500);
                    },
                    function(tx, error) {
                        console.log(error);
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

                        alert('No se añadió, revisa la conexión', 'danger');

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