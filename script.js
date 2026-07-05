const initialVotes = { "Avinash Gehlot": 0, "Surendra Goyal": 0, "Yogi Laxman Nath": 0, "Dilip Choudhary": 0 };

function getVotes() { const savedVotes = JSON.parse(localStorage.getItem("schoolEvmVotes"));

if (!savedVotes) { localStorage.setItem("schoolEvmVotes", JSON.stringify(initialVotes)); return { ...initialVotes }; }

return { "Avinash Gehlot": savedVotes["Avinash Gehlot"] || 0, "Surendra Goyal": savedVotes["Surendra Goyal"] || 0, "Yogi Laxman Nath": savedVotes["Yogi Laxman Nath"] || 0, "Dilip Choudhary": savedVotes["Dilip Choudhary"] || 0 }; }

function castVote(candidateName) { const votes = getVotes();

votes[candidateName]++;

localStorage.setItem("schoolEvmVotes", JSON.stringify(votes));

const messageBox = document.getElementById("messageBox");

if (messageBox) { messageBox.innerHTML = "Vote recorded successfully for " + candidateName + ".";

messageBox.style.background = "#dcfce7"; messageBox.style.color = "#166534"; 

} }

function refreshDashboard() { const votes = getVotes();

const avinashVotes = votes["Avinash Gehlot"]; const surendraVotes = votes["Surendra Goyal"]; const yogiVotes = votes["Yogi Laxman Nath"]; const dilipVotes = votes["Dilip Choudhary"];

const totalVotes = avinashVotes + surendraVotes + yogiVotes + dilipVotes;

const totalVotesElement = document.getElementById("totalVotes");

if (!totalVotesElement) return;

totalVotesElement.innerText = totalVotes;

document.getElementById("avinashVotes").innerText = avinashVotes; document.getElementById("surendraVotes").innerText = surendraVotes; document.getElementById("yogiVotes").innerText = yogiVotes; document.getElementById("dilipVotes").innerText = dilipVotes;

document.getElementById("avinashBar").style.width = totalVotes ? (avinashVotes / totalVotes) * 100 + "%" : "0%";

document.getElementById("surendraBar").style.width = totalVotes ? (surendraVotes / totalVotes) * 100 + "%" : "0%";

document.getElementById("yogiBar").style.width = totalVotes ? (yogiVotes / totalVotes) * 100 + "%" : "0%";

document.getElementById("dilipBar").style.width = totalVotes ? (dilipVotes / totalVotes) * 100 + "%" : "0%"; }

function resetVotes() { const reset = confirm("Reset all votes?");

if (reset) { localStorage.setItem("schoolEvmVotes", JSON.stringify(initialVotes)); refreshDashboard(); } }

if (document.getElementById("totalVotes")) { refreshDashboard(); setInterval(refreshDashboard, 1000); }