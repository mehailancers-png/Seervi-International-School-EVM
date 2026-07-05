const candidates = { "Avinash Gehlot": 0, "Surendra Goyal": 0, "Yogi Laxman Nath": 0, "Dilip Choudhary": 0 };

function getVotes() { const savedVotes = localStorage.getItem("schoolEvmVotes");

if (savedVotes) { return JSON.parse(savedVotes); }

localStorage.setItem("schoolEvmVotes", JSON.stringify(candidates)); return { ...candidates }; }

function castVote(candidateName) { const votes = getVotes();

if (votes[candidateName] === undefined) { votes[candidateName] = 0; }

votes[candidateName] += 1;

localStorage.setItem("schoolEvmVotes", JSON.stringify(votes));

const messageBox = document.getElementById("messageBox");

if (messageBox) { messageBox.innerHTML = "Vote successfully recorded for " + candidateName + ". Thank you for voting.";

messageBox.style.background = "#dcfce7"; messageBox.style.color = "#166534"; 

} }

function refreshDashboard() { const votes = getVotes();

const avinashVotes = votes["Avinash Gehlot"] || 0; const surendraVotes = votes["Surendra Goyal"] || 0; const yogiVotes = votes["Yogi Laxman Nath"] || 0; const dilipVotes = votes["Dilip Choudhary"] || 0;

const totalVotes = avinashVotes + surendraVotes + yogiVotes + dilipVotes;

const totalVotesElement = document.getElementById("totalVotes");

if (!totalVotesElement) { return; }

totalVotesElement.innerText = totalVotes;

document.getElementById("avinashVotes").innerText = avinashVotes; document.getElementById("surendraVotes").innerText = surendraVotes; document.getElementById("yogiVotes").innerText = yogiVotes; document.getElementById("dilipVotes").innerText = dilipVotes;

const avinashPercent = totalVotes ? (avinashVotes / totalVotes) * 100 : 0; const surendraPercent = totalVotes ? (surendraVotes / totalVotes) * 100 : 0; const yogiPercent = totalVotes ? (yogiVotes / totalVotes) * 100 : 0; const dilipPercent = totalVotes ? (dilipVotes / totalVotes) * 100 : 0;

document.getElementById("avinashBar").style.width = avinashPercent + "%"; document.getElementById("surendraBar").style.width = surendraPercent + "%"; document.getElementById("yogiBar").style.width = yogiPercent + "%"; document.getElementById("dilipBar").style.width = dilipPercent + "%"; }

function resetVotes() { const confirmReset = confirm("Do you really want to reset all election votes?");

if (confirmReset) { localStorage.setItem("schoolEvmVotes", JSON.stringify(candidates)); refreshDashboard(); alert("All votes have been reset successfully."); } }

if (window.location.pathname.includes("dashboard.html")) { refreshDashboard(); setInterval(refreshDashboard, 2000); }