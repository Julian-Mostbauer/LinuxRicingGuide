import Component from './component.js'

const cardCode = `
<div class="col-12 mb-4">
                    <div class="card w-100">
                        <img
                            src="../assets/img/card-main-page.png"
                            class="card-img-top"
                            alt="..."
                            style="object-fit: cover; height: 15rem"
                        />
                        <div id="Main-Page" class="card-body text-start">
                            <h5 class="card-title">{{title}}</h5>
                            <p class="card-text">
                                Visit the main page about linux ricing and about
                                the main technologies.
                            </p>
                            <a href="main.html" class="btn btn-primary"
                                ><i class="fa-solid fa-link"></i> Visit</a
                            >
                        </div>
                    </div>
                </div>
`

const comp = new Component(cardCode, 'card-component')
comp.placeComponent()
