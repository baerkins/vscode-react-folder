const fs = require('fs');
const path = require('path');
const vscode = require('vscode');

const defaultContent = `import React from 'react';

export default function [COMPONENT_NAME]() {


  return (

  )
}
`;



/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

  let disposable = vscode.commands.registerCommand('createReactFolder', function (uri) {

    const uriPath = uri.fsPath;
    const isDir = fs.lstatSync(uriPath).isDirectory();
    const settings = vscode.workspace.getConfiguration('new-react-folder');
    let targetPath;

    // console.log(settings);

    if ( !isDir ) {
      targetPath = path.dirname(uriPath);
    } else {
      targetPath = uriPath;
    }

    const options = {
      ignoreFocusOut: true,
      placeHolder: 'Folder_Name',
      validateInput: function(name) {
        if (!name) {
          return 'Name is required';
        }

        if (name.includes(' ')) {
          return 'Spaces are not allowed';
        }

        if (fs.existsSync(path.resolve(targetPath, name))) {
          return 'Name exists';
        }

        // // no errors
        return undefined;
      },
      prompt: `Input the react componet name`
    };

    // Open Input Box
    vscode.window.showInputBox(options)
      .then((inputName) => {

        if (inputName !== null && inputName !== undefined ) {
          const newPath = path.resolve(targetPath, inputName);

          // Create folder path
          if (!fs.existsSync(newPath)){
            fs.mkdir(newPath, { recursive: true }, (err) => {

              if (err) throw err;

              // Remove ordering numbers and hidden underscore from file names
              let fileName = inputName;
              fileName = fileName.replace(/^[0-9]+-/, '');
              fileName = fileName.replace(/^_/, '');

              // Create react file
              let reactExt = settings.reactFileFormat ? settings.reactFileFormat : 'jsx';
              let useDefaultContent = settings.includeDefaultContent ? settings.includeDefaultContent : true;
              let fileContent = useDefaultContent ? defaultContent.replace('[COMPONENT_NAME]', fileName) : '';

              fs.writeFile(path.resolve(newPath, `${fileName}.${reactExt}`), fileContent, {encoding:"utf8"}, function (err) {
                if (err) throw err;
              });

              if ( settings.customExtensions.length && settings.customExtensions.length > 0 ) {
                let customExts = settings.customExtensions;
                customExts = customExts.split(',');

                customExts.forEach((extName) => {

                  fs.writeFile(path.resolve(newPath, `${fileName}.${extName}`), '', function (err) {
                    if (err) throw err;
                  });
                });
              }
            });
          }

        }
      });

	});

	context.subscriptions.push(disposable);
}

// exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
