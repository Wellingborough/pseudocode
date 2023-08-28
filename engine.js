//
// Setup - called on body load...
//
var quill;

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
      console.log("A user action triggered this change.");
      for (change in delta) {
        console.log(change);
      }
    }
  });

}
var stashedText = "";


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
