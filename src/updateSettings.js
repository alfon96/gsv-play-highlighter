const fs = require("fs");
const path = require("path");
const vscode = require("vscode");

function activate(context) {
  // Determine the path to the settings file
  const settingsPath = path.join(
    process.env.APPDATA ||
      (process.platform == "darwin"
        ? process.env.HOME + "/Library/Preferences"
        : process.env.HOME + "/.config"),
    "Code",
    "User",
    "settings.json"
  );

  console.log(`Settings path: ${settingsPath}`);

  const settings = {
    "editor.tokenColorCustomizations": {
      textMateRules: [
        {
          scope: "keyword.control.gsv",
          settings: {
            foreground: "#ffa200",
          },
        },
        {
          scope: "entity.name.script",
          settings: {
            foreground: "#fff950",
            fontStyle: "italic underline",
          },
        },
        {
          scope: "entity.name.path",
          settings: {
            foreground: "#27ff06",
            fontStyle: "italic",
          },
        },
        {
          scope: "punctuation.separator.quote",
          settings: {
            foreground: "#ff00ea",
          },
        },
        {
          scope: "keyword.control.play",
          settings: {
            foreground: "#bb00ff",
          },
        },
        {
          scope: "keyword.name.recloc",
          settings: {
            foreground: "#00ffff",
          },
        },
        {
          scope: "keyword.name.alphanum",
          settings: {
            foreground: "#bcffff",
          },
        },
        {
          scope: "entity.name.xlogVar",
          settings: {
            foreground: "#00bfff",
          },
        },
        {
          scope: "entity.name.import",
          settings: {
            foreground: "#ffee03",
            fontStyle: "bold",
          },
        },
        {
          scope: "entity.name.preprocInitialize",
          settings: {
            foreground: "#ff00e6",
          },
        },
        {
          scope: "entity.name.messageLogs",
          settings: {
            foreground: "#e600ff",
          },
        },
        {
          scope: "entity.name.libs",
          settings: {
            foreground: "#00ffae",
            fontStyle: "italic",
          },
        },
        {
          scope: "entity.name.functions",
          settings: {
            foreground: "#00d9ff",
          },
        },
        {
          scope: "entity.name.message",
          settings: {
            foreground: "#ff00b7",
          },
        },
        {
          scope: "entity.name.xlog",
          settings: {
            foreground: "#00ffae",
            fontStyle: "italic",
          },
        },
        {
          scope: "entity.name.mucrm",
          settings: {
            foreground: "#aa00ff",
            fontStyle: "italic",
          },
        },
        {
          scope: "entity.name.recipient",
          settings: {
            foreground: "#ffee00",
            fontStyle: "italic",
          },
        },
        {
          scope: "entity.name.sender",
          settings: {
            foreground: "#0080ff",
            fontStyle: "italic",
          },
        },
        {
          scope: "entity.name.response",
          settings: {
            foreground: "#ff045c",
          },
        },
        {
          scope: "entity.name.digit",
          settings: {
            foreground: "#91ff00",
          },
        },
        {
          scope: "punctuation.separator.semicolon",
          settings: {
            foreground: "#ff00b7",
          },
        },
        {
          scope: "constant.numeric.datetime",
          settings: {
            foreground: "#00c3ff",
            fontStyle: "underline",
          },
        },
        {
          scope: "punctuation.separator.plus",
          settings: {
            foreground: "#ffee00",
          },
        },
        {
          scope: "punctuation.separator.wildcard",
          settings: {
            foreground: "#ff8400",
          },
        },
        {
          scope: "punctuation.separator.terminator",
          settings: {
            foreground: "#ff045c",
          },
        },
      ],
    },
  };

  try {
    if (fs.existsSync(settingsPath)) {
      const userSettings = JSON.parse(fs.readFileSync(settingsPath, "utf8"));
      userSettings["editor.tokenColorCustomizations"] =
        settings["editor.tokenColorCustomizations"];
      fs.writeFileSync(
        settingsPath,
        JSON.stringify(userSettings, null, 2),
        "utf8"
      );
      console.log("Settings updated successfully.");
    } else {
      fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2), "utf8");
      console.log("Settings file created and updated successfully.");
    }
  } catch (error) {
    console.error(`Error updating settings: ${error}`);
  }

  context.subscriptions.push(
    vscode.commands.registerCommand("extension.updateSettings", () => {
      vscode.window.showInformationMessage("Settings updated!");
    })
  );
}

exports.activate = activate;
