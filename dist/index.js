#! /usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const figlet_1 = require("figlet");
const prompts_1 = require("@inquirer/prompts");
const constants_1 = require("./constants");
const utils_1 = require("./utils");
const program = new commander_1.Command();
program
    .version("1.0.0")
    .description("A NPM Package for Generating Random Password.... But there are already many? Why not another one 😉")
    .parse(process.argv);
program.opts();
let passwordRequirements = [];
function getRandomPassword(passwordLength) {
    let password = "";
    while (password.length < passwordLength) {
        // To have a good ratio of different characters, for instance the password should not be overdone with symbols this will limit it.
        const trigger = (0, utils_1.getRandomNumber)(10);
        if (passwordRequirements.includes("symbols") && trigger % 7 == 0) {
            password = password + constants_1.SYMBOLS[(0, utils_1.getRandomNumber)(constants_1.SYMBOLS.length)];
        }
        else if (passwordRequirements.includes("numbers") && trigger % 5 == 0) {
            password = password + constants_1.NUMBERS[(0, utils_1.getRandomNumber)(constants_1.NUMBERS.length)];
        }
        else if (passwordRequirements.includes("uppercase") && trigger % 3 == 0) {
            password = password + constants_1.UPPERCASE[(0, utils_1.getRandomNumber)(constants_1.UPPERCASE.length)];
        }
        else {
            password = password + constants_1.LOWERCASE[(0, utils_1.getRandomNumber)(constants_1.LOWERCASE.length)];
        }
    }
    return password;
}
function init() {
    console.log((0, figlet_1.textSync)("SorceryKey"));
    console.log("Pose your inquiries, and behold as I weave the strands of chance into a password spun from the threads of randomness, crafted exclusively for you. \n");
}
function passwordGenerator() {
    return __awaiter(this, void 0, void 0, function* () {
        let passwordLength = yield (0, prompts_1.input)({
            message: "Declare the length, let magic forge the password:",
        });
        // Keep on re-prompting till the user puts correct number
        while (isNaN(parseInt(passwordLength))) {
            passwordLength = yield (0, prompts_1.input)({
                message: "Magical energies falter! Please provide a valid mystical number:",
            });
        }
        passwordRequirements = yield (0, prompts_1.checkbox)({
            message: "What incantations shall the password possess? Share its prerequisites, oh seeker of secrets:",
            choices: [
                { name: "Uppercase Characters (A-Z)", value: "uppercase" },
                { name: "Numbers (0-9)", value: "numbers" },
                { name: "Symbols (@$#&?)", value: "symbols" },
            ],
        });
        let regeneratePassword = false;
        do {
            let password = getRandomPassword(parseInt(passwordLength));
            console.log("The key to your enchanted realm shall be:", password, "\n");
            regeneratePassword = yield (0, prompts_1.confirm)({
                message: "Desire a fresh incantation for your magical key?",
            });
        } while (regeneratePassword);
        console.log("Fare thee well, traveler of realms, until we meet again in distant magic!");
    });
}
init();
passwordGenerator();
//# sourceMappingURL=index.js.map