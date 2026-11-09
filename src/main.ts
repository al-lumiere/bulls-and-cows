import { generateSecret } from "./generateSecret";
import { startRound, type Round } from "./round";
import { countPossibleSecrets } from "./countPossibleSecrets";

const main = document.createElement("main");
const title = document.createElement("h1");
title.textContent = "Bulls and Cows";

const settings = document.createElement("section");

function addSelect(
  title: string,
  options: { value: number; text: string }[],
  initialValue: number,
): HTMLSelectElement {
  const label = document.createElement("label");
  const select = document.createElement("select");

  for (const { value, text } of options) {
    select.add(new Option(text, String(value)));
  }

  select.value = String(initialValue);
  label.append(`${title} `, select);
  settings.append(label);

  return select;
}

const baseSelect = addSelect(
  "Number system",
  [
    { value: 2, text: "BIN" },
    { value: 8, text: "OCT" },
    { value: 10, text: "DEC" },
    { value: 16, text: "HEX" },
  ],
  10,
);

const lengthSelect = addSelect(
  "Code length",
  [2, 3, 4, 5, 6].map((length) => ({
    value: length,
    text: String(length),
  })),
  4,
);

const possibilities = document.createElement("p");
const startButton = document.createElement("button");
startButton.type = "button";
startButton.textContent = "Start game";

let round: Round | null = null;

const game = document.createElement("section");
game.hidden = true;

const guessLabel = document.createElement("label");
const guessInput = document.createElement("input");

guessInput.type = "text";
guessInput.autocomplete = "off";
guessLabel.append("Your guess ", guessInput);
game.append(guessLabel);

startButton.addEventListener("click", () => {
  if (round !== null) {
    return;
  }

  const base = Number(baseSelect.value);
  const length = Number(lengthSelect.value);
  const secret = generateSecret(length, base);

  round = startRound(secret, base, Date.now());

  baseSelect.disabled = true;
  lengthSelect.disabled = true;
  startButton.disabled = true;

  game.hidden = false;
  guessInput.focus();
});

function updateSettings(): void {
  const base = Number(baseSelect.value);

  for (const option of lengthSelect.options) {
    option.disabled = Number(option.value) > base;
  }

  if (Number(lengthSelect.value) > base) {
    lengthSelect.value = "2";
  }

  const count = countPossibleSecrets(Number(lengthSelect.value), base);
  possibilities.textContent = `Possible secrets: ${count}`;
}

baseSelect.addEventListener("change", updateSettings);
lengthSelect.addEventListener("change", updateSettings);

settings.append(possibilities, startButton);
main.append(title, settings, game);
document.body.append(main);

updateSettings();
