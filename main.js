const GAMES = [["Formula Clicker", "A simplistic<br>incremental game", true], ["Dungeon of Souls", "A turn-based roguelike<br>deck-builder game"], ["Matter Grid", "A clicker game based around<br>filling a grid with matter"], ["The Septenary Forest", "A collection of incremental<br>games made using TMT", false, true], ["&block;&block;&block;&block;&block;&block;'&block;-&block;i&block;&block;&block;&block;&block;&block;&block;&block;", "A work of &block;&block;teract&block;&block;e f&block;&block;t&block;&block;n<br>Currently st&block;&block;l &block;&block; beta"]];

const TOOLS = [["Matrix Transformation", "A tool to visualize<br>matrix transformations"], ["Ancient Code Converter", "A code converter for<br>mathmatical expressions"]];

window.onload = () => {
	let text = "";
	for (let index = 0; index < GAMES.length; index++) {
		text += "<span class='item'>";
		if (GAMES[index][2]) text += "<div class='star'></div>";
		text += "<div><b>" + GAMES[index][0] + "</b><br>";
		if (GAMES[index][1]) text += GAMES[index][1] + "<br>";
		text += "<a href=\"https://yrahcaz7.github.io/" + GAMES[index][0].replace(/&block;/g, "_").replace(/\s|'/g, "-") + "/\">Play the Game" + (GAMES[index][3] ? "s" : "") + "</a><br>";
		text += "<a href=\"https://github.com/Yrahcaz7/" + GAMES[index][0].replace(/&block;/g, "_").replace(/\s|'/g, "-") + "\">View Source Code</a></div></span>";
	};
	document.getElementById("games").innerHTML = text;
	text = "";
	for (let index = 0; index < TOOLS.length; index++) {
		text += "<span class='item'><div><b>" + TOOLS[index][0] + "</b><br>";
		if (TOOLS[index][1]) text += TOOLS[index][1] + "<br>";
		text += "<a href=\"https://yrahcaz7.github.io/" + TOOLS[index][0].replace(/&block;/g, "_").replace(/\s|'/g, "-") + "/\">Use the Tool</a><br>";
		text += "<a href=\"https://github.com/Yrahcaz7/" + TOOLS[index][0].replace(/&block;/g, "_").replace(/\s|'/g, "-") + "\">View Source Code</a></div></span>";
	};
	document.getElementById("tools").innerHTML = text;
};

let nightTheme = false;

function changeTheme() {
	if (nightTheme) {
		document.getElementById("theme").innerHTML = "Switch to Dark Theme";
		document.documentElement.style.setProperty("--bg-color", "#F0F0F0");
		document.documentElement.style.setProperty("--txt-color", "#101010");
		document.documentElement.style.setProperty("--link-color-1", "#0000EE");
		document.documentElement.style.setProperty("--link-color-2", "#551A8B");
		document.documentElement.style.setProperty("--table-color", "#10F0F040");
	} else {
		document.getElementById("theme").innerHTML = "Switch to Light Theme";
		document.documentElement.style.setProperty("--bg-color", "#101010");
		document.documentElement.style.setProperty("--txt-color", "#F0F0F0");
		document.documentElement.style.setProperty("--link-color-1", "#EEEE00");
		document.documentElement.style.setProperty("--link-color-2", "#508B1A");
		document.documentElement.style.setProperty("--table-color", "#F0101040");
	};
	nightTheme = !nightTheme;
};

function title(str) {
	let result = "";
	for (let num = 0; num < str.length; num++) {
		if (num == 0 || (/\s/.test(str.charAt(num - 1)) && !/^(a|an|and|at|but|by|for|in|nor|of|on|or|so|the|to|up|yet)(?!\w)/.test(str.substring(num)))) result += str.charAt(num).toUpperCase();
		else result += str.charAt(num);
	};
	return result;
};

let tools = ["Ancient Code Converter", "Ultra Timetable", "Thing Manager"];

function openSaveManager() {
	if (!document.getElementById("save_manager")) {
		let popup = document.createElement("dialog");
		popup.id = "save_manager";
		let html = "<div>These are your save data items for all Yrahcaz7 games/tools.<br>You may choose to delete any of them, wiping the saved data.<br>Keep in mind that removing all your stored browser data removes all<br>of this data as well, so you should export your saves beforehand.</div><table><tr><th>Game/Tool</th><th>Data Type</th><th>Action</th></tr>";
		for (let index = 0; index < localStorage.length; index++) {
			let key = localStorage.key(index);
			if (/Yrahcaz7/i.exec(key)) {
				let type = "Game progress";
				key = key.replace(/Yrahcaz7|ModTree/gi, "");
				if (key.includes("options")) {
					key = key.replace(/options/i, "");
					type = "Options/Settings";
				} else if (key.includes("save/0")) {
					key = key.replace(/save\/0/i, "");
					type = "Current run progress";
				} else if (key.includes("save/master")) {
					key = key.replace(/save\/master/i, "");
					type = "Overall progress";
				} else {
					key = key.replace(/save/i, "");
				};
				key = title(key.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[^A-Za-z0-9]/g, " ").trim());
				if (key == "Booster Generator Tree") key = "Booster-Generator Tree";
				if (tools.includes(key)) type = "Tool save data";
				html += "<tr><td>" + key + "</td><td>" + type + "</td><td><select id='save_" + index + "_action'><option value='0'>Keep</option><option value='1'>Delete</option></select></td></tr>";
			};
		};
		html += "</table><div class='flex'><button class='item' onclick='closeSaveManager()'>Cancel</button><button class='item' onclick='confirmApplyManagement()'>Apply</button></div>";
		popup.innerHTML = html;
		document.body.append(popup);
		popup.showModal();
	} else {
		for (let index = 0; index < localStorage.length; index++) {
			let key = localStorage.key(index);
			if (/Yrahcaz7/i.exec(key)) document.getElementById("save_" + index + "_action").value = "0";
		};
	};
	document.getElementById("save_manager").showModal();
};

function closeSaveManager() {
	if (document.getElementById("save_manager")) document.getElementById("save_manager").close();
};

function confirmApplyManagement() {
	if (!document.getElementById("confirm_save_management")) {
		let popup = document.createElement("dialog");
		popup.id = "confirm_save_management";
		popup.innerHTML = "<div>Are you really sure you want to apply these changes?</div><div class='flex' style='margin-top: 1rem'><button class='item' onclick='closeConfirmation()'>No, go back</button><button class='item' onclick='applyChanges()'>Yes, I am sure</button></div>";
		document.body.append(popup);
		popup.showModal();
	} else {
		for (let index = 0; index < localStorage.length; index++) {
			let key = localStorage.key(index);
			if (/Yrahcaz7/i.exec(key)) document.getElementById("save_" + index + "_action").value = "0";
		};
	};
	document.getElementById("confirm_save_management").showModal();
};

function closeConfirmation() {
	if (document.getElementById("confirm_save_management")) document.getElementById("confirm_save_management").close();
};

function applyChanges() {
	for (let index = localStorage.length - 1; index >= 0; index--) {
		let key = localStorage.key(index);
		if (/Yrahcaz7/i.exec(key) && document.getElementById("save_" + index + "_action").value > 0) localStorage.removeItem(key);
	};
	document.getElementById("confirm_save_management").remove();
	document.getElementById("save_manager").remove();
};
