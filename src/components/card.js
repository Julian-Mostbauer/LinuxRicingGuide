import ComponentBuilder from './component-builder.js'

const cardCode = `
<div class="col-12 mb-4 mt-4">
                    <div class="card w-100">
                        <img
                            src="{{image-path}}"
                            class="card-img-top"
                            alt="..."
                            style="object-fit: cover; height: 15rem"
                        />
                        <div id="Main-Page" class="card-body text-start">
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

const cardBuilder = new ComponentBuilder(cardCode, 'card')
cardBuilder.build()