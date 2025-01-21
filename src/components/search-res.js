import ComponentBuilder from './component-builder.js'

const code = `
  <div>
    <p>Search results</p>
    <ul>
      <li id="||component-unique-id||-file"></li>
      <li id="||component-unique-id||-line"></li>
      <li id="||component-unique-id||-content"></li>
    <ul>
  </div>
`

const onMount = () => {
    // eslint-disable-next-line no-unused-vars
    const searchDocuments = (s) => {
        return [
            {
                file: 'file1.txt',
                line: 1,
                content: 'content1',
            },
        ]
    }

    searchDocuments('terminal').then((results) => {
        const file = document.getElementById('||component-unique-id||-file')
        const line = document.getElementById('||component-unique-id||-line')
        const content = document.getElementById(
            '||component-unique-id||-content'
        )

        file.textContent = 'File: ' + results[0].file
        line.textContent = 'Line: ' + results[0].line
        content.textContent = 'Content: ' + results[0].content
    })
}

const searchResBuilder = new ComponentBuilder('search-res', code, onMount)
searchResBuilder.build()
