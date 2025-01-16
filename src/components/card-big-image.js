import ComponentBuilder from './component-builder.js'

const cardStyle = `
box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 1);
max-width: 100%;
`

const cardCode = `
<div class="col-12 mt-4">
    <div class="card w-100" style="${cardStyle}">
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
            <a href="{{link}}" class="btn btn-primary"
                ><i class="fa-solid fa-link"></i> Visit</a
            >
        </div>
    </div>
</div>
`

const cardBuilder = new ComponentBuilder(cardCode, 'card-big-image')
cardBuilder.build()
