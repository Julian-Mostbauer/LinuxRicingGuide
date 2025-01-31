import ComponentBuilder from './component-builder.js'

const cardCode = `
<div>
    <h5 class="card-title">Configure</h5>
    <form id="configurator">
        
    </form>
</div>
`

const ConfiguratorData = {
    dropdowns: {
        'Distros': {
            'Arch': 'https://www.archlinux.de/download/iso/2025.01.01/archlinux-2025.01.01-x86_64.iso'
        }
    }
}

const onMount = (props) => {
    let form = document.getElementById('configurator')
    for (const key in ConfiguratorData.dropdowns) {
        let div = document.createElement('div')
        div.className = 'form-group'

        let label = document.createElement('label')
        label.for = `${key}-select`
        label.innerText = key

        div.appendChild(label)

        let select = document.createElement('select')
        select.className = 'form-control'
        select.id = `${key}-select`


        for(const key2 in ConfiguratorData.dropdowns[key]) {
            let opt = document.createElement('option')
            opt.innerText = key2
            select.appendChild(opt)
        }

        div.appendChild(select)
        form.appendChild(div)
    }

    let button = document.createElement('button')
    button.className = 'btn btn-primary mt-3'
    button.type = 'submit'
    button.innerText = 'Submit'
    form.appendChild(button)
}

const cardBuilder = new ComponentBuilder('configurator-component', cardCode)
cardBuilder.addOnMount(onMount)
cardBuilder.build()

