import ComponentBuilder from './component-builder.js'

const code = `
<div class="container">
  <div class="row">
  </div>
</div>
`

const onMount = (props) => {
  console.log("Image List:")
  console.log(props["image-list"])

  const imageList = JSON.parse(props['image-list'])
  const [colCount, rowCount] = props['dimensions'].split('x')



  console.log("ONMOUNT LOG:")
  console.log("-----------------------------------------------")
  console.log(imageList)
  console.log(colCount)
  console.log(rowCount)
  console.log("-----------------------------------------------")
}

const gridBuilder = new ComponentBuilder('image-grid', code)
gridBuilder.addAdditionalProps(['dimensions', 'image-list'])
gridBuilder.addOnMount(onMount)
gridBuilder.build()
