console.log("convert.js loaded");


function convertToBibTex() {
  const apaInput = document.getElementById("apaCitation").value;
  const bibTexOutput = document.getElementById("bibtexOutput");

  const parsed = parseApaCitation(apaInput);
  console.log(parsed);

const bibTexEntry = `@article{example${parsed.year},
author = {${parsed.author}},
title = {${parsed.title}},
journal = {${parsed.journal}},
year = {${parsed.year}},
volume = {${parsed.volume}},
number = {${parsed.number}},
pages = {${parsed.pages}},
doi = {${parsed.doi}}
}`;
/*
Goodfellow, I., Pouget-Abadie, J., Mirza, M., Xu, B., Warde-Farley, D., Ozair, S., ... & Bengio, Y. (2020). Generative adversarial networks. Communications of the ACM, 63(11), 139-144.
*/
bibTexOutput.textContent = bibTexEntry;
}
function parseApaCitation(apaCitation) {
  const parts = apaCitation.split("(");

  const author = parts[0].trim();
  const afterAuthor = parts[1];
  console.log(parts);

  const yearParts = afterAuthor.split(")");
  const year = yearParts[0].trim();
  const afterYear = yearParts[1].trim();
  console.log(yearParts);

  const journalParts = afterYear.split(".");
  const title = journalParts[0].trim();
  const journal = journalParts[1].trim();
  console.log(afterYear);

  const volumeAndPages = journalParts[2].trim().split(",");
  const volume = volumeAndPages[0].trim();
  const pages = volumeAndPages[1].trim();
  console.log(journalParts);

  const doiParts = journalParts[3].trim().split(" ");
  const doi = doiParts[1].trim();

  
    return {
    author: author,
    year: year,
    title: title,
    journal: journal,
    volume: volume,
    number: number,
    pages: pages,
    doi: doi
  };
}

function copyToClipboard() {
    const bibTexOutput = document.getElementById('bibtexOutput');
    const textToCopy = bibTexOutput.textContent;

    navigator.clipboard.writeText(textToCopy).then(() => {
        alert('BibTeX entry copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("citationForm")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      convertToBibTex();
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