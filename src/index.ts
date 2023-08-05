#! /usr/bin/env node
import { Command } from "commander"
import { textSync } from "figlet"
import { checkbox, confirm, input } from "@inquirer/prompts"
import { LOWERCASE, NUMBERS, SYMBOLS, UPPERCASE } from "./constants"
import { getRandomNumber } from "./utils"

const program = new Command()

program
  .version("1.0.0")
  .description(
    "A NPM Package for Generating Random Password.... But there are already many? Why not another one 😉"
  )
  .parse(process.argv)
program.opts()

let passwordRequirements: string[] = []

function getRandomPassword(passwordLength: number): string {
  let password: string = ""
  while (password.length < passwordLength) {
    // To have a good ratio of different characters, for instance the password should not be overdone with symbols this will limit it.

    const trigger = getRandomNumber(10)

    if (passwordRequirements.includes("symbols") && trigger % 7 == 0) {
      password = password + SYMBOLS[getRandomNumber(SYMBOLS.length)]
    } else if (passwordRequirements.includes("numbers") && trigger % 5 == 0) {
      password = password + NUMBERS[getRandomNumber(NUMBERS.length)]
    } else if (passwordRequirements.includes("uppercase") && trigger % 3 == 0) {
      password = password + UPPERCASE[getRandomNumber(UPPERCASE.length)]
    } else {
      password = password + LOWERCASE[getRandomNumber(LOWERCASE.length)]
    }
  }

  return password
}

function init() {
  console.log(textSync("SorceryKey"))
  console.log(
    "Pose your inquiries, and behold as I weave the strands of chance into a password spun from the threads of randomness, crafted exclusively for you. \n"
  )
}

async function passwordGenerator() {
  let passwordLength = await input({
    message: "Declare the length, let magic forge the password:",
  })

  // Keep on re-prompting till the user puts correct number
  while (isNaN(parseInt(passwordLength))) {
    passwordLength = await input({
      message:
        "Magical energies falter! Please provide a valid mystical number:",
    })
  }

  passwordRequirements = await checkbox({
    message:
      "What incantations shall the password possess? Share its prerequisites, oh seeker of secrets:",
    choices: [
      { name: "Uppercase Characters (A-Z)", value: "uppercase" },
      { name: "Numbers (0-9)", value: "numbers" },
      { name: "Symbols (@$#&?)", value: "symbols" },
    ],
  })

  let regeneratePassword = false
  do {
    let password = getRandomPassword(parseInt(passwordLength))
    console.log("The key to your enchanted realm shall be:", password, "\n")

    regeneratePassword = await confirm({
      message: "Desire a fresh incantation for your magical key?",
    })
  } while (regeneratePassword)

  console.log(
    "Fare thee well, traveler of realms, until we meet again in distant magic!"
  )
}

init()
passwordGenerator()
