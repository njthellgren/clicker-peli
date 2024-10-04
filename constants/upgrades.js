import { defaultUpgradeValues } from "./defaultValues.js";

function createUpgrades() {
  const upgradesContainer = document.getElementById('upgrades-container')
  const template = document.getElementById('upgrade-template').textContent

  defaultUpgradeValues.forEach((obj) => {
    let html = template;

    Object.keys(obj).forEach((key) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      html = html.replace(regex, obj[key])
    });

    upgradesContainer.innerHTML += html
  })
}

createUpgrades()

export const upgrades = [
  {
    name: 'clicker',
    cost: document.querySelector(".clicker-cost"),
    parsedCost: parseFloat(document.querySelector(".clicker-cost").innerHTML),
    increase: document.querySelector(".clicker-increase"),
    parsedIncrease: parseFloat(document.querySelector(".clicker-increase").innerHTML),
    level: document.querySelector(".clicker-level"),
    powerUps: [
      {
        name: "2x clicker",
        description: "double your clicking power",
        multiplier: 2,
      },
      {
        name: "3x clicker",
        description: "triple your clicking power",
        multiplier: 3,
      },
      {
        name: "max",
        description: "double your clicking power",
        multiplier: 2,
      },
    ],
    gemMultiplier: 1.1,
    costMultiplier: 1.1,
  },
  {
    name: 'pickaxe',
    cost: document.querySelector(".pickaxe-cost"),
    parsedCost: parseFloat(document.querySelector(".pickaxe-cost").innerHTML),
    increase: document.querySelector(".pickaxe-increase"),
    parsedIncrease: parseFloat(document.querySelector(".pickaxe-increase").innerHTML),
    level: document.querySelector(".pickaxe-level"),
    powerUps: [
      {
        name: "2x pickaxe",
        description: "double your pickaxe efficiency",
        multiplier: 2,
      },
      {
        name: "3x pickaxe",
        description: "triple your pickaxe efficiency",
        multiplier: 3,
      },
      {
        name: "max",
        description: "double your pickaxe efficiency",
        multiplier: 2,
      },
    ],
    power: 0,
    gemMultiplier: 1.1,
    costMultiplier: 1.1,
  },
  {
    name: 'miner',
    cost: document.querySelector(".miner-cost"),
    parsedCost: parseFloat(document.querySelector(".miner-cost").innerHTML),
    increase: document.querySelector(".miner-increase"),
    parsedIncrease: parseFloat(document.querySelector(".miner-increase").innerHTML),
    level: document.querySelector(".miner-level"),
    powerUps: [
        {
          name: "2x pickaxe",
          description: "double your pickaxe efficiency",
          multiplier: 2,
        },
        {
          name: "3x pickaxe",
          description: "triple your pickaxe efficiency",
          multiplier: 3,
        },
        {
          name: "max",
          description: "double your pickaxe efficiency",
          multiplier: 2,
        },
      ],
    power: 0,
    gemMultiplier: 1.1,
    costMultiplier: 1.1,
  },
  {
    name: 'factory',
    cost: document.querySelector(".factory-cost"),
    parsedCost: parseFloat(document.querySelector(".factory-cost").innerHTML),
    increase: document.querySelector(".factory-increase"),
    parsedIncrease: parseFloat(document.querySelector(".factory-increase").innerHTML),
    level: document.querySelector(".factory-level"),
    powerUps: [
        {
          name: "2x pickaxe",
          description: "double your pickaxe efficiency",
          multiplier: 2,
        },
        {
          name: "3x pickaxe",
          description: "triple your pickaxe efficiency",
          multiplier: 3,
        },
        {
          name: "max",
          description: "double your pickaxe efficiency",
          multiplier: 2,
        },
      ],
    power: 0,
    gemMultiplier: 1.1,
    costMultiplier: 1.1,
  },
  {
    name: 'potion',
    cost: document.querySelector(".potion-cost"),
    parsedCost: parseFloat(document.querySelector(".potion-cost").innerHTML),
    increase: document.querySelector(".potion-increase"),
    parsedIncrease: parseFloat(document.querySelector(".potion-increase").innerHTML),
    level: document.querySelector(".potion-level"),
    powerUps: [
        {
          name: "2x pickaxe",
          description: "double your pickaxe efficiency",
          multiplier: 2,
        },
        {
          name: "3x pickaxe",
          description: "triple your pickaxe efficiency",
          multiplier: 3,
        },
        {
          name: "max",
          description: "double your pickaxe efficiency",
          multiplier: 2,
        },
      ],
    power: 0,
    gemMultiplier: 1.1,
    costMultiplier: 1.1,
  },
]

export const powerUpIntervals = [10, 20, 30]