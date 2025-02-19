import ComponentBuilder from './component-builder.js'
import getDistroData from '../utils/distro-history-data.js'

const code = `
  <div class="container top-lvl">
    <div class="card bg-dark text-light p-4 mb-4">
    <article>
      <section class="mb-4">
      <h2 class="mb-3"><i></i> {{distro-name}} History</h2>

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
    </div>
  </div>
`

const onMount = (params) => {
  const distroData = 
}

const paragraphBuilder = new ComponentBuilder('paragraph', code)
paragraphBuilder.setOnMount(onMount)
paragraphBuilder.build()
