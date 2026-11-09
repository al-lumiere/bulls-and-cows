import { generateSecret } from "./generateSecret";
import { startRound, submitGuess, type Round } from "./round";
import { createDigitValidator } from "./createDigitValidator";
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
const guessForm = document.createElement("form");
const guessButton = document.createElement("button");
guessButton.type = "submit";
guessButton.textContent = "Check guess";

const feedback = document.createElement("p");
feedback.setAttribute("role", "status");

const historyList = document.createElement("ol");

guessForm.append(guessLabel, guessButton);
game.append(guessForm, feedback, historyList);

const newGameButton = document.createElement("button");
newGameButton.type = "button";
newGameButton.textContent = "New game";
game.append(newGameButton);

newGameButton.addEventListener("click", () => {
  round = null;

  game.hidden = true;
  historyList.replaceChildren();
  feedback.textContent = "";

  guessInput.value = "";
  guessInput.disabled = false;
  guessButton.disabled = false;

  baseSelect.disabled = false;
  lengthSelect.disabled = false;
  startButton.disabled = false;
  baseSelect.focus();
});

guessInput.addEventListener("input", () => {
  if (round === null) return;

  guessInput.value = [...guessInput.value]
    .filter(createDigitValidator(round.base))
    .slice(0, round.secret.length)
    .join("");
});

guessForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (round === null) return;

  const result = submitGuess(round, guessInput.value, Date.now());

  if (result.status !== "accepted") {
    const messages = {
      invalid: "Enter the required number of different digits.",
      duplicate: "You already tried that code.",
      finished: "This round is already finished.",
    };

    feedback.textContent = messages[result.status];
    return;
  }

  round = result.round;

  const entry = round.history[round.history.length - 1];
  const item = document.createElement("li");
  item.textContent = `${entry.guess} — ${entry.bulls} bulls, ${entry.cows} cows`;
  historyList.append(item);

  guessInput.value = "";

  if (round.finishedAt !== null) {
    const elapsedMs = Math.max(0, round.finishedAt - round.startedAt);
    const seconds = (elapsedMs / 1000).toFixed(1);

    feedback.textContent = `You won! Attempts: ${round.history.length}. Time: ${seconds} s.`;
    guessInput.disabled = true;
    guessButton.disabled = true;
  } else {
    feedback.textContent = `${entry.bulls} bulls, ${entry.cows} cows`;
    guessInput.focus();
  }
});

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
