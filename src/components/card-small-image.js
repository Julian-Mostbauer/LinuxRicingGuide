import ComponentBuilder from './component-builder.js'

const cardCode = `
<div class="col-12 mb-4">
    <div class="card w-100 d-flex flex-row align-items-stretch">
        <img
        src="{{image-path}}"
        class="card-img-left"
        alt="..."
        style="object-fit: cover; width: 15rem; height: 15rem; border-right: 2px solid #ddd; padding: 1rem;"
        />
        <div class="card-body text-start">
            <h5 class="card-title">{{title}}</h5>
            <p class="card-text">
                {{description}}
            </p>
            <a href="{{link}}" target="blank" class="btn btn-primary">
                <i class="fa-solid fa-link"></i> Visit
            </a>
        </div>
    </div>
</div>
`

const cardBuilder = new ComponentBuilder(cardCode, 'card-small-image')
cardBuilder.build()
