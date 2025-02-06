import ComponentBuilder from './component-builder.js'

const cardCode = `
<div>
    <h5 class="card-title">Configure</h5>
    <form id="configurator">
        
    </form>
    <div id="download-links">
    </div>
</div>
`

const ConfiguratorData = {
    dropdowns: {
        'Distros': {
            'Arch': 'https://www.archlinux.de/download/',
            'Ubuntu': 'https://ubuntu.com/download/desktop',
        }
    }
}

const onSubmit = (event) => {
    event.preventDefault()

    const form = document.getElementById('configurator')
    const dropdowns = form.getElementsByTagName('select')

    const downloadLinks = document.getElementById('download-links')
    downloadLinks.innerHTML = '<h5 class="card-title mt-3">Download Links</h5>'

    for (const dropdown of dropdowns) {
        const downloadLink = ConfiguratorData.dropdowns[dropdown.previousElementSibling.innerText][dropdown.value]

        appendDownloadLink(downloadLink, `${dropdown.previousElementSibling.innerText} - ${dropdown.value}`)
    }
}

const appendDownloadLink = (link, text) => {
    const downloadLinks = document.getElementById('download-links')
    const a = document.createElement('a')
    a.className = 'btn btn-primary'
    a.target = '_blank'
    a.href = link
    a.innerHTML = `<i class="fa-solid fa-link" style="margin-right: 3px"></i>${text}`

    downloadLinks.appendChild(a)
}

const onMount = () => {
    const form = document.getElementById('configurator')
    for (const key in ConfiguratorData.dropdowns) {
        const div = document.createElement('div')
        div.className = 'form-group'

        const label = document.createElement('label')
        label.for = `${key}-select`
        label.innerText = key

        div.appendChild(label)

        const select = document.createElement('select')
        select.className = 'form-control'
        select.id = `${key}-select`


        for(const key2 in ConfiguratorData.dropdowns[key]) {
            const opt = document.createElement('option')
            opt.innerText = key2
            select.appendChild(opt)
        }

        div.appendChild(select)
        form.appendChild(div)
    }

    const button = document.createElement('button')
    button.className = 'btn btn-primary mt-3'
    button.type = 'submit'
    button.innerText = 'Submit'
    button.onclick = (event) => onSubmit(event)
    form.appendChild(button)
}

const cardBuilder = new ComponentBuilder('configurator-component', cardCode)
cardBuilder.addOnMount(onMount)
cardBuilder.build()

