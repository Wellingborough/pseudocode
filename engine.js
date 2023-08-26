//
// Setup - called on body load...
//
var cm;

function setupEditor() {
  //
  // Set up file handler
  //
  //document.getElementById("load-btn").addEventListener('change', handleFile, false);
  cm = new CodeMirror.fromTextArea(document.getElementById("theeditor"));
}

