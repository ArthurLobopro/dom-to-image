import { elementToSVG } from "dom-to-svg"
import { height, width } from "./util"

export { elementToSVG as toSvg }

function createCanvas(width: number, height: number) {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")!

    canvas.width = width
    canvas.height = height

    return { ctx, canvas }
}

export function toSVGElement(element: HTMLElement) {
    const svgString = new XMLSerializer()
        .serializeToString(elementToSVG(element))

    const svgElement = document.createElement("svg")
    svgElement.outerHTML = svgString

    return svgElement
}

function draw(element: Element): Promise<HTMLCanvasElement> {
    const svgString = new XMLSerializer()
        .serializeToString(elementToSVG(element))

    const image = new Image()
    image.src = 'data:image/svg+xml;charset=utf-8,' + svgString

    return new Promise((resolve, reject) => {
        image.onload = () => {
            const { ctx, canvas } = createCanvas(width(image), height(image))

            ctx.drawImage(image, 0, 0)

            resolve(canvas)
        }

        image.onerror = reject
    })
}

export async function toPNG(element: HTMLElement) {
    return draw(element).then(canvas => canvas.toDataURL())
}

export async function toJPG(element: HTMLElement, quality = 1) {
    return draw(element).then(canvas => canvas.toDataURL('image/jpeg', quality))
}

/**
 * Safari does not have support for this function yet
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL#browser_compatibility
 */
export async function toWEBP(element: HTMLElement, quality = 1) {
    return draw(element).then(canvas => canvas.toDataURL('image/webp', quality))
}