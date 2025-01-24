import ComponentBuilder from './component-builder.js'

const cardCode = `
<div class="col-12 mt-4" style="height: calc(100% - 1.5rem);">
    <div class="card big-img">
    <img
    src="{{image-path}}"
    class="card-img-top"
    alt="..."
    loading="lazy"
    style="object-fit: cover; height: 15rem;"
    srcset="{{image-path}}?w=400 400w,
            {{image-path}}?w=800 800w,
            {{image-path}}?w=1200 1200w"
    sizes="(max-width: 600px) 400px, (max-width: 1024px) 800px, 1200px"
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
