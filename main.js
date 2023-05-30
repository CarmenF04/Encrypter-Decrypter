class Header {
    htmlElement;
    view;
    headingHtmlElement;
    constructor(view, headingText) {
      // maakt <header class="view__header"></header>
      this.htmlElement = document.createElement("header");
      this.htmlElement.classList.add("view__header");
  
      // maakt <h1 class="view__heading">headingText</h1>
      // headingText wordt meegegeven via de App via de API
      this.headingHtmlElement = document.createElement("h1");
      this.headingHtmlElement.innerText = headingText;
      this.headingHtmlElement.classList.add("view__heading");
  
      // Voegt de h1 toe aan de header
      this.htmlElement.appendChild(this.headingHtmlElement);
  
      this.view = view;
  
      // Voegt de header toe aan de encrypt en decrypt articles
      this.view.main.app.renderer.render(this.htmlElement, this.view.htmlElement);
    }
  }
  
  class Body {
    htmlElement;
    view;
    inputHtmlElement;
    text;
    constructor(view, object) {
      // maak <section class="view__body"></section>
      this.htmlElement = document.createElement("section");
      this.htmlElement.classList.add("view__body");
  
      // maak <textarea class="view__input"></textarea>
      this.inputHtmlElement = document.createElement("textarea");
      this.inputHtmlElement.classList.add("view__input");
  
      // voeg de textarea toe aan de section
      this.htmlElement.appendChild(this.inputHtmlElement);
  
      // zet de placeholder text van de textarea er in
      // op basis van de data.json via de api
      this.inputHtmlElement.placeholder = object.placeholder;
      this.inputHtmlElement.value = object.value;
      this.text = object.value;
  
      // run de typed functie als er input is in de textarea
      this.inputHtmlElement.oninput = this.typed;
  
      // voeg de section aan in de encrypt en decrypt
      this.view = view;
      this.view.main.app.renderer.render(this.htmlElement, this.view.htmlElement);
    }
  
    typed = (event) => {
      this.text = event.target.value;
    };
  
    changeBody(newText) {
      this.inputHtmlElement.value = newText;
    }
  }
  
  class Footer {
    htmlElement;
    view;
    buttonHtmlElement;
    app;
    constructor(view, buttonText) {
      // maakt <footer class="view__footer"></footer>
      this.htmlElement = document.createElement("footer");
      this.htmlElement.classList.add("view__footer");
  
      // maakt <button class="view__button"></button>
      this.buttonHtmlElement = document.createElement("button");
      this.buttonHtmlElement.classList.add("view__button");
  
      // als de button wordt geclicked arunt de buttonClicked functie
      this.buttonHtmlElement.onclick = this.buttonClicked;
  
      // de text in de button die wordt meegegeven uit de App
      this.buttonHtmlElement.innerText = buttonText;
  
      // voeg de button toe aan de footer
      this.htmlElement.appendChild(this.buttonHtmlElement);
  
      // Voegt de footer toe aan de encrypt en decrypt articles
      this.view = view;
      this.view.main.app.renderer.render(this.htmlElement, this.view.htmlElement);
    }
  
    // runt de getDataFromBody functie van de encrypter of decrypter
    buttonClicked = () => {
      this.view.getDataFromBody();
    };
  }
  
  class EncrypterView {
    header;
    body;
    footer;
    htmlElement;
    main;
    type;
  
    constructor(main, object) {
      // maakt een <article class="view"></article>
      // Met het type ENCRYPT waardoor in de andere bestanden
      // De header ENCRYPT mee krijgt en via de Main de encrypt functie
      // wordt uitgevoerd
      this.htmlElement = document.createElement("article");
      this.htmlElement.classList.add("view");
      this.main = main;
      this.type = "ENCRYPT";
  
      // hier wordt de header en footer met encrypt text gerendered
      this.main.app.renderer.render(this.htmlElement, this.main.htmlElement);
      this.header = new Header(this, "Encrypter");
      this.body = new Body(this, object);
      this.footer = new Footer(this, "Encrypt");
    }
  
    // stuurt naar de main de text in het input veld en het type
    // en via de main wordt dan de Encrypt functie uitgevoerd als de
    // button wordt geklikt door het type
    getDataFromBody() {
      this.main.cipher(this.body.text, this.type);
    }
  
    // veranderd de text in het input veld naar de ge-encrypte text
    changeBody(encryptedText) {
      this.body.changeBody(encryptedText);
    }
  }
  
  class DecrypterView {
    header;
    body;
    footer;
    htmlElement;
    main;
    type;
  
    constructor(main, placeholder) {
      // maakt een <article class="view"></article>
      // Met het type DECRYPT waardoor in de andere bestanden
      // De header DECRYPT mee krijgt en via de Main de decrypt functie
      // wordt uitgevoerd
      this.htmlElement = document.createElement("article");
      this.htmlElement.classList.add("view");
      this.type = "DECRYPT";
      this.main = main;
  
      // hier wordt de header en footer met decrypt text gerendered
      this.main.app.renderer.render(this.htmlElement, this.main.htmlElement);
      this.header = new Header(this, "Decrypter");
      this.body = new Body(this, placeholder);
      this.footer = new Footer(this, "Decrypt");
    }
  
    // stuurt naar de main de text in het input veld en het type
    // en via de main wordt dan de Decrypt functie uitgevoerd als de
    // button wordt geklikt door het type
    getDataFromBody() {
      this.main.cipher(this.body.text, this.type);
    }
  
    // veranderd de text in het input veld naar de ge-decrypte text
    changeBody(decryptedText) {
      this.body.changeBody(decryptedText);
    }
  }
  
  class Main {
    encrypterView;
    decrypterView;
    htmlElement;
    app;
    constructor(data, app) {
      this.app = app;
  
      // maak een <main class="main"></main>
      this.htmlElement = document.createElement("main");
      this.htmlElement.classList.add("main");
  
      // voeg de main toe aan de body
      this.app.renderer.render(this.htmlElement, document.querySelector("body"));
  
      // maak een encrypter en decrypter aan
      this.encrypterView = new EncrypterView(this, data.encrypt);
      this.decrypterView = new DecrypterView(this, data.decrypt);
    }
  
    // als het een ENCRYPT is runt de encrypt functie uit de app
    // als het iets anders is dan ENCRYPT, dus bijvoorbeeld DECRYPT
    // runt het de decrypt functie
    cipher(textToCipher, type) {
      if (type === "ENCRYPT") {
        this.app.encrypt(textToCipher);
      } else {
        this.app.decrypt(textToCipher);
      }
    }
  
    // veranderd de encrypted input naar de ge-encrypte text
    changeEncrypter(encryptedText) {
      this.encrypterView.changeBody(encryptedText);
    }
  
    // veranderd de decrypted input naar de ge-decrypte text
    changeDecrypter(decryptedText) {
      this.decrypterView.changeBody(decryptedText);
    }
  }
  
  class App {
    api;
    decrypter;
    encrypter;
    cleaner;
    renderer;
    main;
  
    constructor() {
      // Maakt van elke classe een nieuwe aan zodat de website inlaad en functioneel is
      this.encrypter = new Encrypter();
      this.decrypter = new Decrypter();
      this.cleaner = new Cleaner();
      this.renderer = new Renderer();
      this.api = new API();
      // geeft de URL mee voor de data en geeft die mee aan de main
      this.api.getData("/src/data/data.json").then((data) => {
        this.main = new Main(data, this);
      });
    }
  
    // encrypt de text die wordt geinput
    encrypt = (textToEncrypt) => {
      const encrypted = this.encrypter.encrypt(textToEncrypt);
      this.main.changeEncrypter(encrypted);
    };
  
    // decrypt de text die wordt geinput
    decrypt(textToDecrypt) {
      const decrypted = this.decrypter.decrypt(textToDecrypt);
      this.main.changeDecrypter(decrypted);
    }
  }
  
  // runs de code van de hele app
  const app = new App();