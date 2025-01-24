import ComponentBuilder from './component-builder.js'

const cardCode = `
<div class="col-12 mt-4">
    <div class="card small-img w-100 d-flex flex-column flex-md-row align-items-center justify-content-center">
        <img
        src="{{image-path}}"
        class="card-img-top no-round"
        alt="..."
        style="object-fit: cover; width: 11rem; height: 11rem; padding: 2rem;"
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

const cardBuilder = new ComponentBuilder('card-small-image', cardCode)
cardBuilder.build()
