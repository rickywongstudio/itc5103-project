'use strict';

const map = L.map("map");
const userLocation = [];
const markers = [];
const storeLocations = [
    {
        name: "Downtown Toronto", location: [43.6542, -79.3808],
        address: "123 Main Street, Toronto, ON",
        hours: "Monday-Sunday: 11:00am-11:00pm",
        distanceTo: "",
    },
    {
        name: "North York",
        location: [43.7615, -79.4111],
        address: "456 Yonge Street, North York, ON",
        hours: "Monday-Sunday: 11:00am-10:00pm",
        distanceTo: "",
    },
    {
        name: "Scarborough",
        location: [43.7731, -79.2578],
        address: "789 Markham Road, Scarborough, ON",
        hours: "Monday-Sunday: 11:00am-9:00pm",
        distanceTo: "",
    },
    {
        name: "East York",
        location: [43.6995, -79.337],
        address: "1010 Danforth Avenue, East York, ON",
        hours: "Monday-Sunday: 11:00am-10:00pm",
        distanceTo: "",
    },
    {
        name: "Etobicoke",
        location: [43.6205, -79.5132],
        address: "1111 Islington Avenue, Etobicoke, ON",
        hours: "Monday-Sunday: 11:00am-9:00pm",
        distanceTo: "",
    },
    {
        name: "York",
        location: [43.6895, -79.4719],
        address: "2222 Keele Street, York, ON",
        hours: "Monday-Sunday: 11:00am-10:00pm",
        distanceTo: "",
    },
    {
        name: "The Beaches",
        location: [43.671, -79.2964],
        address: "3333 Queen Street East, The Beaches, ON",
        hours: "Monday-Sunday: 11:00am-11:00pm",
        distanceTo: "",
    },
    {
        name: "High Park",
        location: [43.6465, -79.4638],
        address: "4444 Bloor Street West, High Park, ON",
        hours: "Monday-Sunday: 11:00am-9:00pm",
        distanceTo: "",
    },
    {
        name: "Bloor West Village",
        location: [43.6492, -79.4845],
        address: "4444 Bloor Street West, Toronto, ON",
        hours: "Monday-Sunday: 11:00am-9:00pm",
        distanceTo: "",
    },
    {
        name: "Leslieville",
        location: [43.6629, -79.337],
        address: "5555 Gerrard Street East, Toronto, ON",
        hours: "Monday-Sunday: 11:00am-10:00pm",
        distanceTo: "",
    }
];
const branchesList = document.getElementById('branches-list');

for (const location of storeLocations) {
    // Create a list item element
    const listItem = document.createElement('li');
    listItem.className = 'branch';

    // Create a paragraph element for the branch area
    const areaParagraph = document.createElement('p');
    areaParagraph.className = 'branch-area';
    areaParagraph.textContent = location.name;
    listItem.appendChild(areaParagraph);

    // Create a paragraph element for the branch address
    const addressParagraph = document.createElement('p');
    addressParagraph.className = 'branch-address';
    addressParagraph.textContent = location.address;
    listItem.appendChild(addressParagraph);

    // Create a paragraph element for the branch hours
    const hoursParagraph = document.createElement('p');
    hoursParagraph.className = 'branch-hours';
    hoursParagraph.textContent = location.hours;
    listItem.appendChild(hoursParagraph);

    // Add the list item to the branches list
    branchesList.appendChild(listItem);
}

const branches = document.querySelectorAll('.branch');

////////////////////////////////////////////////////////////////////////

// MAP
// Load the map
L.tileLayer("http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
    maxZoom: 18,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
}).addTo(map);

// Load the marker and store it into markers array
for (const store of storeLocations) {
    const marker = L.marker(store.location).addTo(map).bindPopup(store.name);
    markers.push(marker);
}

// get the user's current position

// // center the map on user's Location
// function centerMapOnGeolocation() {
//     getCurrentPosition().then(position => {
//         const lat = position.coords.latitude;
//         const lng = position.coords.longitude;
//         // Store the userLocation
//         userLocation.push(lat, lng);
//         map.setView([lat, lng], 13);
//     }).catch(error => {
//         console.log(error);
//     });
// }
//
// centerMapOnGeolocation();

function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        } else {
            reject("Geolocation is not supported by this browser.");
        }
    });
}

function centerMapOnGeolocation(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    // Store the userLocation
    userLocation.push(lat, lng);
    map.setView([lat, lng], 13);
}

getCurrentPosition()
    .then(centerMapOnGeolocation)
    .catch(error => {
        console.log(error);
    });


// SIDEBAR
// Insert the store locations into HTML

// Loop through each store location and calculate the distance to the user location
// function calculateDistances() {
//     return getCurrentPosition().then(() => {
//         storeLocations.forEach(store => {
//             const lat1 = userLocation[0];
//             const lon1 = userLocation[1];
//             const lat2 = store.location[0];
//             const lon2 = store.location[1];
//
//             const R = 6371e3; // metres
//             const φ1 = lat1 * Math.PI / 180;
//             const φ2 = lat2 * Math.PI / 180;
//             const Δφ = (lat2 - lat1) * Math.PI / 180;
//             const Δλ = (lon2 - lon1) * Math.PI / 180;
//
//             const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
//                 Math.cos(φ1) * Math.cos(φ2) *
//                 Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
//             const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//
//             const distance = (R * c) / 1000;
//             store.distanceTo = distance.toFixed(1);
//         });
//     }).catch(error => {
//         console.log(error)
//     });
// }
//
// // Insert the distance value into HTML
// function insertDistanceHTML() {
//     const branchAreas = document.querySelectorAll('.branch-area');
//     branchAreas.forEach((branchArea, index) => {
//         const distance = storeLocations[index].distanceTo;
//         const distanceParagraph = document.createElement('p');
//         distanceParagraph.className = 'branch-distance';
//         distanceParagraph.textContent = distance + ' km';
//         branchArea.parentNode.insertBefore(distanceParagraph, branchArea.nextSibling);
//     });
// }
// calculateDistances().then(() => {
//     insertDistanceHTML();
// }).catch(error => {
//     console.log(error);
// });



function calculateDistances() {
    storeLocations.forEach(store => {
        const lat1 = userLocation[0];
        const lon1 = userLocation[1];
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
    return Promise.resolve();
}

function insertDistanceHTML() {
    const branchAreas = document.querySelectorAll('.branch-area');
    branchAreas.forEach((branchArea, index) => {
        const distance = storeLocations[index].distanceTo;
        const distanceParagraph = document.createElement('p');
        distanceParagraph.className = 'branch-distance';
        distanceParagraph.textContent = distance + ' km';
        branchArea.parentNode.insertBefore(distanceParagraph, branchArea.nextSibling);
    });
}

getCurrentPosition().then(() => {
    return calculateDistances();
}).then(() => {
    insertDistanceHTML();
}).catch(error => {
    console.log(error);
});


// Activate select branch
branches.forEach(branch => {
    branch.addEventListener('click', () => {
        branches.forEach(otherBranch => {
            otherBranch.classList.remove('active');
        });
        branch.classList.add('active');
        const location = branch.querySelector('.branch-area').textContent;
        const index = storeLocations.findIndex(branch => branch.name === location);
        const storeLocation = storeLocations[index];
        markers[index].openPopup();
        map.setView(storeLocation.location, 13);
    });
});



////////////////////////////////////////////////////////////////////////
// map.setView([43.6532, -79.3832], 13); // Coordinates of Toronto