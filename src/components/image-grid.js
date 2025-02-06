import ComponentBuilder from './component-builder.js'

const code = `
<div class="image-grid" id="||component-unique-id||">
</div>
`

const onMount = (props) => {
    const gridElement = document.getElementById(
        `${props['component-unique-id']}`
    )
    const imageList = JSON.parse(props['image-list'])
    const [colCount, rowCount] = props['dimensions'].split('x').map(Number)

    // Validate the number of images matches the grid dimensions
    if (imageList.length !== colCount * rowCount) {
        throw new Error(
            'The number of images does not match the grid dimensions'
        )
    }

    // Create the grid container
    gridElement.style.display = 'grid'
    gridElement.style.gridTemplateColumns = `repeat(${colCount}, 1fr)`
    gridElement.style.gridTemplateRows = `repeat(${rowCount}, 1fr)`
    gridElement.style.gap = '10px' // Adjust the gap between cells as needed

    // Populate the grid with images
    imageList.forEach((imageUrl, index) => {
        const gridCell = document.createElement('div')
        gridCell.className = "grid-cell"
        const imgElement = document.createElement('img')
        imgElement.src = imageUrl
        imgElement.alt = `Image ${index + 1}`
        imgElement.style.width = '100%' // Ensure the image fills the cell
        imgElement.style.height = '100%'
        imgElement.style.objectFit = 'cover' // Maintain aspect ratio
        gridCell.appendChild(imgElement)

        gridElement.appendChild(gridCell)
    })
}

const gridBuilder = new ComponentBuilder('image-grid', code)
gridBuilder.addAdditionalProps(['dimensions', 'image-list'])
gridBuilder.addOnMount(onMount)
gridBuilder.build()
