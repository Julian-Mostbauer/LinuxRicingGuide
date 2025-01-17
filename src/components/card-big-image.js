import ComponentBuilder from './component-builder.js'

const cardCode = `
<div class="col-12 mt-4">
    <div class="card big-img">
        <img
            src="{{image-path}}"
            class="card-img-top"
            alt="..."
            style="object-fit: cover; height: 15rem"
        />
        <div class="card-body text-start">
            <h5 class="card-title">{{title}}</h5>
            <p class="card-text">
                {{description}}
            </p>
            <a href="{{link}}" class="btn btn-primary" style="min-width: 100%"
                ><i class="fa-solid fa-link"></i> Visit</a
            >
        </div>
    </div>
</div>
`

const cardBuilder = new ComponentBuilder(cardCode, 'card-big-image')
cardBuilder.build()
