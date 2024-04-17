const GAMES = [["Formula Clicker", "A simplistic<br>clicker game"], ["Dungeon of Souls", "A turn-based roguelike<br>deck-builder game"]];

const TREES = [["Yrahcaz7", "The Primordial Tree"], ["more-repo-forks", "Adaptation Tree"], ["more-repo-forks", "Booster-Generator Tree"]];

const TOOLS = ["Ancient Code Converter"];

window.onload = () => {
	let text = "";
	for (let index = 0; index < GAMES.length; index++) {
		text += "<span><b>" + GAMES[index][0] + "</b><br>";
		text += GAMES[index][1] + "<br>";
		text += "<a href='https://yrahcaz7.github.io/" + GAMES[index][0].replace(/ /g, "-") + "/'>Play the Game</a><br>";
		text += "<a href='https://github.com/Yrahcaz7/" + GAMES[index][0].replace(/ /g, "-") + "'>View Source Code</a></span>";
	};
	document.getElementById("games").innerHTML = text + "<span style='display: flex; align-items: center'>More coming soon!</span>";
	text = "";
	for (let index = 0; index < TREES.length; index++) {
		text += "<span><b>" + TREES[index][1] + "</b><br>";
		text += "<a href='https://" + TREES[index][0][0].toLowerCase() + TREES[index][0].slice(1) + ".github.io/" + TREES[index][1].replace(/ /g, "-") + "/'>Play the Game</a><br>";
		text += "<a href='https://github.com/" + TREES[index][0] + "/" + TREES[index][1].replace(/ /g, "-") + "'>View Source Code</a></span>";
	};
	document.getElementById("trees").innerHTML = text;
	text = "";
	for (let index = 0; index < TOOLS.length; index++) {
		text += "<span><b>" + TOOLS[index] + "</b><br>";
		text += "<a href='https://yrahcaz7.github.io/" + TOOLS[index].replace(/ /g, "-") + "/'>Use the Tool</a><br>";
		text += "<a href='https://github.com/Yrahcaz7/" + TOOLS[index].replace(/ /g, "-") + "'>View Source Code</a></span>";
	};
	document.getElementById("tools").innerHTML = text;
};

let nightTheme = false;

function changeTheme() {
	if (nightTheme) {
		document.getElementById("theme").innerHTML = "Activate Dark Theme";
		document.documentElement.style.setProperty("--bg-color", "#F0F0F0");
		document.documentElement.style.setProperty("--txt-color", "#101010");
		document.documentElement.style.setProperty("--link-color-1", "#0000EE");
		document.documentElement.style.setProperty("--link-color-2", "#551A8B");
	} else {
		document.getElementById("theme").innerHTML = "Activate Light Theme";
		document.documentElement.style.setProperty("--bg-color", "#101010");
		document.documentElement.style.setProperty("--txt-color", "#F0F0F0");
		document.documentElement.style.setProperty("--link-color-1", "#EEEE00");
		document.documentElement.style.setProperty("--link-color-2", "#508B1A");
	};
	nightTheme = !nightTheme;
};
