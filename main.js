/**
 * @type {([string, string] | [string, string, boolean] | [string, string, boolean, boolean])[]}
 */
const GAMES = [
	["Formula Clicker", "A simplistic<br>incremental game", true],
	["Dungeon of Souls", "A turn-based roguelike<br>deck-builder game"],
	["Matter Grid", "A clicker game based around<br>filling a grid with matter"],
	["The Septenary Forest", "A collection of incremental<br>games made using TMT", false, true],
	["&block;&block;&block;&block;&block;&block;'&block;-&block;i&block;&block;&block;&block;&block;&block;&block;&block;", "A work of &block;&block;teract&block;&block;e f&block;&block;t&block;&block;n<br>Currently st&block;&block;l &block;&block; beta"],
];

const TOOLS = [
	["Matrix Transformation", "A tool to visualize<br>matrix transformations"]
];

window.addEventListener("load", () => {
	const prefersDarkQuery = window?.matchMedia?.("(prefers-color-scheme: dark)");
	if (prefersDarkQuery) {
		if (prefersDarkQuery.matches) {
			changeTheme();
		}
		prefersDarkQuery.addEventListener("change", changeTheme);
	}
	let text = "";
	for (let index = 0; index < GAMES.length; index++) {
		text += "<span class='item'>";
		if (GAMES[index][2]) text += "<div class='star'></div>";
		text += "<div><b>" + GAMES[index][0] + "</b><br>";
		if (GAMES[index][1]) text += GAMES[index][1] + "<br>";
		text += "<a href=\"https://yrahcaz7.github.io/" + GAMES[index][0].replace(/&block;/g, "_").replace(/\s|'/g, "-") + "/\">Play the Game" + (GAMES[index][3] ? "s" : "") + "</a><br>";
		text += "<a href=\"https://github.com/Yrahcaz7/" + GAMES[index][0].replace(/&block;/g, "_").replace(/\s|'/g, "-") + "\">View Source Code</a></div></span>";
	}
	const gameList = document.getElementById("games");
	if (gameList) {
		gameList.innerHTML = text;
	}
	text = "";
	for (let index = 0; index < TOOLS.length; index++) {
		text += "<span class='item'><div><b>" + TOOLS[index][0] + "</b><br>";
		if (TOOLS[index][1]) text += TOOLS[index][1] + "<br>";
		text += "<a href=\"https://yrahcaz7.github.io/" + TOOLS[index][0].replace(/&block;/g, "_").replace(/\s|'/g, "-") + "/\">Use the Tool</a><br>";
		text += "<a href=\"https://github.com/Yrahcaz7/" + TOOLS[index][0].replace(/&block;/g, "_").replace(/\s|'/g, "-") + "\">View Source Code</a></div></span>";
	}
	const toolList = document.getElementById("tools");
	if (toolList) {
		toolList.innerHTML = text;
	}
});

let darkTheme = false;

function changeTheme() {
	const themeSwitcher = document.getElementById("theme");
	if (!themeSwitcher) {
		return;
	}
	if (darkTheme) {
		themeSwitcher.innerHTML = "Switch to Dark Theme";
		document.documentElement.style.setProperty("--bg-color", "#F0F0F0");
		document.documentElement.style.setProperty("--txt-color", "#101010");
		document.documentElement.style.setProperty("--link-color-1", "#0000EE");
		document.documentElement.style.setProperty("--link-color-2", "#551A8B");
		document.documentElement.style.setProperty("--table-color", "#10F0F040");
	} else {
		themeSwitcher.innerHTML = "Switch to Light Theme";
		document.documentElement.style.setProperty("--bg-color", "#101010");
		document.documentElement.style.setProperty("--txt-color", "#F0F0F0");
		document.documentElement.style.setProperty("--link-color-1", "#EEEE00");
		document.documentElement.style.setProperty("--link-color-2", "#508B1A");
		document.documentElement.style.setProperty("--table-color", "#F0101040");
	}
	darkTheme = !darkTheme;
}

function openSaveManager() {
	const table = document.getElementById("save_data_table");
	if (table) {
		let html = "<tr><th>Game/Tool</th><th>Data Type</th><th>Action</th></tr>";
		for (let index = 0; index < localStorage.length; index++) {
			let key = localStorage.key(index);
			if (!key || !/Yrahcaz7/i.exec(key)) {
				continue;
			}
			let type = "Game progress";
			key = key.replace(/Yrahcaz7|ModTree/gi, "");
			if (key.includes("options")) {
				key = key.replace(/options/i, "");
				type = "Options/Settings";
			} else if (/save\/(0|v3\/run)/i.test(key)) {
				key = key.replace(/save\/(0|v3\/run)/i, "");
				type = "Current run progress";
			} else if (/save\/(master|v3\/global)/i.test(key)) {
				key = key.replace(/save\/(master|v3\/global)/i, "");
				type = "Overall progress";
			} else {
				key = key.replace(/save/i, "");
			}
			key = toTitle(key.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[^A-Za-z0-9]/g, " ").trim());
			if (key === "Booster Generator Tree") {
				key = "Booster-Generator Tree";
			}
			if (TOOLS.some(tool => tool[0] === key)) {
				type = "Tool save data";
			}
			html += "<tr><td>" + key + "</td><td>" + type + "</td><td><select id='save_" + index + "_action'><option value='keep'>Keep</option><option value='delete'>Delete</option></select></td></tr>";
		}
		table.innerHTML = html;
	}
	useDialog("save_manager", element => element.showModal());
}

/**
 * @param {string} str 
 */
function toTitle(str) {
	let result = "";
	for (let num = 0; num < str.length; num++) {
		if (num === 0 || (/\s/.test(str.charAt(num - 1)) && !/^(a|an|and|at|but|by|for|in|nor|of|on|or|so|the|to|up|yet)(?!\w)/.test(str.substring(num)))) {
			result += str.charAt(num).toUpperCase();
		} else {
			result += str.charAt(num);
		}
	}
	return result;
}

function closeSaveManager() {
	useDialog("save_manager", element => element.close());
}

function confirmApplyManagement() {
	useDialog("confirm_save_management", element => element.showModal());
}

function closeConfirmation() {
	useDialog("confirm_save_management", element => element.close());
}

function applyChanges() {
	for (let index = localStorage.length - 1; index >= 0; index--) {
		const key = localStorage.key(index);
		if (key && /Yrahcaz7/i.exec(key)) {
			const actionSelector = document.getElementById("save_" + index + "_action");
			if (actionSelector instanceof HTMLSelectElement && actionSelector.value === "delete") {
				localStorage.removeItem(key);
			}
		}
	}
	useDialog("confirm_save_management", element => element.close());
	useDialog("save_manager", element => element.close());
}

/**
 * @param {string} elementID
 * @param {(element: HTMLDialogElement) => void} callback 
 */
function useDialog(elementID, callback) {
	const element = document.getElementById(elementID);
	if (element instanceof HTMLDialogElement) {
		callback(element);
	}
}
