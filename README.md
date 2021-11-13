# New React Folder

Adds a "Create New React Folder" option to the Explorer context menu. Clicking this option will allow you to enter a name for the folder. The folder will be generated, with matching file names inside5.

## Configuration

Configure file creation in settings (Workbench/New React Folder):

![configuration options](https://raw.githubusercontent.com/baerkins/vscode-react-folder/blob/main/img/options.png "Configuration")

**Custom Extensions:** Addtional files can be created by adding extension names here seperated by a comma. Extension names should not contain a leading dot. Example: `scss,module.css,stories.js`

**Include Default Content:** If this option is checked, the react file will include default import and export content *Default: `true`*

**React File Format:** File extension for the react file (should not contain a leading dot) *Default: `jsx`*

## Usage

Right click a file or folder where you would like to create the react folder in the explorer.

Select "Create New React Folder", and enter the name in the input box.
