//
// Setup - called on body load...
//
var quill;

const keywordsIndenting = ["for", "do", "while"];
const keywordsNonIndenting = ["to", "next", "until", "endwhile"];
const keywords = keywordsIndenting.concat(keywordsNonIndenting);

var inToken = false;
var token = "";
var indentLevel = 0;
var pendingIndent = false;
const indent = "    ";

function setupEditor() {
  //
  // Set up file handler
  //
  quill = new Quill('#editor', {
    theme: 'snow'
  });

  quill.on('text-change', function(delta, oldDelta, source) {
    if (source == 'api') {
      console.log("An API call triggered this change.");
    } else if (source == 'user') {
      for (change of delta.ops) {
        for (operation in change) {
          if (operation =='insert') {
            handleInsert(change[operation]);
          }
        }
      }
    }
  });

}
var stashedText = "";

function handleInsert(insertedChar) {
  //console.log("That was an insert");
  if (insertedChar == ' ') {
    //console.log("A space");
    inToken = false;
    token = "";
    var range = quill.getSelection();
    if (range) {
      if (range.length == 0) {
        let currentposition = range.index;
        quill.formatText(currentposition-1, currentposition, 'bold', false); 
      }
    }
  }
  else if (insertedChar =='\n') {
    console.log("A return");
    inToken = false;
    token = "";
    // reset any formatting as we have left the keyword (if it was such)
    var range = quill.getSelection();
    if (range) {
      if (range.length == 0) {
        let currentposition = range.index;
        quill.formatText(currentposition, currentposition, 'bold', false); 
      }
    }

    // check for pending indent
    if (pendingIndent == true) {
      var caretPosition = quill.getSelection(true);
      quill.insertText(caretPosition+1, indent);
      pendingIndent = false;
    }
  }
  else
  {
    token = token+change[operation];
    if (keywords.includes(token)) {
      // mark the keyword token using bold
      var range = quill.getSelection();
      if (range) {
        if (range.length == 0) {
          let currentposition = range.index;
          let kwsize = token.length;
          quill.formatText(currentposition-kwsize, currentposition, 'bold', true); 
        }
      }

      // check whether we need to indent
      if (keywordsIndenting.includes(token)) {
        pendingIndent = true;
      }
    }
  }
}


const levenshteinDistance = (str1 = '', str2 = '') => {
   const track = Array(str2.length + 1).fill(null).map(() =>
   Array(str1.length + 1).fill(null));
   for (let i = 0; i <= str1.length; i += 1) {
      track[0][i] = i;
   }
   for (let j = 0; j <= str2.length; j += 1) {
      track[j][0] = j;
   }
   for (let j = 1; j <= str2.length; j += 1) {
      for (let i = 1; i <= str1.length; i += 1) {
         const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
         track[j][i] = Math.min(
            track[j][i - 1] + 1, // deletion
            track[j - 1][i] + 1, // insertion
            track[j - 1][i - 1] + indicator, // substitution
         );
      }
   }
   return track[str2.length][str1.length];
};
