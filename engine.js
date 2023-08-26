//
// Setup - called on body load...
//
function setupEditor() {
  //
  // Set up file handler
  //
  document.getElementById("load-btn").addEventListener('change', handleFile, false);
  let cm = new CodeMirror.fromTextArea(document.findElementById("editor"));
}

