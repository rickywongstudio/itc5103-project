'use strict';

const stores = [
    {
        name: "Downtown Toronto",
        location: [43.6542, -79.3808],
        address: "123 Main Street, Toronto, ON M5E 1E4",
        hours: "Monday - Sunday: 11:00am-11:00pm",
        distanceTo: "",
    },
    {
        name: "North York",
        location: [43.7615, -79.4111],
        address: "456 Yonge Street, North York, ON M2N 5M6",
        hours: "Monday - Sunday: 11:00am-10:00pm",
        distanceTo: "",
    },
    {
        name: "Scarborough",
        location: [43.7731, -79.2578],
        address: "789 Markham Road, Scarborough, ON M1H 2Y1",
        hours: "Monday - Sunday: 11:00am-9:00pm",
        distanceTo: "",
    },
    {
        name: "East York",
        location: [43.6995, -79.337],
        address: "1010 Danforth Avenue, East York, ON M4J 1M2",
        hours: "Monday - Sunday: 11:00am-10:00pm",
        distanceTo: "",
    },
    {
        name: "Etobicoke",
        location: [43.6205, -79.5132],
        address: "1111 Islington Avenue, Etobicoke, ON M8Z 4P6",
        hours: "Monday - Sunday: 11:00am-9:00pm",
        distanceTo: "",
    },
    {
        name: "York",
        location: [43.6895, -79.4719],
        address: "2222 Keele Street, York, ON M6M 3Z5",
        hours: "Monday - Sunday: 11:00am-10:00pm",
        distanceTo: "",
    },
    {
        name: "The Beaches",
        location: [43.671, -79.2964],
        address: "3333 Queen Street East, The Beaches, ON M4L 1C6",
        hours: "Monday - Sunday: 11:00am-11:00pm",
        distanceTo: "",
    },
    {
        name: "High Park",
        location: [43.6465, -79.4638],
        address: "4444 Bloor Street West, High Park, ON M9C 1C5",
        hours: "Monday - Sunday: 11:00am-9:00pm",
        distanceTo: "",
    },
    {
        name: "Bloor West Village",
        location: [43.6492, -79.4845],
        address: "5555 Bloor Street West, Toronto, ON M6M 1M4",
        hours: "Monday - Sunday: 11:00am-9:00pm",
        distanceTo: "",
    },
    {
        name: "Leslieville",
        location: [43.6629, -79.337],
        address: "6666 Gerrard Street East, Toronto, ON M4M 2A2",
        hours: "Monday - Sunday: 11:00am-10:00pm",
        distanceTo: "",
    }
];

/////////////////////////////////////////////////////////////
function insertBranches(stores){
  const branchesList = document.getElementById('branches-list');

  for (const store of stores) {
      // Create a list item element
      const listItem = document.createElement('li');
      listItem.className = 'branch';

      // Create a paragraph element for the branch area
      const areaParagraph = document.createElement('p');
      areaParagraph.className = 'branch-area';
      areaParagraph.textContent = store.name;
      listItem.appendChild(areaParagraph);

      // Create a paragraph element for the branch address
      const addressParagraph = document.createElement('p');
      addressParagraph.className = 'branch-address';
      addressParagraph.textContent = store.address;
      listItem.appendChild(addressParagraph);

      // Create a paragraph element for the branch hours
      const hoursParagraph = document.createElement('p');
      hoursParagraph.className = 'branch-hours';
      hoursParagraph.textContent = store.hours;
      listItem.appendChild(hoursParagraph);

      // Add the list item to the branches list
      branchesList.appendChild(listItem);
  }
  return document.querySelectorAll('.branch');
}

function loadMap(map){
  L.tileLayer("http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
      maxZoom: 18,
      subdomains: ["mt0", "mt1", "mt2", "mt3"],
  }).addTo(map);
  //   L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //       maxZoom: 19,
  //       attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  //   }).addTo(map);
  map.setView([43.6532, -79.3832], 13);
}

function addAndGetMarkers(map, stores){
  return stores.map(store=>{
    return L.marker(store.location).addTo(map).bindPopup(store.name)
  });
}

function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) navigator.geolocation.getCurrentPosition(resolve, reject);
        else reject("Geolocation is not supported by this browser.");
    });
}

function centerMapOnGeolocation(map ,position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    console.log(lat,lng)
    map.setView([lat, lng], 13);
    const redMarker = new L.Icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
    L.marker([lat, lng], {icon: redMarker}).addTo(map).bindPopup("You Are Here!").openPopup();
}

function addLocateControl(map) {
    // Create a locate button and add it to the map
    L.control.locate({
        position: "topleft",
        drawCircle: true,
        follow: false,
        setView: true,
        keepCurrentZoomLevel: false,
        markerStyle: {
            weight: 1,
            opacity: 0.8,
            fillOpacity: 0.8,
        },
        circleStyle: {
            weight: 1,
            clickable: false,
        },
        icon: "fa fa-location-arrow",
        metric: true,
        strings: {
            title: "My location",
            popup: "You are within {distance} {unit} from this point",
            outsideMapBoundsMsg: "You seem located outside the boundaries of the map",
        },
    }).addTo(map);
}

function calculateDistances(stores, position) {
    stores.forEach(store => {
        const lat1 = position.coords.latitude;
        const lon1 = position.coords.longitude;
        const lat2 = store.location[0];
        const lon2 = store.location[1];

        const R = 6371e3; // metres
        const φ1 = lat1 * Math.PI / 180;
        const φ2 = lat2 * Math.PI / 180;
        const Δφ = (lat2 - lat1) * Math.PI / 180;
        const Δλ = (lon2 - lon1) * Math.PI / 180;

        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const distance = (R * c) / 1000;
        store.distanceTo = distance.toFixed(1);
    });
}

function insertDistanceHTML(stores) {
    const branchAreas = document.querySelectorAll('.branch-area');
    branchAreas.forEach((branchArea, index) => {
        const distance = stores[index].distanceTo;
        const distanceParagraph = document.createElement('p');
        distanceParagraph.className = 'branch-distance';
        distanceParagraph.textContent = distance + ' km';
        branchArea.parentNode.insertBefore(distanceParagraph, branchArea.nextSibling);
    });
}

function registerEvents(markers, map, stores){
  const branches = document.querySelectorAll('.branch');
  // Activate select branch
  branches.forEach(branch => {
      branch.addEventListener('click', () => {
          branches.forEach(otherBranch => {
              otherBranch.classList.remove('active');
          });
          branch.classList.add('active');
          const location = branch.querySelector('.branch-area').textContent;
          const index = stores.findIndex(branch => branch.name === location);
          const storeLocation = stores[index];
          markers[index].openPopup();
          map.setView(storeLocation.location, 13);
      });
  });
}

async function setup() {
  insertBranches(stores);
  const map = L.map("map");
  loadMap(map);
  const markers = addAndGetMarkers(map, stores);
  registerEvents(markers, map, stores);
  const currentPosition = await getCurrentPosition();
  calculateDistances(stores, currentPosition);
  insertDistanceHTML(stores);
  centerMapOnGeolocation(map, currentPosition);
  addLocateControl(map);
}

setup().catch(console.error);
