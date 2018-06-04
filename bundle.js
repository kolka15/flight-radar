!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=1)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t,e){var n=t.__proto__||t.constructor.prototype;return e in t&&(!(e in n)||n[e]!==t[e])}},function(t,e,n){"use strict";var r,o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),a=(r=n(0))&&r.__esModule?r:{default:r};(new(function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.myHeaders=new Headers,this.fetchOpts={method:"GET",headers:this.myHeaders,mode:"cors",cache:"default"},this.url="https://data-live.flightradar24.com/zones/fcgi/feed.js?bounds=56.84,55.27,33.48,41.48",this.airportCoords={lat:55.410307,long:37.902451},this.table=document.getElementById("flights")}return o(t,[{key:"getData",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.url;return fetch(t,this.fetchOpts).then(function(t){return t.json()})}},{key:"init",value:function(){var t=this;setInterval(function(){t.getData().then(function(e){t.renderTable(e)}),console.log(" refresh!")},5e3)}},{key:"renderTable",value:function(t){var e=function(t){return t||"—"},n=this.convertRecievedData(t).map(function(t,n){return"\n                    <tr>\n                        <td>"+e(t[1])+", "+e(t[2])+"</td>\n                        <td>"+e(t.data.speed)+"</td>\n                        <td>"+e(t.data.course)+"°</td>\n                        <td>"+e(t.data.altitude)+"</td>\n                        <td>"+t[11]+" — "+t[12]+"</td>\n                        <td>"+e(t[13])+"</td>\n                    </tr>\n                "});this.table.innerHTML=n.join("")}},{key:"convertRecievedData",value:function(t){var e=this,n=[];for(var r in t)(0,a.default)(t,r)&&t[r].length>1&&n.push(t[r]);return n.forEach(function(t,n){var r,o,a,i,u;t.data={distToAirport:(r=t,o=r[1],a=r[2],i=Math.abs(e.airportCoords.lat-o),u=Math.abs(e.airportCoords.long-a),Math.sqrt(Math.pow(i,2)+Math.pow(u,2))),speed:+(t[5]/.5399568034557).toFixed(1),course:t[3],altitude:+(.3048*t[4]).toFixed(1)}}),n.sort(function(t,e){return t.data.distToAirport-e.data.distToAirport}),n}}]),t}())).init()}]);