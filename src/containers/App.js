import React, { Component } from 'react';
import Maps from '../components/map'
import data from '../assets/data'

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            maps: [
                { showing: false, value: "Open map" },
                { showing: false, value: "Open map" },
                { showing: false, value: "Open map" }
            ]
        };
    }
    onClick(index) {
        if (this.state.maps[index].showing) {
            let maps = this.state.maps;
            maps.forEach((map, i, maps) => {
                map.showing=false; maps[index].showing=false
            })

            this.setState({ maps: maps})
        } else {
            let maps = this.state.maps;
            maps.forEach((map, i, maps) => {
                map.showing=false; maps[index].showing=true
            })

            this.setState({ maps: maps})
        }
    }

    render() {
        return (
            <div className="app">
                {this.state.maps.map((map, index) => (
                    <div key={index}>
                        <h1>{data[index][0]}</h1>
                        <p>{data[index][1]}</p>
                        <input type="button" value={map.value} onClick={e => this.onClick(index)} />
                        <div>{map.showing && <Maps item={index} />}</div>
                    </div>
                ))}
            </div>
        )

    }
}
