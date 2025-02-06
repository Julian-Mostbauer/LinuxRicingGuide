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
  const [colCount, rowCount] = props['dimensions'].split('x')

  if (imageList.length !== colCount * rowCount) {
    throw new Error(
      'The number of images does not match the grid dimensions'
    )
  }

  for (let row = 0; row < rowCount; row++) {
    const rowElement = document.createElement('div')
    rowElement.classList.add('row')

    for (let col = 0; col < colCount; col++) {
      const colElement = document.createElement('div')
      colElement.classList.add('col')

      const imgElement = document.createElement('img')
      imgElement.src = imageList[row * colCount + col]
      colElement.appendChild(imgElement)

      rowElement.appendChild(colElement)
    }

    gridElement.appendChild(rowElement)
  }
}

const gridBuilder = new ComponentBuilder('image-grid', code)
gridBuilder.addAdditionalProps(['dimensions', 'image-list'])
gridBuilder.addOnMount(onMount)
gridBuilder.build()
