"use strict";
const randomLetters = 'qwertyuiopasdfghjklzxcvbnm'.split("");
const welcomeTexts = [
    "Text randomises itself",
    "I randomise on hover",
    "I'm a title",
    "You don't have to randomise me",
    "Explore more",
    "Explore the website",
    "Please stop randomising me"
];
// Number of times the welcome text has been changed/randomised.
var welcomeTextIterations = 0;
function crypherText(startingText, endingText, element, duration = 200) {
    const interval = 50; // Interval between each randomization
    const steps = duration / interval; // Total steps for the effect
    let currentStep = 0;
    const originalText = startingText.split("");
    const targetText = endingText.split("");
    const randomizeInterval = setInterval(() => {
        const randomizedText = originalText.map((char, index) => {
            if (currentStep >= steps) {
                return targetText[index] || ""; // Use the target text when the effect is done
            }
            return randomLetters[Math.floor(Math.random() * randomLetters.length)];
        });
        element.innerHTML = randomizedText.join("");
        currentStep++;
        if (currentStep > steps) {
            clearInterval(randomizeInterval);
            element.innerHTML = endingText; // Ensure the final text is set
        }
    }, interval);
}
function getWelcomeText() {
    // The first index is 0, so we need to subtract 1.
    const maxTextIndex = welcomeTexts.length - 1;
    if (welcomeTextIterations < maxTextIndex) {
        welcomeTextIterations++;
        return welcomeTexts[welcomeTextIterations];
        // The last welcome text will repeat itself
    }
    else {
        return welcomeTexts[maxTextIndex];
    }
}
// Get the title element
const titleElement = document.getElementById("welcomeTitle");
const startingText = titleElement?.innerHTML || "";
if (titleElement) {
    // Add a hover event listener
    titleElement.addEventListener("mouseover", () => {
        crypherText(startingText, getWelcomeText(), // Random ending text
        titleElement);
    });
    // Optionally, reset the title when the mouse leaves
    titleElement.addEventListener("mouseout", () => {
        crypherText(titleElement.innerHTML, // Current randomized text
        startingText, // Original text
        titleElement);
    });
}
