import ComponentBuilder from './component-builder.js'

const code = `
<h4 class="mb-3">{{title}}</h4>
<p class="mb-3">
    {{description}}
</p>
<table class="table table-striped">
        <thead>
                <tr>
                        <th colspan="2">Links</th>
                </tr>
        </thead>
        <tbody>
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
        </tbody>
</table>
`

const navbarBuilder = new ComponentBuilder('section-links', code)
navbarBuilder.build()
