class API {
    // async gebeurd in de achtergrond en er wordt gewacht
    async getData(url) {
      let dataToBeReturned = {};
      // hier wordt de data opgehaald
      await fetch(url)
        .then((repsponse) => {
          return repsponse.json();
        })
        .then((data) => {
          dataToBeReturned = data.data;
        });
      // hier wordt de data terug gegeven
      return dataToBeReturned;
    }
  }