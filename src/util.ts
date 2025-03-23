export function width(node: Element) {
    const leftBorder = px(node, 'border-left-width')
    const rightBorder = px(node, 'border-right-width')
    return node.scrollWidth + leftBorder + rightBorder
}

export function height(node: Element) {
    const topBorder = px(node, 'border-top-width')
    const bottomBorder = px(node, 'border-bottom-width')
    return node.scrollHeight + topBorder + bottomBorder
}

export function px(node: Element, styleProperty: string) {
    const value = window.getComputedStyle(node).getPropertyValue(styleProperty)
    return parseFloat(value.replace('px', ''))
}

export function escape(string: string) {
    return string.replace(/([.*+?^${}()|[\]/\\])/gu, '\\$1')
}