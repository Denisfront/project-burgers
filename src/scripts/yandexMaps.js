ymaps.ready(init);

var placemarks = [{
        latitude: 59.97,
        longitude: 30.31,
        hintContent: '<div class="map__hint">ул. Литераторов, д.19</div>',
        balloonContent: [
            '<div class="map__baloon">',
            'Cамые вкусные бургеры у нас! Заходите с 10:00 до 21:00 по адресу: ул. Литераторов, д.19',
            '</div>'
        ]
    },
    {
        latitude: 59.88,
        longitude: 30.31,
        hintContent: '<div class="map__hint">ул. Литераторов, д.19</div>',
        balloonContent: [
            '<div class="map__baloon">',
            'Cамые вкусные бургеры у нас! Заходите с 10:00 до 21:00 по адресу: ул. Литераторов, д.19',
            '</div>'
        ]
    },
    {
        latitude: 59.94,
        longitude: 30.38,
        hintContent: '<div class="map__hint">ул. Литераторов, д.19</div>',
        balloonContent: [
            '<div class="map__baloon">',
            'Cамые вкусные бургеры у нас! Заходите с 10:00 до 21:00 по адресу: ул. Литераторов, д.19',
            '</div>'
        ]
    },
    {
        latitude: 59.91,
        longitude: 30.49,
        hintContent: '<div class="map__hint">ул. Литераторов, д.19</div>',
        balloonContent: [
            '<div class="map__baloon">',
            'Cамые вкусные бургеры у нас! Заходите с 10:00 до 21:00 по адресу: ул. Литераторов, д.19',
            '</div>'
        ]
    }
];

function init() {
    var myMap = new ymaps.Map("map", {
        center: [59.92, 30.32],
        zoom: 11,
        controls: ['zoomControl'],
        behaviors: ['drag']
    });

    placemarks.forEach(function (obj) {
        var Myplacemark = new ymaps.Placemark([obj.latitude, obj.longitude], {
            hintContent: obj.hintContent,
            balloonContent: obj.balloonContent.join('')
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/icons/map-marker.svg',
            iconImageSize: [46, 57],
            iconImageOffset: [-23, -57]
        });
        myMap.geoObjects.add(Myplacemark);
    });


}