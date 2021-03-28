
function interpolation(elementRef) {
    const element = elementRef ?? root
    const regex = /{{[ ]*([a-zA-Z_$]+.*)[ ]*}}/mg
    const regex2 = /\$([ ]*([a-zA-Z_$]+.*)[ ]*)/mg
    const regex3 = /\${[ ]*([a-zA-Z_$]+.*)[ ]*}/mg

    element.innerHTML = element.innerHTML.replace(regex, function (match, $1) {
        return eval($1)
    })
}

function hIf() {
    for (var i = 0; i < z.length; i++) {
        const element = z[i]

        if (element.hasAttribute(dIf)) {
            const attribute = element.getAttribute(dIf)
            if (!window[attribute])
                element.remove()
            else
                element.removeAttribute(dIf)
        }
    }
}

function hRepeat() {
    for (var i = 0; i < z.length; i++) {
        const element = z[i]
        
        if (element.hasAttribute(dRepeat)) {
            const parent = element.parentNode
            const attribute = element.getAttribute(dRepeat)
            
            const locale = attribute.split('in',2)[0].trim()
            const objet = attribute.split('in',2)[1].trim()
            
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

function interpolationRepeat(elementRef) {
    const element = elementRef
    const regex = /{{[ ]*\$+([a-zA-Z_]+.*)[ ]*}}/mg

    element.innerHTML = element.innerHTML.replace(regex, function (match, $1) {
        return eval($1)
    })
}