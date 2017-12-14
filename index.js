const propRegex = /{([^:{}]+)}/;
const propDelimiter = ',';

/**
 * The wrap must be a function so that the properties to destruct can be extracted
 * @param {*} wrap 
 */
function extractProperties(wrap) {
    const definition = wrap.toString();
    const matches = definition.match(propRegex);

    if (matches && matches.length >= 1) {
        return matches[1]
            .split(propDelimiter)
            .map(x => x.trim());
    }

    return [];
}

/**
 * Destructure an object into an object.
 * @param {*} wrap, wrap the object to destructure as a lambda in form `() => ({prop1, props2} = source)`
 * @param {*} clone, optional and if true, the source is cloned 
 */
function destructure(wrap, clone) {
    const properties = extractProperties(wrap);
    if (properties.length > 0) {
        // Unwrap the object
        const source = wrap();

        return properties.reduce((target, property) => {
            const value = source[property];
            if (clone) {
                if (typeof value === 'object') {
                    if (Array.isArray(value)) {
                        target[property] = [...value];
                    } else {
                        target[property] = { ...value };
                    }
                } else {
                    target[property] = value;
                }
            } else {
                target[property] = value;
            }
            return target;
        }, {});
    }

    // Return original object
    return wrap();
}

// Extend the object
Object.prototype.destructure = destructure;
