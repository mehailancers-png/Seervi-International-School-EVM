const EVM_STORAGE_KEY = "seerviInternationalSchoolEvmVotes";

const CANDIDATES = [
  "Avinash Gehlot",
  "Surendra Goyal",
  "Yogi Laxman Nath",
  "Dilip Choudhary"
];

function createEmptyVotes() {
  return {
    "Avinash Gehlot": 0,
    "Surendra Goyal": 0,
    "Yogi Laxman Nath": 0,
    "Dilip Choudhary": 0
  };
}

function readVotes() {
  try {
    const savedData = localStorage.getItem(EVM_STORAGE_KEY);

    if (!savedData) {
      const emptyVotes = createEmptyVotes();
      localStorage.setItem(EVM_STORAGE_KEY, JSON.stringify(emptyVotes));
      return emptyVotes;
    }

    const parsedData = JSON.parse(savedData);
    const cleanVotes = createEmptyVotes();

    CANDIDATES.forEach(function (candidate) {
      cleanVotes[candidate] = Number(parsedData[candidate]) || 0;
    });

    return cleanVotes;
  } catch (error) {
    const emptyVotes = createEmptyVotes();
    localStorage.setItem(EVM_STORAGE_KEY, JSON.stringify(emptyVotes));
    return emptyVotes;
  }
}

function saveVotes(votes) {
  localStorage.setItem(EVM_STORAGE_KEY, JSON.stringify(votes));
}

function castVote(candidateName) {
  if (!CANDIDATES.includes(candidateName)) {
    alert("Candidate not found.");
    return;
  }

  const votes = readVotes();
  votes[candidateName] = votes[candidateName] + 1;
  saveVotes(votes);

  const messageBox = document.getElementById("messageBox");

  if (messageBox) {
    messageBox.innerHTML =
      "Vote recorded successfully for <b>" + candidateName + "</b>. Thank you for voting.";

    messageBox.style.background = "#dcfce7";
    messageBox.style.color = "#166534";
    messageBox.style.borderColor = "#86efac";
  }
}

function getTotalVotes(votes) {
  let total = 0;

  CANDIDATES.forEach(function (candidate) {
    total = total + votes[candidate];
  });

  return total;
}

function setText(id, value) {
  const element = document.getElementById(id);

  if (element) {
    element.textContent = value;
  }
}

function setBarWidth(id, percentage) {
  const bar = document.getElementById(id);

  if (bar) {
    bar.style.width = percentage + "%";
  }
}

function refreshDashboard() {
  const totalVotesElement = document.getElementById("totalVotes");

  if (!totalVotesElement) {
    return;
  }

  const votes = readVotes();
  const totalVotes = getTotalVotes(votes);

  setText("totalVotes", totalVotes);

  setText("avinashVotes", votes["Avinash Gehlot"]);
  setText("surendraVotes", votes["Surendra Goyal"]);
  setText("yogiVotes", votes["Yogi Laxman Nath"]);
  setText("dilipVotes", votes["Dilip Choudhary"]);

  const avinashPercentage = totalVotes === 0 ? 0 : (votes["Avinash Gehlot"] / totalVotes) * 100;
  const surendraPercentage = totalVotes === 0 ? 0 : (votes["Surendra Goyal"] / totalVotes) * 100;
  const yogiPercentage = totalVotes === 0 ? 0 : (votes["Yogi Laxman Nath"] / totalVotes) * 100;
  const dilipPercentage = totalVotes === 0 ? 0 : (votes["Dilip Choudhary"] / totalVotes) * 100;

  setBarWidth("avinashBar", avinashPercentage);
  setBarWidth("surendraBar", surendraPercentage);
  setBarWidth("yogiBar", yogiPercentage);
  setBarWidth("dilipBar", dilipPercentage);
}

function resetVotes() {
  const shouldReset = confirm("Do you want to reset all election votes to zero?");

  if (!shouldReset