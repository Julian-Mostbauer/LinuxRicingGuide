import ComponentBuilder from './component-builder.js'

const cardCode = `
<div class="col-12 mt-4">
    <div class="card small-img w-100 d-flex flex-row align-items-stretch">
        <img
        src="{{image-path}}"
        class="card-img-left"
        alt="..."
        style="object-fit: cover; width: 15rem; height: 15rem; border-right: 1px solid #424549; padding: 1rem;"
        />
        <div class="card-body text-start d-flex flex-column justify-content-between">
            <div>
                <h5 class="card-title">{{title}}</h5>
                <p class="card-text">
                    {{description}}
                </p>
            </div>
            <a href="{{link}}" target="blank" class="btn btn-primary mt-3" style="">
                <i class="fa-solid fa-link"></i> Visit
            </a>
        </div>
    </div>
</div>
`

const cardBuilder = new ComponentBuilder(cardCode, 'card-small-image')
cardBuilder.build()
