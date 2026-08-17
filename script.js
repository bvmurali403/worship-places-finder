/* =====================================================
   WORSHIP PLACES FINDER
   PHASE 6 FINAL JAVASCRIPT
===================================================== */


/* =====================================================
   ELEMENTS
===================================================== */

const searchInput =
    document.getElementById("searchInput");

const searchBtn =
    document.getElementById("searchBtn");

const resetBtn =
    document.getElementById("resetBtn");

const viewAllBtn =
    document.getElementById("viewAllBtn");

const locationBtn =
    document.getElementById("locationBtn");

const findNearbyBtn =
    document.getElementById("findNearbyBtn");

const historyBtn =
    document.getElementById("historyBtn");

const themeBtn =
    document.getElementById("themeBtn");

const sortSelect =
    document.getElementById("sortSelect");

const locationStatus =
    document.getElementById("locationStatus");

const resultCount =
    document.getElementById("resultCount");

const placesContainer =
    document.getElementById("placesContainer");

const placeCards =
    document.querySelectorAll(".place-card");

const categoryCards =
    document.querySelectorAll(".category-card");

const loading =
    document.getElementById("loading");

const noResults =
    document.getElementById("noResults");


/* =====================================================
   MODAL
===================================================== */

const modal =
    document.getElementById("detailsModal");

const closeModal =
    document.getElementById("closeModal");

const modalTitle =
    document.getElementById("modalTitle");

const modalType =
    document.getElementById("modalType");

const modalDetails =
    document.getElementById("modalDetails");

const modalFacilities =
    document.getElementById("modalFacilities");

const modalArchitecture =
    document.getElementById("modalArchitecture");

const modalHours =
    document.getElementById("modalHours");

const modalContact =
    document.getElementById("modalContact");

const modalLocation =
    document.getElementById("modalLocation");

const modalReviews =
    document.getElementById("modalReviews");

const modalGallery =
    document.getElementById("modalGallery");

const modalDirections =
    document.getElementById("modalDirections");

const modalShare =
    document.getElementById("modalShare");


/* =====================================================
   STORAGE
===================================================== */

let favorites =
    JSON.parse(
        localStorage.getItem(
            "worshipFavorites"
        )
    ) || [];

let recentlyViewed =
    JSON.parse(
        localStorage.getItem(
            "recentlyViewed"
        )
    ) || [];


/* =====================================================
   CURRENT LOCATION
===================================================== */

let userLatitude = null;
let userLongitude = null;


/* =====================================================
   MAP
===================================================== */

let map = null;

let userMarker = null;

let placeMarkers = [];


/* =====================================================
   PLACE INFORMATION
===================================================== */

const placeInformation = {

    "Sri Venkateswara Temple": {

        architecture:
            "Traditional South Indian Dravidian temple architecture.",

        hours:
            "05:00 AM - 09:00 PM",

        contact:
            "+91 98765 43210",

        history:
            "A traditional Hindu temple dedicated to Lord Venkateswara.",

        facilities: [
            "🅿️ Parking",
            "♿ Accessible",
            "🚻 Restrooms",
            "🍽️ Food",
            "🙏 Prayer Hall"
        ],

        reviews: [
            ["Visitor", "⭐ 5", "Beautiful and peaceful temple."],
            ["Devotee", "⭐ 5", "Well maintained and spiritual."]
        ]

    },


    "Central Mosque": {

        architecture:
            "Contemporary Islamic architecture with prayer halls and traditional elements.",

        hours:
            "05:00 AM - 09:30 PM",

        contact:
            "+91 98765 43211",

        history:
            "A community mosque providing prayer and religious services.",

        facilities: [
            "🅿️ Parking",
            "🚻 Restrooms",
            "💧 Drinking Water",
            "♿ Accessible",
            "🕌 Prayer Hall"
        ],

        reviews: [
            ["Visitor", "⭐ 5", "Clean and peaceful environment."],
            ["Visitor", "⭐ 4", "Very welcoming community."]
        ]

    },


    "St. Mary's Church": {

        architecture:
            "Classical Christian church architecture with a large prayer hall.",

        hours:
            "06:00 AM - 08:30 PM",

        contact:
            "+91 98765 43212",

        history:
            "A Christian place of worship serving the local community.",

        facilities: [
            "🅿️ Parking",
            "♿ Accessible",
            "🚻 Restrooms",
            "🎵 Choir",
            "🙏 Prayer Hall"
        ],

        reviews: [
            ["Visitor", "⭐ 5", "Peaceful church."],
            ["Visitor", "⭐ 4", "Beautiful architecture."]
        ]

    },


    "Local Gurdwara": {

        architecture:
            "Sikh religious architecture featuring a prayer hall and community kitchen.",

        hours:
            "04:00 AM - 10:00 PM",

        contact:
            "+91 98765 43213",

        history:
            "A Sikh place of worship with community services and langar.",

        facilities: [
            "🍽️ Langar",
            "🅿️ Parking",
            "🚻 Restrooms",
            "♿ Accessible",
            "🙏 Prayer Hall"
        ],

        reviews: [
            ["Visitor", "⭐ 5", "Amazing langar service."],
            ["Visitor", "⭐ 5", "Very peaceful place."]
        ]

    },


    "Buddhist Temple": {

        architecture:
            "Buddhist-inspired architecture designed for meditation and reflection.",

        hours:
            "06:00 AM - 07:30 PM",

        contact:
            "+91 98765 43214",

        history:
            "A peaceful Buddhist worship and meditation centre.",

        facilities: [
            "🧘 Meditation",
            "🅿️ Parking",
            "♿ Accessible",
            "🌳 Garden",
            "🚻 Restrooms"
        ],

        reviews: [
            ["Visitor", "⭐ 5", "Extremely peaceful atmosphere."],
            ["Visitor", "⭐ 4", "Great meditation environment."]
        ]

    },


    "Jain Temple": {

        architecture:
            "Detailed Jain temple architecture with ornamental stonework.",

        hours:
            "06:00 AM - 08:00 PM",

        contact:
            "+91 98765 43215",

        history:
            "A Jain place of worship supporting prayer and meditation.",

        facilities: [
            "🧘 Meditation",
            "🅿️ Parking",
            "🚻 Restrooms",
            "♿ Accessible",
            "🙏 Prayer Hall"
        ],

        reviews: [
            ["Visitor", "⭐ 5", "Very clean and peaceful."],
            ["Visitor", "⭐ 4", "Beautiful temple."]
        ]

    },


    "Jewish Synagogue": {

        architecture:
            "Synagogue architecture combining traditional and modern elements.",

        hours:
            "08:00 AM - 07:00 PM",

        contact:
            "+91 98765 43216",

        history:
            "A Jewish community worship and cultural centre.",

        facilities: [
            "🅿️ Parking",
            "♿ Accessible",
            "📚 Library",
            "🚻 Restrooms",
            "🙏 Prayer Hall"
        ],

        reviews: [
            ["Visitor", "⭐ 5", "Interesting architecture."],
            ["Visitor", "⭐ 4", "Quiet and welcoming."]
        ]

    },


    "Zoroastrian Fire Temple": {

        architecture:
            "Traditional Zoroastrian religious architecture centred around the sacred fire.",

        hours:
            "07:00 AM - 07:00 PM",

        contact:
            "+91 98765 43217",

        history:
            "A Zoroastrian worship place associated with sacred fire traditions.",

        facilities: [
            "🔥 Sacred Fire",
            "🅿️ Parking",
            "📚 Library",
            "♿ Accessible",
            "🚻 Restrooms",
            "🙏 Prayer Area"
        ],

        reviews: [
            ["Visitor", "⭐ 5", "Very peaceful and meaningful place."],
            ["Visitor", "⭐ 4", "Interesting cultural experience."]
        ]

    }

};


/* =====================================================
   TOAST
===================================================== */

function showToast(message) {

    const toast =
        document.getElementById("toast");

    const toastMessage =
        document.getElementById(
            "toastMessage"
        );

    toastMessage.textContent =
        message;

    toast.classList.add("show");

    setTimeout(function() {

        toast.classList.remove("show");

    }, 2500);

}


/* =====================================================
   RESULT COUNT
===================================================== */

function updateResultCount() {

    let visible = 0;

    placeCards.forEach(function(card) {

        if (
            card.style.display !== "none"
        ) {

            visible++;

        }

    });

    resultCount.textContent =
        "Showing " +
        visible +
        " worship place" +
        (visible === 1 ? "" : "s");

    noResults.classList.toggle(
        "show",
        visible === 0
    );

}


/* =====================================================
   SEARCH
===================================================== */

function searchPlaces() {

    const text =
        searchInput.value
            .toLowerCase()
            .trim();

    placeCards.forEach(function(card) {

        const name =
            card.dataset.name
                .toLowerCase();

        const category =
            card.dataset.category
                .toLowerCase();

        const type =
            card.querySelector("p")
                .textContent
                .toLowerCase();

        const matches =
            text === "" ||
            name.includes(text) ||
            category.includes(text) ||
            type.includes(text);

        card.style.display =
            matches ? "block" : "none";

    });

    updateResultCount();

}


/* Search button */

searchBtn.addEventListener(
    "click",
    searchPlaces
);


/* Enter */

searchInput.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Enter"
        ) {

            searchPlaces();

        }

    }
);


/* =====================================================
   CATEGORY FILTER
===================================================== */

categoryCards.forEach(function(card) {

    card.addEventListener(
        "click",
        function() {

            const category =
                card.dataset.category;

            placeCards.forEach(
                function(place) {

                    place.style.display =
                        place.dataset.category ===
                        category
                            ? "block"
                            : "none";

                }
            );

            updateResultCount();

            document
                .getElementById("places")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }
    );

});


/* =====================================================
   RESET
===================================================== */

resetBtn.addEventListener(
    "click",
    function() {

        searchInput.value = "";

        placeCards.forEach(
            function(card) {

                card.style.display =
                    "block";

            }
        );

        updateResultCount();

        showToast(
            "Showing all worship places"
        );

    }
);


/* =====================================================
   VIEW ALL
===================================================== */

viewAllBtn.addEventListener(
    "click",
    function() {

        resetBtn.click();

    }
);


/* =====================================================
   SORT
===================================================== */

sortSelect.addEventListener(
    "change",
    function() {

        const cards =
            Array.from(
                placeCards
            );

        const mode =
            sortSelect.value;

        cards.sort(function(a, b) {

            if (
                mode === "distance"
            ) {

                return (
                    Number(a.dataset.distance) -
                    Number(b.dataset.distance)
                );

            }

            if (
                mode === "rating"
            ) {

                return (
                    Number(b.dataset.rating) -
                    Number(a.dataset.rating)
                );

            }

            if (
                mode === "name"
            ) {

                return a.dataset.name
                    .localeCompare(
                        b.dataset.name
                    );

            }

            return 0;

        });

        cards.forEach(function(card) {

            placesContainer.appendChild(
                card
            );

        });

        showToast(
            "Places sorted"
        );

    }
);


/* =====================================================
   FAVORITES
===================================================== */

function saveFavorites() {

    localStorage.setItem(
        "worshipFavorites",
        JSON.stringify(
            favorites
        )
    );

}


function toggleFavorite(card) {

    const name =
        card.dataset.name;

    const index =
        favorites.indexOf(name);

    const button =
        card.querySelector(
            ".favorite-btn"
        );

    if (index === -1) {

        favorites.push(name);

        button.classList.add(
            "active"
        );

        button.textContent = "♥";

        showToast(
            "❤️ Added to favorites"
        );

    } else {

        favorites.splice(
            index,
            1
        );

        button.classList.remove(
            "active"
        );

        button.textContent = "♡";

        showToast(
            "Removed from favorites"
        );

    }

    saveFavorites();

    renderFavorites();

}


/* Attach favorite buttons */

document
    .querySelectorAll(
        ".favorite-btn"
    )
    .forEach(function(button) {

        button.addEventListener(
            "click",
            function(event) {

                event.stopPropagation();

                const card =
                    button.closest(
                        ".place-card"
                    );

                toggleFavorite(card);

            }
        );

    });


/* =====================================================
   RESTORE FAVORITES
===================================================== */

function restoreFavorites() {

    placeCards.forEach(function(card) {

        if (
            favorites.includes(
                card.dataset.name
            )
        ) {

            const button =
                card.querySelector(
                    ".favorite-btn"
                );

            button.classList.add(
                "active"
            );

            button.textContent =
                "♥";

        }

    });

}


/* =====================================================
   FAVORITE DISPLAY
===================================================== */

function renderFavorites() {

    const container =
        document.getElementById(
            "favoritePlaces"
        );

    container.innerHTML = "";

    if (
        favorites.length === 0
    ) {

        container.innerHTML =
            '<p class="empty-message">No favorite places yet.</p>';

        return;

    }

    favorites.forEach(function(name) {

        const card =
            document.createElement(
                "div"
            );

        card.className =
            "recent-card";

        card.innerHTML = `
            <h3>❤️ ${name}</h3>
            <p>Saved worship place</p>
        `;

        card.addEventListener(
            "click",
            function() {

                const original =
                    Array.from(
                        placeCards
                    ).find(function(item) {

                        return (
                            item.dataset.name ===
                            name
                        );

                    });

                if (original) {

                    showDetails(
                        original.querySelector(
                            ".details-btn"
                        )
                    );

                }

            }
        );

        container.appendChild(card);

    });

}


/* =====================================================
   RECENTLY VIEWED
===================================================== */

function saveRecentlyViewed(name) {

    recentlyViewed =
        recentlyViewed.filter(
            function(item) {

                return item !== name;

            }
        );

    recentlyViewed.unshift(name);

    recentlyViewed =
        recentlyViewed.slice(0, 6);

    localStorage.setItem(
        "recentlyViewed",
        JSON.stringify(
            recentlyViewed
        )
    );

    renderRecentlyViewed();

}


function renderRecentlyViewed() {

    const container =
        document.getElementById(
            "recentPlaces"
        );

    container.innerHTML = "";

    if (
        recentlyViewed.length === 0
    ) {

        container.innerHTML =
            '<p class="empty-message">No recently viewed places.</p>';

        return;

    }

    recentlyViewed.forEach(function(name) {

        const card =
            document.createElement(
                "div"
            );

        card.className =
            "recent-card";

        card.innerHTML = `
            <h3>${name}</h3>
            <p>Recently viewed</p>
        `;

        card.addEventListener(
            "click",
            function() {

                const original =
                    Array.from(
                        placeCards
                    ).find(function(item) {

                        return (
                            item.dataset.name ===
                            name
                        );

                    });

                if (original) {

                    showDetails(
                        original.querySelector(
                            ".details-btn"
                        )
                    );

                }

            }
        );

        container.appendChild(card);

    });

}


/* =====================================================
   SHOW DETAILS
===================================================== */

function showDetails(button) {

    const card =
        button.closest(
            ".place-card"
        );

    const name =
        card.dataset.name;

    const category =
        card.querySelector("p")
            .textContent;

    const data =
        placeInformation[name] ||
        {};

    modalTitle.textContent =
        name;

    modalType.textContent =
        category;

    modalArchitecture.textContent =
        data.architecture ||
        "Information unavailable.";

    modalHours.textContent =
        data.hours ||
        "Information unavailable.";

    modalContact.textContent =
        data.contact ||
        "Information unavailable.";

    modalLocation.textContent =
        "Coordinates available through map.";

    modalDetails.innerHTML = `
        <p>
            ${data.history ||
            "Explore this worship place and its facilities."}
        </p>
    `;

    modalFacilities.innerHTML = "";

    (
        data.facilities ||
        []
    ).forEach(function(facility) {

        const span =
            document.createElement(
                "span"
            );

        span.textContent =
            facility;

        modalFacilities.appendChild(
            span
        );

    });


    /* Reviews */

    modalReviews.innerHTML = "";

    (
        data.reviews ||
        []
    ).forEach(function(review) {

        const div =
            document.createElement(
                "div"
            );

        div.className =
            "review";

        div.innerHTML = `
            <strong>
                ${review[0]} — ${review[1]}
            </strong>

            <p>
                ${review[2]}
            </p>
        `;

        modalReviews.appendChild(
            div
        );

    });


    /* Gallery */

    const image =
        card.querySelector(
            "img"
        );

    if (
        image &&
        image.src
    ) {

        modalGallery.innerHTML = `
            <img
                src="${image.src}"
                alt="${name}"
                style="
                    width:100%;
                    height:100%;
                    object-fit:cover;
                    border-radius:12px;
                "
            >
        `;

    } else {

        modalGallery.textContent =
            "🛕";

    }


    /* Directions */

    const lat =
        card.dataset.lat;

    const lng =
        card.dataset.lng;

    modalDirections.onclick =
        function() {

            openDirections(
                lat,
                lng
            );

        };


    /* Share */

    modalShare.onclick =
        function() {

            sharePlace(name);

        };


    saveRecentlyViewed(name);

    modal.classList.add(
        "show"
    );

}


/* =====================================================
   CLOSE MODAL
===================================================== */

closeModal.addEventListener(
    "click",
    function() {

        modal.classList.remove(
            "show"
        );

    }
);


modal.addEventListener(
    "click",
    function(event) {

        if (
            event.target === modal
        ) {

            modal.classList.remove(
                "show"
            );

        }

    }
);


document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape"
        ) {

            modal.classList.remove(
                "show"
            );

        }

    }
);


/* =====================================================
   SHARE
===================================================== */

function sharePlace(name) {

    const shareData = {

        title:
            name,

        text:
            "Check out " +
            name +
            " on Worship Places Finder.",

        url:
            window.location.href

    };

    if (
        navigator.share
    ) {

        navigator.share(
            shareData
        ).catch(
            function() {}
        );

    } else {

        navigator.clipboard
            .writeText(
                window.location.href
            )
            .then(function() {

                showToast(
                    "🔗 Link copied"
                );

            })
            .catch(function() {

                showToast(
                    "Share link unavailable"
                );

            });

    }

}


/* =====================================================
   DIRECTIONS
===================================================== */

function openDirections(
    latitude,
    longitude
) {

    const url =
        "https://www.google.com/maps/dir/?api=1&destination=" +
        latitude +
        "," +
        longitude;

    window.open(
        url,
        "_blank"
    );

}


/* =====================================================
   LOCATION
===================================================== */

function detectLocation() {

    if (
        !navigator.geolocation
    ) {

        locationStatus.textContent =
            "⚠️ Geolocation is not supported.";

        return;

    }

    locationStatus.textContent =
        "📍 Detecting your location...";

    navigator.geolocation.getCurrentPosition(

        function(position) {

            userLatitude =
                position.coords.latitude;

            userLongitude =
                position.coords.longitude;

            locationStatus.textContent =
                "📍 Location detected: " +
                userLatitude.toFixed(4) +
                ", " +
                userLongitude.toFixed(4);

            updateDistances();

            initializeMap();

            showToast(
                "📍 Location detected"
            );

        },

        function(error) {

            let message =
                "Unable to access your location.";

            if (
                error.code === 1
            ) {

                message =
                    "Location permission was denied.";

            }

            locationStatus.textContent =
                "⚠️ " + message;

            showToast(
                message
            );

        },

        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }

    );

}


locationBtn.addEventListener(
    "click",
    detectLocation
);

findNearbyBtn.addEventListener(
    "click",
    function() {

        detectLocation();

        document
            .getElementById(
                "mapSection"
            )
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);


/* =====================================================
   DISTANCE CALCULATION
===================================================== */

function calculateDistance(
    lat1,
    lon1,
    lat2,
    lon2
) {

    const R = 6371;

    const dLat =
        (lat2 - lat1) *
        Math.PI / 180;

    const dLon =
        (lon2 - lon1) *
        Math.PI / 180;

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(
            lat1 * Math.PI / 180
        ) *
        Math.cos(
            lat2 * Math.PI / 180
        ) *
        Math.sin(dLon / 2) ** 2;

    const c =
        2 *
        Math.atan2(
            Math.sqrt(a),
            Math.sqrt(1 - a)
        );

    return R * c;

}


/* =====================================================
   UPDATE DISTANCES
===================================================== */

function updateDistances() {

    if (
        userLatitude === null
    ) {

        return;

    }

    placeCards.forEach(
        function(card) {

            const lat =
                Number(
                    card.dataset.lat
                );

            const lng =
                Number(
                    card.dataset.lng
                );

            const distance =
                calculateDistance(
                    userLatitude,
                    userLongitude,
                    lat,
                    lng
                );

            card.dataset.distance =
                distance.toFixed(2);

            const spans =
                card.querySelectorAll(
                    ".place-details span"
                );

            if (
                spans.length > 1
            ) {

                spans[1].textContent =
                    "📍 " +
                    distance.toFixed(1) +
                    " km";

            }

        }
    );

}


/* =====================================================
   MAP INITIALIZATION
===================================================== */

function initializeMap() {

    if (
        map !== null
    ) {

        map.setView(
            [
                userLatitude,
                userLongitude
            ],
            13
        );

        updateMapMarkers();

        return;

    }

    map =
        L.map(
            "map"
        ).setView(
            [
                userLatitude ||
                20.5937,

                userLongitude ||
                78.9629
            ],

            userLatitude
                ? 13
                : 5
        );


    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            maxZoom: 19,
            attribution:
                '&copy; OpenStreetMap contributors'
        }
    ).addTo(map);

    updateMapMarkers();

}


/* =====================================================
   MAP MARKERS
===================================================== */

function updateMapMarkers() {

    if (
        !map
    ) {

        return;

    }


    /* Remove old */

    placeMarkers.forEach(
        function(marker) {

            map.removeLayer(
                marker
            );

        }
    );

    placeMarkers = [];


    /* User marker */

    if (
        userLatitude !== null
    ) {

        if (
            userMarker
        ) {

            map.removeLayer(
                userMarker
            );

        }

        userMarker =
            L.marker(
                [
                    userLatitude,
                    userLongitude
                ]
            )
            .addTo(map)
            .bindPopup(
                "📍 You are here"
            );

        userMarker.openPopup();

    }


    /* Places */

    placeCards.forEach(
        function(card) {

            const lat =
                Number(
                    card.dataset.lat
                );

            const lng =
                Number(
                    card.dataset.lng
                );

            const name =
                card.dataset.name;

            const marker =
                L.marker(
                    [lat, lng]
                )
                .addTo(map)
                .bindPopup(
                    `
                    <strong>
                        ${name}
                    </strong>
                    <br>
                    ${card.querySelector("p").textContent}
                    <br><br>
                    <button
                        onclick="openDirections('${lat}','${lng}')">
                        🗺️ Directions
                    </button>
                    `
                );

            placeMarkers.push(
                marker
            );

        }
    );

}


/* =====================================================
   OPEN MAP ON LOAD
===================================================== */

initializeMap();


/* =====================================================
   THEME
===================================================== */

const savedTheme =
    localStorage.getItem(
        "theme"
    );

if (
    savedTheme === "dark"
) {

    document.body.classList.add(
        "dark"
    );

    themeBtn.textContent =
        "☀️";

}


themeBtn.addEventListener(
    "click",
    function() {

        document.body.classList.toggle(
            "dark"
        );

        const dark =
            document.body.classList.contains(
                "dark"
            );

        localStorage.setItem(
            "theme",
            dark
                ? "dark"
                : "light"
        );

        themeBtn.textContent =
            dark
                ? "☀️"
                : "🌙";

        showToast(
            dark
                ? "🌙 Dark mode enabled"
                : "☀️ Light mode enabled"
        );

    }
);


/* =====================================================
   HISTORY
===================================================== */

historyBtn.addEventListener(
    "click",
    function() {

        showToast(
            "🏛️ Historical exploration selected"
        );

        document
            .getElementById(
                "places"
            )
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);


/* =====================================================
   BACK TO TOP
===================================================== */

const backToTop =
    document.getElementById(
        "backToTop"
    );


window.addEventListener(
    "scroll",
    function() {

        if (
            window.scrollY > 500
        ) {

            backToTop.classList.add(
                "show"
            );

        } else {

            backToTop.classList.remove(
                "show"
            );

        }

    }
);


backToTop.addEventListener(
    "click",
    function() {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);


/* =====================================================
   INITIALIZATION
===================================================== */

restoreFavorites();

renderFavorites();

renderRecentlyViewed();

updateResultCount();
