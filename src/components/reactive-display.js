import ComponentBuilder from './component-builder.js'

const code = `
<div>{{counter}}<div>
`

const reactiveDisplayBuilder = new ComponentBuilder(code, 'reactive-display')
reactiveDisplayBuilder.build()