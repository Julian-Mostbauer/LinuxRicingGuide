import ComponentBuilder from './component-builder.js'
import getDistroData from '../utils/distro-history-data.js'

const makePresentable = (str) => {
    return str
        .split('-')
        .map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1)
        })
        .join(' ')
}

const code = `
<article>
      <section class="mb-4">
      <h2 class="mb-3">History of <i id="distroNameTitle"></i></h2>

      <div class="customContainer">
        <div class="paragraph">
        <p id="nutshell"></p>
        </div>

        <img
        id="distroLogo"
        alt="logo of {{distro-name}}"
        width="120"
        />
      </div>
      </section>

      <section>
      <div class="customContainer">
        <ul class="list-group list-group-flush" id="featureList">
        </ul>

        <div class="imageFounder">
        <img
          id="founderImage"
        />
        </div>
      </div>
      </section>
</article>
`

const onMount = (params) => {
    const distroData = getDistroData(params['distro-name'])

    document.getElementById('nutshell').innerText = distroData['nutshell']
    document.getElementById('distroLogo').src = distroData['logo']
    document.getElementById('founderImage').src = distroData['founderImage']
    document.getElementById('distroNameTitle').innerText = makePresentable(
        params['distro-name']
    )

    const featureList = document.getElementById('featureList')

    distroData['features'].forEach((feature) => {
        const listItem = document.createElement('li')
        listItem.classList.add('list-group-item')
        listItem.innerHTML = `<b>${feature['year']}</b>: ${feature['description']}`
        featureList.appendChild(listItem)
    })
}

const paragraphBuilder = new ComponentBuilder('paragraph', code)
paragraphBuilder.setOnMount(onMount)
paragraphBuilder.build()
