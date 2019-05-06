var map;
var idInfoBoxAberto;
var infoBox = [];
var markers = [];

function initialize() {	
	//var latlng = new google.maps.LatLng(-18.8800397, -47.05878999999999);
	var latlng = new google.maps.LatLng(-16,6297, -49,234);
	
    var options = {
        zoom: 13,
		center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
        
    };

    map = new google.maps.Map(document.getElementById("mapa"), options);
    var Item_1 = new google.maps.LatLng(-16,6297, -49,234);
    var marker = new google.maps.Marker({
        position: Item_1,
        map: map
    });
    var bounds = new google.maps.LatLngBounds();
    
    bounds.extend(Item_1);
    map.fitBounds(bounds);
}

initialize();

function abrirInfoBox(id, marker) {
	if (typeof(idInfoBoxAberto) == 'number' && typeof(infoBox[idInfoBoxAberto]) == 'object') {
		infoBox[idInfoBoxAberto].close();
	}

	infoBox[id].open(map, marker);
	idInfoBoxAberto = id;
}

function carregarPontos() {
	
	$.getJSON('js/data.json', function(pontos) {
		
		var latlngbounds = new google.maps.LatLngBounds();
		
		$.each(pontos, function(index, ponto) {
			
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(ponto.latitude, ponto.longitude),
				title: "Ponto a ser personalizado! :-D",
				icon: 'img/marcador.png'
			});
			
			var myOptions = {
				content: "<p>" + ponto.municipio + "</p>",
				pixelOffset: new google.maps.Size(-150, 0)
        	};

			/*infoBox[ponto.Id] = new InfoBox(myOptions);
			infoBox[ponto.Id].marker = marker;
			
			infoBox[ponto.Id].listener = google.maps.event.addListener(marker, 'click', function (e) {
				abrirInfoBox(ponto.Id, marker);
			});*/
			
			markers.push(marker);
			
			latlngbounds.extend(marker.position);
			
		});
		
		
		var markerCluster = new MarkerClusterer(map, markers,
{imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

	
		map.fitBounds(latlngbounds);
		
	});
	
}

carregarPontos();