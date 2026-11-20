"use strict";

async function renderTable() {
  const statusEl = document.getElementById("status");
  const tbody = document.querySelector("#results-table tbody");

  try {
    const rows = await fetchRawResults();
    statusEl.textContent = `Loaded ${rows.length} rows successfully!`;

    rows.forEach(row => {
      const tr = document.createElement("tr");

      const geneName = row.geneLabel ? row.geneLabel.value : row.gene.value;
      const diseaseName = row.diseaseLabel ? row.diseaseLabel.value : row.disease.value;

      tr.innerHTML = `
        <td>${geneName}</td>
        <td>${diseaseName}</td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    statusEl.textContent = `Error: ${err.message}`;
    console.error(err);
  }
}

renderTable();