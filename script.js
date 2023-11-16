const apiUrl = "https://majazocom.github.io/Data/solaris.json";
const modal = document.querySelector(".modal");
const landingPage = document.querySelector(".solarsystem");
const planetsCont = document.querySelector(".planets__cont");
let solarSystem = [];

async function fetchSolarSystem() {
    try {
        let resp = await fetch(apiUrl);
        solarSystem = await resp.json();

        solarSystem.forEach(planet => {
            const planetElement = document.createElement("figure");
            planetElement.id = planet.name;
            if (planet.name === "Solen") {
                landingPage.appendChild(planetElement);
            } else {               
               planetsCont.appendChild(planetElement);
            }

            planetElement.addEventListener("click", () => renderPlanetInfo(planet));
            
        });
    } catch (error) {
        console.error('Error fetching solar system data:', error);
    }
}
fetchSolarSystem();

// TARGET THE RIGHT PLANET INFO ELEMENT IN HTML

const planetName = document.querySelector(".name");
const latinName = document.querySelector(".name__latin");
const about = document.querySelector(".about");
const circumf = document.querySelector(".circumf");
const distance = document.querySelector(".distance");
const tempDay = document.querySelector(".temp__day");
const tempNight = document.querySelector(".temp__night");
const moonUl = document.querySelector(".moons");

function renderPlanetInfo(planet) {
    modal.classList.remove("hidden");
    landingPage.classList.add("hidden");

        planetName.innerText = planet.name.toUpperCase();
        latinName.innerText = planet.latinName.toUpperCase();
        about.innerText = planet.desc
        circumf.innerText = `${planet.circumference} km`
        distance.innerText = `${planet.distance} km`
        tempDay.innerText = planet.temp.day;
        tempNight.innerText = planet.temp.night;

        moonUl.innerText = "";
        const moons = planet.moons;
        if (moons.length === 0) {
            const li = document.createElement("li");
            li.innerText = "Inga månar";
            moonUl.appendChild(li);
        } else {
                moons.forEach(moon => {
                const li = document.createElement("li");
                li.innerText = moon;
                moonUl.appendChild(li);
                });
                }                   
}

//CLOSE MODAL WITH CLICK ON X
const btnClose = document.querySelector(".fa-x")
btnClose.addEventListener("click", () => {
    landingPage.classList.remove("hidden");
    modal.classList.add("hidden");
});

// CREATE STARS

const starCont = document.querySelector(".stars__cont");

function createStars() {
    for (let i = 0; i < 50; i++) {
        const star = document.createElement("figure");
        star.className = "star";
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 150}%`;
        starCont.appendChild(star);
    }
}
createStars();
