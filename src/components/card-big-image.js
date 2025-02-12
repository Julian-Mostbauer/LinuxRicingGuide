import ComponentBuilder from './component-builder.js'

const cardCode = `
<div class="col-12 mt-4" style="height: calc(100% - 1.5rem);">
    <div class="card big-img">
        <img
            data-src="{{image-path}}"
            class="card-img-top lazy-load"
            alt="..."
            style="object-fit: cover; height: 15rem;"
        />
        <div class="card-body text-start">
            <h5 class="card-title">{{title}}</h5>
            <p class="card-text">
                {{description}}
            </p>
        </div>
        <div class="card-footer" style="text-align: center;">
            <a href="{{link}}" class="btn btn-primary" style="min-width: 100%"
                ><i class="fa-solid fa-link"></i> Visit</a
            >
        </div>
    </div>
</div>
`

const cardBuilder = new ComponentBuilder('card-big-image', cardCode)
cardBuilder.build()
