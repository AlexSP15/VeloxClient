document.addEventListener("deviceready",onDeviceReady,false);
            function onDeviceReady(){
                console.log("listo");   
            }

            function getDatos(){
                navigator.geolocation.getCurrentPosition(onSuccess,onError,{maximunAge: 300000,timeout:10000, enableHighAccuracy:true});
            }
        
            function onSuccess(position){
                var latitud=document.getElementById("lat");
                var longitud=document.getElementById("lon");
                latitud.innerHTML=""+position.coords.latitude;
                longitud.innerHTML=""+position.coords.longitude;
                var coords= new google.maps.LatLng(position.coords.latitude,position.coords.longitude);

                var opciones = {center: coords, zoom: 15, mapTypeId: google.maps.MapTypeId.ROADMAP};

                var mapa = new google.maps.Map(document.getElementById("map"),opciones);

                var marcador= new google.maps.Marker({
                    position:coords,
                    map: mapa,
                    title: ":D",
                    animation: google.maps.Animation.DROP
                });

            }

            function onError(err){ 
                console.log("codigo de err:"+err.code+"  msj="+err.message);
            }

            