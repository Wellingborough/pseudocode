//
// Setup - called on body load...
//
var editor;

function setupEditor() {
  //
  // Set up file handler
  //
  editor = ace.edit("editor");
  editor.setTheme("ace/theme/monokai");
  editor.session.setMode("ace/mode/javascript");
}

