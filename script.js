const STORAGE_KEY = "seervi_evm_votes_v1";

const defaultVotes = {
  "Avinash Gehlot": 0,
  "Surendra Goyal": 0,
  "Yogi Laxman Nath": 0,
  "Dilip Choudhary": 0
};

function getVotes() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultVotes));
    return { ...defaultVotes };
  }

  try {
    const data = JSON.parse(saved);

    return {
      "Avinash Gehlot": Number(data["Avinash Gehlot"]) || 0,
      "Surendra Goyal": Number(data["Surendra Goyal"]) || 0,
      "Yogi Laxman Nath": Number(data["Yogi Laxman Nath"]) || 0,
      "Dilip Choudhary": Number(data["Dilip Choudhary"]) || 0
    };
  } catch (error) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultVotes));
    return { ...defaultVotes };
  }
}

function saveVotes(votes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(votes));
}

function castVote(candidateName) {
  const votes = getVotes();

  if (votes[candidateName] === undefined) {
    alert("Candidate name error. Check index.html spelling.");
    return;
  }

  votes[candidateName] = votes[candidateName] + 1;
  saveVotes(votes);

  const messageBox = document.getElementById("messageBox");

  if (messageBox) {
    messageBox.innerHTML =
      "Your vote has been casted successfully for <b>" +
      candidateName +
      "</b>.";

    messageBox.style.background = "#dcfce7";
    messageBox.style.color = "#166534";
    messageBox.style.border = "1px solid #86efac";
  }
}

function refreshDashboard() {
  const totalElement = document.getElementById("totalVotes");

  if (!totalElement) {
    return;
  }

  const votes = getVotes();

  const avinash = votes["Avinash Gehlot"];
  const surendra = votes["Surendra Goyal"];
  const yogi = votes["Yogi Laxman Nath"];
  const dilip = votes["Dilip Choudhary"];

  const total = avinash + surendra + yogi + dilip;

  totalElement.textContent = total;

  document.getElementById("avinashVotes").textContent = avinash;
  document.getElementById("surendraVotes").textContent = surendra;
  document.getElementById("yogiVotes").textContent = yogi;
  document.getElementById("dilipVotes").textContent = dilip;

  document.getElementById("avinashBar").style.width =
    (total === 0 ? 0 : (avinash / total) * 100) + "%";

  document.getElementById("surendraBar").style.width =
    (total === 0 ? 0 : (surendra / total) * 100) + "%";

  document.getElementById("yogiBar").style.width =
    (total === 0 ? 0 : (yogi / total) * 100) + "%";

  document.getElementById("dilipBar").style.width =
    (total === 0 ? 0 : (dilip / total) * 100) + "%";
}

function resetVotes() {
  const confirmReset = confirm("Reset all votes to zero?");

  if (!confirmReset) {
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultVotes));
  refreshDashboard();
  alert("Election data has been reset.");
}

document.addEventListener("DOMContentLoaded", function () {
  refreshDashboard();
});