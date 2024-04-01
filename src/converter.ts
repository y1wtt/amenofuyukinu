
const rgbToHue = (r:number, g:number, b:number) => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max:number = Math.max(r, g, b), min = Math.min(r, g, b);
    let d:number = max - min;

    let h:number = 0;
    if (max !== min) {// gray scale hue is 0
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return h * 360;
}
const RGBHexToDec = (hexStr:string):number => {
    return parseInt(hexStr,16)
}
export const InputToHue = (inputText:String):number|undefined =>{
    const trimInput = inputText.trim()
    let formattedInput:String = "";

    if (trimInput.length == 7 && trimInput.startsWith("#")){
        formattedInput = trimInput.substring(1,trimInput.length)
    } else if (trimInput.length == 6){
        formattedInput = trimInput
    } else {
        return
    }
    const r = RGBHexToDec(formattedInput.substring(0,2))
    const g = RGBHexToDec(formattedInput.substring(2,4))
    const  b = RGBHexToDec(formattedInput.substring(4,6))
    if (isNaN(r) || isNaN(g) || isNaN(b)){
        return
    }
    return rgbToHue(r,g,b)
}

const NumberToHex = (el:number) => {
    return Math.round(el).toString(16).padStart(2,'0')
}

export const HSBToRGB = (h:number, s:number, v:number) => {
    let r, g, b, i, f, p, q, t;
    h = Math.max(0, Math.min(360, h));
    s = Math.max(0, Math.min(1, s));
    v = Math.max(0, Math.min(1, v));

    if(s === 0) {
        // Achromatic (grey)
        r = g = b = v;
        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }

    h /= 60; // sector 0 to 5
    i = Math.floor(h);
    f = h - i; // factorial part of h
    p = v * (1 - s);
    q = v * (1 - s * f);
    t = v * (1 - s * (1 - f));

    switch(i) {
        case 0:
            r = v;
            g = t;
            b = p;
            break;
        case 1:
            r = q;
            g = v;
            b = p;
            break;
        case 2:
            r = p;
            g = v;
            b = t;
            break;
        case 3:
            r = p;
            g = q;
            b = v;
            break;
        case 4:
            r = t;
            g = p;
            b = v;
            break;
        default: // case 5:
            r = v;
            g = p;
            b = q;
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

export const RGBToColorCode = (r:number, g:number, b:number) =>{
    return `#${NumberToHex(r)}${NumberToHex(g)}${NumberToHex(b)}`
}