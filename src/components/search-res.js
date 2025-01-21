import ComponentBuilder from './component-builder.js'

const code = `
  <div>
    <p>Search results for {{query}}</p>
    <ul>
      <li id="||component-unique-id||-file"></li>
      <li id="||component-unique-id||-line"></li>
      <li id="||component-unique-id||-content"></li>
    <ul>
  </div>
`

const onMount = async (props) => {
    const { default: searchDocuments } = await import('./../search.js')
    console.log('---Start Mount---')
    const results = await searchDocuments(props.query)

    const result = results[0]
    const file = document.getElementById(props['component-unique-id'] + '-file')
    const line = document.getElementById(props['component-unique-id'] + '-line')
    const content = document.getElementById(
        props['component-unique-id'] + '-content'
    )

    file.textContent = 'File: ' + result.file
    line.textContent = 'Line: ' + result.line
    content.textContent = 'Content: ' + result.content

    console.log('---Stop Mount---')
}

const searchResBuilder = new ComponentBuilder('search-res', code, onMount)
searchResBuilder.build()
