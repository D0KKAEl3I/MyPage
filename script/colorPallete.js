let colorPallete = document.getElementById('color')

let colorBlockSize = ((colorPallete.clientWidth - 10) / 5) - 8
let colorBlockCount = Math.floor(colorPallete.clientWidth / 30) * (Math.floor(colorPallete.clientHeight / 30) - 1)
function addColorBlock() {
    let node = document.createElement('li')
    node.style.width = colorBlockSize + 'px'
    node.style.height = colorBlockSize + 'px'
    let r = (Math.floor(Math.random() * 255) + 1).toString(16)
    let g = (Math.floor(Math.random() * 255) + 1).toString(16)
    let b = (Math.floor(Math.random() * 255) + 1).toString(16)
    if (r.length == 1) r = 0 + r;
    if (g.length == 1) g = 0 + g;
    if (b.length == 1) b = 0 + b;
    node.style.backgroundColor = '#' + r + g + b
    node.addEventListener('click', function () {
        selectedColor = this.style.backgroundColor
    })
    colorPallete.appendChild(node)
}

for (let i = 0; i < colorBlockCount; i++) {
    addColorBlock()
}

