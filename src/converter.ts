
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