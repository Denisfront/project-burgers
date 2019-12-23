ymaps.ready(init);
function init(){
    var myMap = new ymaps.Map("map", {
        center: [59.92, 30.28],
        zoom: 12,
        controls: ['zoomControl'],
        behaviors: ['drag']
    });

    var Myplacemark = new ymaps.Placemark([59.97, 30.31], {
        hintContent: '<div class="map__hint">ул. Литераторов, д.19</div>',
        balloonContent: [
            '<div class="map__baloon">',
            'Cамые вкусные бургеры у нас! Заходите с 10:00 до 21:00 по адресу: ул. Литераторов, д.19',
            '</div>'
        ].join('')
    },
    {
        iconLayout: 'default#image',
        iconImageHref: 'img/icons/map-marker.svg',
        iconImageSize: [92, 69]
    });

    myMap.geoObjects.add(Myplacemark);
}