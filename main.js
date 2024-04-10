const GAMES = ["Formula Clicker", "Dungeon of Souls"];

const TREES = [["Yrahcaz7", "The Primordial Tree"], ["more-repo-forks", "Adaptation Tree"], ["more-repo-forks", "Booster-Generator Tree"]];

window.onload = () => {
	let text = "";
	for (let index = 0; index < GAMES.length; index++) {
		text += "<span><b>" + GAMES[index] + "</b><br>";
		text += "<a href='https://yrahcaz7.github.io/" + GAMES[index].replace(/ /g, "-") + "/'>Play the Game</a><br>";
		text += "<a href='https://github.com/Yrahcaz7/" + GAMES[index].replace(/ /g, "-") + "'>View Source Code</a></span>";
	};
	document.getElementById("games").innerHTML = text + "<span><br>More coming soon!<br></span>";
	text = "";
	for (let index = 0; index < TREES.length; index++) {
		text += "<span><b>" + TREES[index][1] + "</b><br>";
		text += "<a href='https://" + TREES[index][0][0].toLowerCase() + TREES[index][0].slice(1) + ".github.io/" + TREES[index][1].replace(/ /g, "-") + "/'>Play the Game</a><br>";
		text += "<a href='https://github.com/" + TREES[index][0] + "/" + TREES[index][1].replace(/ /g, "-") + "'>View Source Code</a></span>";
	};
	document.getElementById("trees").innerHTML = text;
};
