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

      <div class="card bg-dark text-light p-4 flex-row">
        <div class="paragraph">
        <p id="nutshell"></p>
        </div>

        <img
        id="distroLogo"
        alt="logo of {{distro-name}}"
        width="120"
        height="120"
        align="right"
        />
      </div>
      </section>

      <section>
      <div class="card bg-dark text-light p-4 mt-4 flex-row">
        <ul class="list-group list-group-flush" id="featureList">
        </ul>

        <div class="imageFounder">
        <img
          id="founderImage"
          width="512"
          align="right"
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
        listItem.innerHTML = `<b>${feature['year']} - ${feature['title']}</b>: <p>${feature['description']}</p>`
        featureList.appendChild(listItem)
    })
}

const paragraphBuilder = new ComponentBuilder('paragraph', code)
paragraphBuilder.setOnMount(onMount)
paragraphBuilder.build()
