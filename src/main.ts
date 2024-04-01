import './style.css'
import 'modern-css-reset'
import {RGBToColorCode, InputToHue,HSBToRGB } from "./converter.ts";

const createHeader = (parent:HTMLDivElement) =>{
    const rowEl = document.createElement("div")
    rowEl.className = 'flex flex-row'
    const colorEl = document.createElement("div");
    colorEl.className = 'cell indicator'
    rowEl.appendChild(colorEl)
    for (let j = 0; j < 10; j++) {
        const colorEl = document.createElement("div");
        colorEl.className = 'cell indicator indicator-x'
        colorEl.innerHTML = `B${(j + 1) *10}`
        rowEl.appendChild(colorEl)
    }
    parent.appendChild(rowEl)
}
const createColorMatrix = (e:String) => {
    const entryPoint = document.querySelector<HTMLDivElement>("#matrix-entry-point")
    entryPoint!.innerHTML = ''
    createHeader(entryPoint!)
    for (let i = 0; i < 10; i++) {
        const rowEl = document.createElement("div")
        rowEl.className = 'flex flex-row'
        const indicatorEl = document.createElement("div");
        indicatorEl.className = 'cell indicator indicator-y'
        indicatorEl.innerHTML = `S${(i + 1) * 10}`
        rowEl.appendChild(indicatorEl)
        for (let j = 0; j < 10; j++) {
            const colorEl = document.createElement("div");
            colorEl.className = 'cell color-element'
            const H = InputToHue(e)
            const S = .1 + .1 * i
            const B = .1 + .1 * j
            const [R,G,Bl] = HSBToRGB(H!,S,B)
            colorEl.style.background = `rgb(${R},${G},${Bl})`
            colorEl.addEventListener('click',(_:MouseEvent) =>{
                navigator.clipboard.writeText(RGBToColorCode(R, G, Bl)).then(()  => console.log(`copied!: ${RGBToColorCode(R, G, Bl)}`))
            })
            rowEl.appendChild(colorEl)
        }
        entryPoint!.appendChild(rowEl)
    }

}

const inputEl = document.querySelector<HTMLInputElement>('#rgb-input')
const inputListener = (e:Event) =>{
    const target = e.target! as HTMLInputElement
    createColorMatrix(String(target.value))
}

inputEl!.addEventListener("input",inputListener)
createColorMatrix(inputEl!.value)
