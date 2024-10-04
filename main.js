import { powerUpIntervals, upgrades } from "./constants/upgrades.js";

let gem = document.querySelector(".gem-cost");
let parsedGem = parseFloat(gem.innerHTML);

let gpcText = document.getElementById("gpc-text")
let gpsText = document.getElementById("gps-text")

let gemImgContainer = document.querySelector('.gem-img-container')

let upgradesNavButton = document.getElementById('upgrades-nav-button')

let gpc = 1;
let gps = 0;

const bgm = new Audio('./audio/bgm.mp3')
bgm.volume = 0.03

function incrementGem(event) {
  const clickingSound = new Audio('./audio/click.wav')
  clickingSound.play()

  gem.innerHTML = Math.round(parsedGem += gpc);

  const x = event.offsetX
  const y = event.offsetY

  const div = document.createElement('div')
  div.innerHTML = `+${Math.round(gpc)}`  
  div.style.cssText = `color: white; position: absolute; top: ${y}px; left: ${x}px; font-size: 15px; pointer-events: none;`
  gemImgContainer.appendChild(div)

  div.classList.add('fade-up')

  timeout(div)
}

const timeout = (div) => {
  setTimeout(() => {
    div.remove()
  }, 800)
}

function buyUpgrade(upgrade) {
    const mu = upgrades.find((u) => u.name === upgrade);
  
    const upgradeDiv = document.getElementById(`${mu.name}-upgrade`);
    const nextLevelDiv = document.getElementById(`${mu.name}-next-level`);
    const nextLevelP = document.getElementById(`${mu.name}-next-p`);
    const costElement = mu.cost;
  
    if (parseFloat(mu.level.innerHTML) >= 31) {
      return;
    }
  
    if (parsedGem >= mu.parsedCost) {
      const upgradeSound = new Audio('./audio/upgrade.mp3');
      upgradeSound.volume = 0.1;
      upgradeSound.play();
  
      gem.innerHTML = Math.round(parsedGem -= mu.parsedCost);
  
      let index = powerUpIntervals.indexOf(parseFloat(mu.level.innerHTML));
  
      if (index !== -1) {
        upgradeDiv.style.cssText = `border-color: #f5ddaa27`;
        nextLevelDiv.style.cssText = `background-color: orange; font-weight: bold`;
        mu.cost.innerHTML = Math.round(mu.parsedCost *= mu.costMultiplier);
  
        if (mu.name === 'clicker') {
          gpc *= mu.powerUps[index].multiplier;
          nextLevelP.innerHTML = `+${mu.parsedIncrease} gems per click`;
        } else {
          gps -= mu.power;
          mu.power *= mu.powerUps[index].multiplier;
          gps += mu.power;
          nextLevelP.innerHTML = `+${mu.parsedIncrease} gems per second`;
        }
      }
  
      mu.level.innerHTML++;
  
      index = powerUpIntervals.indexOf(parseFloat(mu.level.innerHTML));
  
      if (index !== -1) {
        upgradeDiv.style.cssText = `border-color: orange`;
        nextLevelDiv.style.cssText = `background-color: #ffd900; font-weight: bold`;
        nextLevelP.innerText = mu.powerUps[index].description;
  
        mu.cost.innerHTML = Math.round(mu.parsedCost * 2.5 * 1.004 ** parseFloat(mu.level.innerHTML));
      } else {
        mu.cost.innerHTML = Math.round(mu.parsedCost *= mu.costMultiplier);
        mu.parsedIncrease = parseFloat((mu.parsedIncrease * mu.gemMultiplier).toFixed(2));
  
        if (mu.name === 'clicker') nextLevelP.innerHTML = `+${mu.parsedIncrease} gems per click`;
        else nextLevelP.innerHTML = `+${mu.parsedIncrease} gems per second`;
      }
  
      if (mu.name === 'clicker') gpc += mu.parsedIncrease;
      else {
        gps -= mu.power;
        mu.power += mu.parsedIncrease;
        gps += mu.power;
      }
  
      if (parseFloat(mu.level.innerHTML) >= 31) {
        mu.level.innerHTML = "30";
        costElement.innerHTML = "— ";
        nextLevelP.innerHTML = "MAX";
  
        upgradeDiv.classList.add("disabled");
        upgradeDiv.style.pointerEvents = "none";
      }
    }
  }
  
  function save() {
    localStorage.clear();
  
    upgrades.forEach((upgrade) => {
      const isMaxed = upgrade.level.innerHTML === "Maxed";
  
      const obj = JSON.stringify({
        parsedLevel: isMaxed ? 30 : parseFloat(upgrade.level.innerHTML),
        parsedCost: upgrade.parsedCost,
        parsedIncrease: upgrade.parsedIncrease,
        isMaxed: isMaxed
      });
  
      localStorage.setItem(upgrade.name, obj);
    });
  
    localStorage.setItem('gpc', JSON.stringify(gpc));
    localStorage.setItem('gps', JSON.stringify(gps));
    localStorage.setItem('gem', JSON.stringify(parsedGem));
  }
  

function load() {
  upgrades.forEach((upgrade) => {
    const savedValues = JSON.parse(localStorage.getItem(upgrade.name));

    if (savedValues) {

      if (savedValues.isMaxed) {
        upgrade.level.innerHTML = "Maxed";
        handleMaxedUpgradeUI(upgrade);
      } else {
        
        upgrade.level.innerHTML = savedValues.parsedLevel;
        upgrade.parsedCost = savedValues.parsedCost;
        upgrade.parsedIncrease = savedValues.parsedIncrease;
        upgrade.cost.innerHTML = Math.round(upgrade.parsedCost);
        upgrade.increase.innerHTML = upgrade.parsedIncrease;

       
        const upgradeDiv = document.getElementById(`${upgrade.name}-upgrade`);
        upgradeDiv.classList.remove("disabled");
        upgradeDiv.style.pointerEvents = "auto";
      }
    }
  });

  gpc = JSON.parse(localStorage.getItem('gpc')) || 1;
  gps = JSON.parse(localStorage.getItem('gps')) || 0;
  parsedGem = JSON.parse(localStorage.getItem('gem')) || 0; 

  gem.innerHTML = Math.round(parsedGem);
}

  

setInterval(() => {
  parsedGem += gps / 10
  gem.innerHTML = Math.round(parsedGem)
  gpcText.innerHTML = Math.round(gpc)
  gpsText.innerHTML = Math.round(gps);
  bgm.play()
}, 100)

window.incrementGem = incrementGem
window.buyUpgrade = buyUpgrade 
window.save = save
window.load = load