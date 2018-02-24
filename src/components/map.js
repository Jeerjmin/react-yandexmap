import React from 'react'
import { YMaps, Map } from 'react-yandex-maps'
import points from '../assets/dataMap';


function createZoomControlLayout(ymaps) {

    const ZoomLayout = ymaps.templateLayoutFactory.createClass(
        '<a>$[properties.balloonHeader]</a>' +
        '<div>$[properties.balloonContent]</div>' +
        '<div><a href=$[properties.balloonFooter]>$[properties.balloonFooter]</a></div>'
    )

    return ZoomLayout
}

class Maps extends React.Component {

    constructor(props) {
        super(props);
        this.state = {layout: null, arr: [], collection: []};
    }

    handleApiAvaliable(ymaps) {
        const layout = createZoomControlLayout(ymaps)
        this.setState({ layout: layout })
    }

    handleMapAvaliable(maps) {

        var myCollection = new ymaps.GeoObjectCollection();
        points[this.props.item].map(([lat, lon, header, body,link]) =>  (
            myCollection.add(new ymaps.Placemark([lat, lon], {
                balloonHeader: header,
                balloonContent: body,
                balloonFooter: link
            },
            {
                balloonContentLayout: this.state.layout
            }
            ))))

        if (maps) {
            maps.geoObjects.add(myCollection);
            maps.setBounds(myCollection.getBounds());
        }
    }


    render() {
        return (
            <YMaps onApiAvaliable={(ymaps) => this.handleApiAvaliable(ymaps)} >
                <Map instanceRef={(maps) => this.handleMapAvaliable(maps)}
                    width="100%"
                    state={{center: [30,30], zoom: 10,  controls: ['zoomControl']}}>
                </Map>
            </YMaps>
        )
    }
}

export default Maps
