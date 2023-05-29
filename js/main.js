// set up classes

class API{

}

class Decrypter{

}

class Encrypter{
    stringToEncrypt;

    constructor(stringToEncrypt){
        this.stringToEncrypt = stringToEncrypt;
        this.encrypt();
    }

    encrypt(){
        for(let i = 0; i < this.stringToEncrypt.length; i++){
            console.log(this.stringToEncrypt[i]);
        }
    }
}

class Cleaner{

}

class Renderer{

} 

class Main{
    ecrypterView;
    decrypterView;

    constructor(){
        this.ecrypterView = new Encrypter;
        this.decrypterView = new Decrypter;
    }
}

class EncrypterView{
    header;
    body;
    footer;

    constructor(){
        this.header = new Header();
        this.body = new Body();
        this.footer = new Footer();

    }
}

class App{
    api;
    decrypter;
    encrypter;
    cleaner;
    renderer;
    main;

    constructor(){
        this.api = new API();
        this.decrypter = new Decrypter();
        this.encrypter = new Encrypter("hallo");
        this.cleaner = new Cleaner();
        this.renderer = new Renderer()
        this.main = new Main();
    }
}

const app = new App();
console.log(app);