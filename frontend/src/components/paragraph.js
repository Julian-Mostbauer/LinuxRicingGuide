import ComponentBuilder from './component-builder.js'
import {
    getDistroData,
    distroDataExists,
} from '../utils/distro-history-data.js'

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

      <section id="||component-unique-id||-feature-section">
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
    if (distroDataExists(params['distro-name']) === false) {
        document.getElementById('distroNameTitle').innerText = 'Unknown Distro'
        document.getElementById('distroLogo').style.display = 'none'
        document.getElementById(
            params['component-unique-id'] + '-feature-section'
        ).style.display = 'none'

        const notFoundNode = document.createElement('h1')
        notFoundNode.innerText = '404 - Data Not Found'
        notFoundNode.style.animation = 'blink 2s infinite'
        const style = document.createElement('style')
        style.innerHTML = `
        @keyframes blink {
          0% { opacity: 1; }
          50% { opacity: 0.25; }
          100% { opacity: 1; }
        }
        `
        document.head.appendChild(style)

        document.getElementById('nutshell').replaceWith(notFoundNode)
        return
    }

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
