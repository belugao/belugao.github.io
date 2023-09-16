
let currentContraste = 2; 
let currentFontSize = 1; 


function detacarAtalhos(indDestaque) {

    var r = document.querySelector(':root');
    var rs = getComputedStyle(r);

    if (indDestaque) {
        r.style.setProperty('--bgLetraAtalho', rs.getPropertyValue('--backgroundTertiary'));
        r.style.setProperty('--letraAtalhoDecoration', "underline");
    }
    else {
        r.style.setProperty('--bgLetraAtalho', rs.getPropertyValue('--backgroundSecondary'));
        r.style.setProperty('--letraAtalhoDecoration', "none");
    }

    document.getElementById("main_header").focus();


}

document.addEventListener("keydown", (event) => {
    const keyName = event.key;

    if (keyName === "Alt") {
        detacarAtalhos(true);
    }
}, false);

document.addEventListener("keyup", (event) => {
    const keyName = event.key;

    if (keyName === "Alt") {
        detacarAtalhos(false);
    }
}, false);

document.addEventListener("load", 
    testarContraste()
);


function testarContraste() {

    var sessionContrast = sessionStorage.getItem('contrastPreference');
    var sessionFontSize = sessionStorage.getItem('fontSizePreference');
    if (sessionContrast != null) {
        currentContraste = parseInt(sessionContrast);
    }
    if (sessionFontSize != null) {
        currentFontSize = parseInt(sessionFontSize);
    }

    if (currentContraste > 1) {
        applyContrast();
    }
    if (currentFontSize > 1) {
        applyFontSize();
    }
}

function setFontSize() {

    currentFontSize++;
    if (currentFontSize > 2) {
        currentFontSize = 1;
    }

    applyFontSize();

}

function setContraste() {

    currentContraste++;
    if (currentContraste > 3) {
        currentContraste = 1;
    }

    applyContrast();

}

function applyFontSize() {

    var r = document.querySelector(':root');
    var rs = getComputedStyle(r);

    var fontSize;
    var fontSizeLarge;

    if (currentFontSize == 2) {
        fontSize = rs.getPropertyValue('--acessibilityFontSize');
        fontSizeLarge = rs.getPropertyValue('--acessibilityFontSizeLarge');
    }
    else {
        fontSize = rs.getPropertyValue('--defaultFontSize');
        fontSizeLarge = rs.getPropertyValue('--defaultFontSizeLarge');
    }

    r.style.setProperty('--fontSize', fontSize);
    r.style.setProperty('--fontSizeLarge', fontSizeLarge);

    sessionStorage.setItem('fontSizePreference', currentFontSize);

}

function applyContrast() {

   alert(window.innerWidth);
    
    var r = document.querySelector(':root');
    var rs = getComputedStyle(r);

    var corBG1;
    var corBG2;
    var corBG3;
    
    var cor1;
    var cor2;
    var cor3;

    switch (currentContraste) {
        case 2: {
            corBG1 = rs.getPropertyValue('--darkBackgroundPrimary');
            corBG2 = rs.getPropertyValue('--darkBackgroundSecondary');
            corBG3 = rs.getPropertyValue('--darkBackgroundTertiary');
            
            cor1 = rs.getPropertyValue('--darkPrimary');
            cor2 = rs.getPropertyValue('--darkSecondary');
            cor3 = rs.getPropertyValue('--darkTertiary');

            break;
        }
        case 3: {
            corBG1 = rs.getPropertyValue('--lightBackgroundPrimary');
            corBG2 = rs.getPropertyValue('--lightBackgroundSecondary');
            corBG3 = rs.getPropertyValue('--lightBackgroundTertiary');
            
            cor1 = rs.getPropertyValue('--lightPrimary');
            cor2 = rs.getPropertyValue('--lightSecondary');
            cor3 = rs.getPropertyValue('--lightTertiary');

            break;
        }
        default: {
            corBG1 = rs.getPropertyValue('--defaultBackgroundPrimary');
            corBG2 = rs.getPropertyValue('--defaultBackgroundSecondary');
            corBG3 = rs.getPropertyValue('--defaultBackgroundTertiary');
            
            cor1 = rs.getPropertyValue('--defaultPrimary');
            cor2 = rs.getPropertyValue('--defaultSecondary');
            cor3 = rs.getPropertyValue('--defaultTertiary');
        }
    }

    r.style.setProperty('--primary', cor1);
    r.style.setProperty('--secondary', cor2);
    r.style.setProperty('--tertiary', cor3);

    r.style.setProperty('--backgroundPrimary', corBG1);
    r.style.setProperty('--backgroundSecondary', corBG2);
    r.style.setProperty('--backgroundTertiary', corBG3);

    sessionStorage.setItem('contrastPreference', currentContraste);

}
