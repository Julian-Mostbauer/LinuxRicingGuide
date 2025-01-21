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

const onMount = (props) => {
    console.log('---Start Mount---')
    // eslint-disable-next-line no-unused-vars
    const searchDocuments = async (s) => {
        return new Promise(() => {
            return [
                {
                    file: 'file1.txt',
                    line: 1,
                    content: 'content1',
                },
            ]
        })
    }

    searchDocuments(props.query).then((results) => {
        const file = document.getElementById(props['unique-id'] + '-file')
        const line = document.getElementById(props['unique-id'] + '-line')
        const content = document.getElementById(props['unique-id'] + '-content')

        console.table(results)

        file.textContent = 'File: ' + results[0].file
        line.textContent = 'Line: ' + results[0].line
        content.textContent = 'Content: ' + results[0].content
    })

    console.log('---Stop Mount---')
}

const searchResBuilder = new ComponentBuilder('search-res', code, onMount)
searchResBuilder.build()
