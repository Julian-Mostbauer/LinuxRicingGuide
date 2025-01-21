import ComponentBuilder from './component-builder.js'

const cardCode = `
<div class="col-12 mt-4" style="height: calc(100% - 1.5rem);">
    <div class="card big-img">
        <div style="flex: 1; display: flex; align-items: center;">
            <img
                src="{{image-path}}"
                class="card-img-top"
                alt="..."
                style="object-fit: cover; height: 15rem;"
            />
        </div>
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
