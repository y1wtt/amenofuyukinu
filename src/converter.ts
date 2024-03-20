
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
    console.log(inputText)
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
    console.log(r)
    console.log(g)
    console.log(b)
    return rgbToHue(r,g,b)
}

const NumberToHex = (el:number) => {
    return Math.round(el * 255).toString(16)
}

export const HSBToColorCode = (h:number,s:number,l:number) =>{
    const H = parseInt(h.toString()) /360
    const S = s/100
    const L = l/100
    let r, g, b;
    console.log(`h:${H},S:${S},L:${L}`)

    if(S == 0){
        r = g = b = L; // achromatic
    }else{
        const hue2rgb = (p:number, q:number, t:number) => {
            console.log(`${t}`)
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        let q = L < 0.5 ? L * (1 + S) : L + S - L * S;
        let p = 2 * L - q;
        r = hue2rgb(p, q, H + 1/3);
        g = hue2rgb(p, q, H);
        b = hue2rgb(p, q, H - 1/3);
    }
    return `#${NumberToHex(r)}${NumberToHex(g)}${NumberToHex(b)}`
}