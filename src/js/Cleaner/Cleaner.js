class Cleaner {
    // html element wordt leegemaakt
    clean(whatToClean) {
      document.querySelector(whatToClean).innerHTML = "";
    }
  }