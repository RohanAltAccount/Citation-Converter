console.log("convert.js loaded");


function convertToBibTex() {
  const apaInput = document.getElementById("apaCitation").value;
  const bibTexOutput = document.getElementById("bibtexOutput");

  const parsed = parseApaCitation(apaInput);
  console.log(parsed);

const bibTexEntry = `@article{firstAuthor${parsed.year},
author = {${parsed.author}},
title = {${parsed.title}},
journal = {${parsed.journal}},
year = {${parsed.year}},
volume = {${parsed.volume}},
number = {${parsed.number}},
pages = {${parsed.pages}},
doi = {${parsed.doi}}
}`;
bibTexOutput.textContent = bibTexEntry;

console.log(bibTexEntry);
/*
Goodfellow, I., Pouget-Abadie, J., Mirza, M., Xu, B., Warde-Farley, D., Ozair, S., ... & Bengio, Y. (2020). Generative adversarial networks. Communications of the ACM, 63(11), 139-144.
*/
bibTexOutput.textContent = bibTexEntry;
}
function parseApaCitation(apaCitation) {
  const parts = apaCitation.indexOf("(");
  const author = apaCitation.slice(0, parts).trim();
  const closeParenIndex = apaCitation.indexOf(")");
  const year = apaCitation
  .slice(parts + 1, closeParenIndex)
  .trim();

const afterYear = apaCitation
    .slice(closeParenIndex + 1)
    .trim();

const citationBody = afterYear.slice(1).trim();
const titleEndIndex = citationBody.indexOf(".");
const title = citationBody.slice(0, titleEndIndex).trim();
const afterTitle = citationBody.slice(titleEndIndex + 1).trim();
const journalEndIndex = afterTitle.indexOf(",");
const journal = afterTitle.slice(0, journalEndIndex).trim();
const afterJournal = afterTitle.slice(journalEndIndex + 1).trim();

const volumeEndIndex = afterJournal.indexOf("(");
const volume = afterJournal.slice(0, volumeEndIndex).trim();
const afterVolume = afterJournal.slice(volumeEndIndex + 1).trim();


const issueEndIndex = afterVolume.indexOf(")");
const issue = afterVolume.slice(0, issueEndIndex).trim();
const afterIssue = afterVolume.slice(issueEndIndex + 1).trim();

const pages = afterIssue.slice(1).trim();
const cleanPages = pages.slice(0,-1).trim();



console.log(volume);
console.log(pages);
console.log(cleanPages);
console.log(journal);
console.log(afterJournal);
console.log(title);
console.log(afterTitle);
console.log(citationBody);
console.log(author);
console.log(year);
console.log(afterYear);
const doi = "";
    return {
    author: author,
    year: year,
    title: title,
    journal: journal,
    volume: volume,
    number: issue,
    pages: cleanPages,
    doi: doi
  };
}

function copyToClipboard() {
  const bibTexOutput = document.getElementById("bibtexOutput");
  const textToCopy = bibTexOutput.textContent;

  console.log("button clicked");
  console.log("copied text:", textToCopy);

  if (!textToCopy.trim()) {
    alert("nothing to copy bro");
    return;
  }

  navigator.clipboard.writeText(textToCopy)
    .then(() => {
      alert("BibTeX entry copied to clipboard!");
    })
    .catch((err) => {
      console.error("Failed to copy text:", err);
      alert("Copy failed. Check the console.");
    });
}
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("citationForm")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      convertToBibTex();
    });

  document
    .getElementById("copyButton")
    .addEventListener("click", (event) => {
      event.preventDefault();
      copyToClipboard();
    });

  document.querySelectorAll("h1, h2").forEach((text) => {
    text.addEventListener("click", () => {
      text.classList.add("glitch");

      setTimeout(() => {
        text.classList.remove("glitch");
      }, 700);
    });
  });
});