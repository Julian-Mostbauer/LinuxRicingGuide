import ComponentBuilder from './component-builder.js'

const code = `
<h4>{{title}}</h4>

<p>
  {{description}}
</p>

<table>
    <tr>
        <th colspan="2">Links</th>
    </tr>
    <tr>
        <td>Github</td>
        <td>
            <a
                target="_blank"
                href="{{link-gh}}"
                >{{link-gh}}</a
            >
        </td>
    </tr>
    <tr>
        <td>Home page</td>
        <td>
            <a
                target="_blank"
                href="{{link-hp}}"
                >{{link-hp}}</a
            >
        </td>
    </tr>
</table>
`

const navbarBuilder = new ComponentBuilder(code, 'section-links')
navbarBuilder.build()
