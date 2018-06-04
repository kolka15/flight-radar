import hasOwnProperty from './hasOwnProp'

class Flights {
    constructor() {
        this.myHeaders = new Headers();
        this.fetchOpts = {
            method: 'GET',
            headers: this.myHeaders,
            mode: 'cors',
            cache: 'default',
        };
        this.url = 'https://data-live.flightradar24.com/zones/fcgi/feed.js?bounds=56.84,55.27,33.48,41.48';
        this.airportCoords = {
            lat: 55.410307,
            long: 37.902451
        };
        this.table = document.getElementById('flights')
    }

    getData(url = this.url) {
        return fetch(url, this.fetchOpts).then(response => response.json())
    }

    init() {
        setInterval(()=>{
            this.getData().then(data => {
                this.renderTable(data)
            });
            console.log(
                ' refresh!',
            );
        }, 5000);

    }

    renderTable(data) {
        let defaultNone = (item) => item ? item : '—';
        let table = this.convertRecievedData(data).map((item, i) => {
            return `
                    <tr>
                        <td>${defaultNone(item[1])}, ${defaultNone(item[2])}</td>
                        <td>${defaultNone(item.data.speed)}</td>
                        <td>${defaultNone(item.data.course)}°</td>
                        <td>${defaultNone(item.data.altitude)}</td>
                        <td>${item[11]} — ${item[12]}</td>
                        <td>${defaultNone(item[13])}</td>
                    </tr>
                `
        });
        this.table.innerHTML = table.join('');
    }

    convertRecievedData(data) {
        let newData = [];

        let getDistanceToAirport = (plane) => {
            let planeLat = plane[1];
            let planeLong = plane[2];
            let planeX = Math.abs(this.airportCoords.lat - planeLat);
            let planeY = Math.abs(this.airportCoords.long - planeLong);
            return Math.sqrt(Math.pow(planeX, 2) + Math.pow(planeY, 2))
        };

        for (let item in data) {
            if (hasOwnProperty(data, item)) {
                if (data[item].length > 1) {
                    newData.push(data[item]);
                }
            }
        }

        newData.forEach((item, i) => {
            item.data = {
                distToAirport: getDistanceToAirport(item),
                speed: +(item[5] / 0.5399568034557).toFixed(1),
                course: item[3],
                altitude: +(item[4] * 0.3048).toFixed(1)
            };
        });

        newData.sort((a, b) => {
            return a.data.distToAirport - b.data.distToAirport
        });

        return newData;
    }
}

new Flights().init();