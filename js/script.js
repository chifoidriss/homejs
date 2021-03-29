const routes = [
    {
        name: 'home',
        template: 'views/home',
    },
    {
        name: 'login',
        template: 'views/login',
    },
    {
        name: 'register',
        template: 'views/register',
    }
]

var title = "Pavel"
var nom = "Camel Léonce"
var a = { value: 15 }

var personnes = [
    {
        nom: "CHIFO",
        prenom: "Idriss",
        autre: {
            age: 20,
            sexe: 'Masculin'
        }
    },
    {
        nom: "FOPA",
        prenom: "Pavel",
        autre: {
            age: 30,
            sexe: 'Masculin'
        }
    },
    {
        nom: "DJUIKEM",
        prenom: "Séréna",
        autre: {
            age: 5,
            sexe: 'Féminin'
        }
    },
    // {
    //     nom: "DJOULAKO",
    //     prenom: "Camel",
    //     autre: {
    //         age: 25,
    //         sexe: 'Masculin'
    //     }
    // }
];

var personne = {
    nom: 'CHIF',
    prenom: 'Idriss'
}

var noms = [
    "Idriss",
    "Pavel",
    "Séréna"
];



function boucleAfficher() {
    var z, element, parent, objet, attribut, locale;

    z = document.getElementsByTagName("*");
    for (var i = 0; i < z.length; i++) {
        element = z[i];
        parent = element.parentElement;
        attribut = element.getAttribute("i-parcourir");

        if (attribut) {
            locale = attribut.split('dans',2)[0].trim();
            objet = attribut.split('dans',2)[1].trim();

            window[objet].forEach(elt => {
                window[locale] = elt;
                var enfant = element;
                // console.log(enfant);
                parent.appendChild(enfant);
            });
            element.removeAttribute('i-parcourir');
        }
    }
}

function afficherUneVariable() {
    var z, element, content;

    z = document.getElementsByTagName('affiche');

    for (var i = 0; i < z.length; i++) {
        element = z[i];
        content = z[i].textContent.trim();

        if (content.includes('(') && content.includes(')')) {
            var func, params;
            func = content.substring(0, content.lastIndexOf('(')-1);
            params = content.substring(content.indexOf('(')+1, content.lastIndexOf(')')-1);
            element.textContent = window[func](params);
        } else {
            element.textContent = window[content];
        }
    }
}

function boucleParcourir() {
    var z = document.getElementsByTagName('repeter');

    for (var i = 0; i < z.length; i++) {
        element = z[i];
        z[i].parentElement.textContent = window[z[i].textContent.trim()];
        z[i].remove();
    }
    // z.forEach
}

function fun(text, age) {
    return "Salut " + text + " Tu as " + age;
}

function hModel() {
    const elements = document.querySelectorAll('input,textarea,select')

    for (var i = 0; i < elements.length; i++) {
        const element = elements[i]

        if (element.hasAttribute(dModel)) {
            const attribute = element.getAttribute(dModel)
            
            if (element.nodeName == 'select') {
                element.addEventListener('change', function (event) {
                    var stringVar = attribute+'="'+this.value+'"'
                    eval(stringVar)
                })
            } else {
                element.addEventListener('keyup', function (event) {
                    var stringVar = attribute+'="'+this.value+'"'
                    eval(stringVar)
                })
            }

            element.removeAttribute(dIf)
        }
    }
}



function affiche(elementRef) {
    var element, content;
    if (elementRef) {
        var affiche = elementRef.getElementsByTagName('affiche');
    } else {
        var affiche = document.getElementsByTagName('affiche');
    }

    for (var i = 0; i < affiche.length; i++) {
        // affiche[i].replaceWith(window[affiche[i].textContent.trim()]);

        element = affiche[i];
        content = affiche[i].textContent.trim();

        element.textContent = eval(content);
    }
}


// Boucle repeter
function repeter() {
    var repeter = document.getElementsByTagName('repeter');
    for (var i = 0; i < repeter.length; i++) {
        elements = repeter[i].getAttribute("elements");

        if (elements) {
            locale = elements.split('dans',2)[0].trim();
            objet = elements.split('dans',2)[1].trim();

            if (locale && objet) {
                window[objet].forEach(elt => {
                    window[locale] = elt
                    element = repeter[i].innerHTML
                    
                    var newElt = document.createElement('span')
                    newElt.replaceWith(element)

                    repeter[i].parentElement.append(newElt)
                });
            }
        }
    }

}

function hRepeat() {
    for (var i = 0; i < z.length; i++) {
        const element = z[i];
        
        if (element.hasAttribute(dRepeat)) {
            const parent = element.parentNode;
            const attribut = element.getAttribute(dRepeat);
            
            const locale = attribut.split('in',2)[0].trim();
            const objet = attribut.split('in',2)[1].trim();
            
            window[objet].forEach(elt => {
                window[locale] = elt
                
                const enfant = element.cloneNode(true)
                enfant.removeAttribute(dRepeat)
                parent.insertBefore(enfant, element)
                interpolationRepeat(enfant)
                hIfRepeat(enfant)
                delete window[locale]
            });
            element.remove()
        }
    }
}

function hOut() {
    var element, attribut;

    for (var i = 0; i < z.length; i++) {
        element = z[i]

        if (element.hasAttribute(dOut)) {
            attribut = element.getAttribute(dOut)
            // element.innerHTML = window[attribut]
            element.innerHTML = eval(attribut)
            
            element.removeAttribute(dOut)
        }
    }
}

function hIf() {
    for (var i = 0; i < z.length; i++) {
        const element = z[i]

        if (element.hasAttribute(dIf)) {
            const attribute = element.getAttribute(dIf)
            if (!eval(attribute))
                element.remove()
            else
                element.removeAttribute(dIf)
        }
    }
}

function hIfRepeat(elementRef) {
    var elements = elementRef.getElementsByTagName("*");

    for (var i = 0; i < elements.length; i++) {
        const element = elements[i]

        if (element.hasAttribute(dIfR)) {
            const attribute = element.getAttribute(dIfR)
            const varName = attribute.split('.').shift()
            var properties = attribute.split('.')
            properties.shift()
            properties = properties.join('.')
            
            const output = eval('try{JSON.parse('+varName+').'+properties+'}catch(e){'+varName+'.'+properties+'}')
            if (!output)
                element.remove()
            else
                element.removeAttribute(dIfR)
        }
    }
}

function interpolation(elementRef) {
    const element = elementRef ?? root
    const regex = /{{[ ]*([a-zA-Z_]+.*)[ ]*}}/mg

    element.innerHTML = element.innerHTML.replace(regex, function (match, $1) {
        return eval($1)
    })
}

function interpolationRepeat(elementRef) {
    const element = elementRef
    const regex = /{{[ ]*\$+([a-zA-Z_]+[\w$\.'"()]*)[ ]*}}/mg

    element.innerHTML = element.innerHTML.replace(regex, function (match, $1) {
        return eval($1)
        if ($1.indexOf('.') === -1) {
            return eval($1)
        } else {
            const varName = $1.split('.').shift()
            var properties = $1.split('.')
            properties.shift()
            properties = properties.join('.')
            
            return eval('try{JSON.parse('+varName+').'+properties+'}catch(e){'+varName+'.'+properties+'}')
        }
    })
}

function includeHTML() {    
    for (i = 0; i < z.length; i++) {
        const element = z[i];
        
        if (element.hasAttribute(dInclude)) {
            const file = element.getAttribute(dInclude).trim()
            
            const http = new XMLHttpRequest();
            http.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        element.innerHTML = this.responseText;

                        interpolation()
                        hRepeat()
                        hIf()
                        hModel()
                        includeHTML()
                    }
                    if (this.status == 404) {
                        const div = document.createElement('div')
                        const h1 = document.createElement('h1')
                        const h3 = document.createElement('h3')
                        h1.innerHTML = '<b>404</b>'
                        h3.innerHTML = '<b>Page not found.</b>'

                        element.innerHTML = "<h1><b>404</b></h1><h3><b>Page not found.</b></h3>";
                    }
                    
                    element.removeAttribute(dInclude)
                }
            }
            http.open("GET", file+cExtensionFile, true)
            http.send()
        }
    }
}


function superLoader(elementRef) {
    const htmlElement = elementRef ?? root
    const htmlElements = htmlElement.getElementsByTagName('*')

    // Interpolation variables

    const regex = /{{[ ]*([a-zA-Z_]+.*)[ ]*}}/mg

    htmlElement.innerHTML = htmlElement.innerHTML.replace(regex, function (match, $1) {
        return '<out name="'+$1.trim()+'">'+eval($1.trim())+'</out>'
    })



    const regexIncludeFile = /#include\(["' ]*([\w_$-]+)["' ]*\)/mg
    htmlElement.innerHTML = htmlElement.innerHTML.replace(regexIncludeFile, function (match, $1) {
        const file = $1
        var response
        const http = new XMLHttpRequest()
        http.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    response = this.responseText
                } else {
                    response = "<h1><b>"+this.status+"</b></h1><h3><b>"+this.statusText+"</b></h3>"
                }
                return response
            }
        }
        http.open("GET", file+cExtensionFile, false)
        http.send()
        
        return response
    })

    // const regexForeach = /#foreach\(["']{0,1}([\w_$-]+)["']{0,1}\)/mg
    // htmlElement.innerHTML = htmlElement.innerHTML.replace(regexForeach, function (match, $1) {
    //     const locale = match.split('in',2)[0].trim()
    //     const objet = match.split('in',2)[1].trim()
        
    //     window[objet].forEach(elt => {
    //         window[locale] = elt
            
    //         delete window[locale]
    //     })

    //     console.log(match)
        
    //     return response
    // })

    



    for (var i = 0; i < htmlElements.length; i++) {
        const element = htmlElements[i];
        
        if (element.hasAttribute(dRepeat)) {
            const parent = element.parentNode;
            const attribut = element.getAttribute(dRepeat).trim();
            
            const locale = attribut.split('in',2)[0].trim();
            const objet = attribut.split('in',2)[1].trim();
            
            window[objet].forEach(elt => {
                window[locale] = elt
                
                const enfant = element.cloneNode(true)
                enfant.removeAttribute(dRepeat)
                parent.insertBefore(enfant, element)
                interpolationRepeat(enfant)
                hIfRepeat(enfant)
                delete window[locale]
            });
            element.remove()
        }

        if (element.hasAttribute(dIf)) {
            const attribute = element.getAttribute(dIf).trim()
            if (!eval(attribute))
                element.remove()
            else
                element.removeAttribute(dIf)
        }

        if (element.hasAttribute(dModel)) {
            const attribute = element.getAttribute(dModel).trim()
            element.value = eval(attribute)
            
            if (element.nodeName == 'select') {
                element.addEventListener('change', function (event) {
                    const stringVar = attribute+'="'+this.value+'"'
                    eval(stringVar)
                    
                    const allOccurrences = htmlElement.querySelectorAll('out[name="'+attribute+'"]')
                    allOccurrences.forEach(elt => {
                        elt.innerHTML = eval(attribute)
                    })
                    element.removeAttribute(dModel)
                })
            } else {
                element.addEventListener('keyup', function (event) {
                    const stringVar = attribute+'="'+this.value+'"'
                    eval(stringVar)
                    
                    const allOccurrences = htmlElement.querySelectorAll('out[name="'+attribute+'"]')
                    allOccurrences.forEach(elt => {
                        elt.innerHTML = eval(attribute)
                    })
                    element.removeAttribute(dModel)
                })
            }
        }

        if (element.hasAttribute(dInclude)) {
            const file = element.getAttribute(dInclude).trim()
            
            const http = new XMLHttpRequest();
            http.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        element.innerHTML = this.responseText;
                        
                        element.removeAttribute(dInclude)
                        superLoader(element)
                    }
                    if (this.status == 404) {
                        const div = document.createElement('div')
                        const h1 = document.createElement('h1')
                        const h3 = document.createElement('h3')
                        h1.innerHTML = '<b>404</b>'
                        h3.innerHTML = '<b>Page not found.</b>'

                        element.removeAttribute(dInclude)
                        element.innerHTML = "<h1><b>404</b></h1><h3><b>Page not found.</b></h3>";
                    }
                    
                }
            }
            http.open("GET", file+cExtensionFile, true)
            http.send()
        }
        
        if (element.hasAttribute(dRouting)) {
            const attribute = element.getAttribute(dRouting).trim()
            const newUrl = window.location.href + '/#/' + attribute
            console.log(newUrl)
            element.setAttribute('href', newUrl)
            
            element.addEventListener('click', function (event) {
                event.preventDefault()
                
                history.pushState({ foo: 'fake' }, 'newUrl', '#/' + attribute);
                
                const http = new XMLHttpRequest();
                http.onreadystatechange = function() {
                    if (this.readyState == 4) {
                        if (this.status == 200) {
                            const newDocumentElement = htmlElement.querySelector('*[h-outlet]')
                            newDocumentElement.innerHTML = this.responseText
                            
                            newDocumentElement.removeAttribute(dRouting)
                            superLoader(newDocumentElement)
                        } else {
                            newDocumentElement.removeAttribute(dRouting)
                            newDocumentElement.innerHTML = "<h1><b>"+this.status+"</b></h1><h3><b>"+this.statusText+"</b></h3>"
                        }
                    }
                }
                http.open("GET", 'views/'+attribute+cExtensionFile, true)
                http.send()

                element.removeAttribute(dRouting)
            })
        }
    }
}

function secondLoad() {
    const layout = document.getElementsByTagName('h-extends')
    const documentHtml = document.querySelector('html')

    if (layout) {
        const element = layout.item(0)

        if (element) {
            const file = element.getAttribute('name').trim()
            
            const http = new XMLHttpRequest()
            http.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        const newHtmlDocument = document.createElement('html')
                        newHtmlDocument.innerHTML = this.responseText

                        const regex = /#yield\(["']{0,1}([\w_$-]+)["']{0,1}\)/mg

                        newHtmlDocument.innerHTML = newHtmlDocument.innerHTML.replace(regex, function (match, $1) {
                            const replaceHtml = document.querySelector('h-section[name="'+$1+'"]')
                            if (replaceHtml) {
                                return replaceHtml.innerHTML
                            }
                            return ''
                        })
                        
                        documentHtml.innerHTML = newHtmlDocument.innerHTML
                        
                        superLoader(documentHtml)
                    }

                    if (this.status == 404) {
                        const div = document.createElement('div')
                        const h1 = document.createElement('h1')
                        const h3 = document.createElement('h3')
                        h1.innerHTML = '<b>404</b>'
                        h3.innerHTML = '<b>Page not found.</b>'

                        element.remove()
                        documentHtml.innerHTML = "<h1><b>404</b></h1><h3><b>Page not found.</b></h3>";
                    }
                }
            }
            http.open("GET", file+cExtensionFile, true)
            http.send()
        }
    }
}

secondLoad()
superLoader()