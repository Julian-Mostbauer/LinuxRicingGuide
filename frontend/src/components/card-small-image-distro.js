import ComponentBuilder from './component-builder.js'
import LocalStorage from "../utils/local-storage-util.js";

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
            <div style="display: flex; justify-content: space-around">
                <a href="{{link}}" target="blank" class="btn btn-primary mt-3" style="width: 100%; margin: 5px">
                    <i class="fa-solid fa-link"></i> Homepage
                </a>
                
                <a href="{{history-link}}" class="btn btn-primary mt-3" style="width: 100%; margin: 5px">
                    <i class="fa-solid fa-link"></i> History
                </a>
            </div>
        </div>
        <div class="votes-section" style="display: flex; align-items: center; margin: 1rem; gap: 1rem;">
            <button class="btn btn-success" id="||component-unique-id||-upvote">
                <i class="fa-solid fa-thumbs-up"></i> <span id="||component-unique-id||-upvote-count">x</span>
            </button>
            <button class="btn btn-danger" id="||component-unique-id||-downvote">
                <i class="fa-solid fa-thumbs-down"></i> <span id="||component-unique-id||-downvote-count">x</span>
            </button>
        </div>
    </div>
</div>
`


const onMount = async (props) => {
    const { upvote, downvote, getDistroData } = await import(
        '../utils/backend-client.js'
    )

    if (upvote === undefined || downvote === undefined) {
        throw new Error('Backend client not found')
    }

    const upvoteButton = document.getElementById(
        props['component-unique-id'] + '-upvote'
    )
    const downvoteButton = document.getElementById(
        props['component-unique-id'] + '-downvote'
    )

    // distros-history/mint-history.html
    const cleanedHistoryLink = props['history-link']
        .replace('-history.html', '')
        .replace('distros-history/', '')

    const data = await getDistroData(cleanedHistoryLink)

    const upvoteCount = document.getElementById(
        props['component-unique-id'] + '-upvote-count'
    )
    const downvoteCount = document.getElementById(
        props['component-unique-id'] + '-downvote-count'
    )

    upvoteCount.innerText = data['up-votes']
    downvoteCount.innerText = data['down-votes']

    upvoteButton.addEventListener('click', async () => {
        if (!LocalStorage.DistroUpvotes.has(cleanedHistoryLink)) {
            upvoteCount.innerText = await upvote(cleanedHistoryLink)
            LocalStorage.DistroUpvotes.add(cleanedHistoryLink)
        }
    })

    downvoteButton.addEventListener('click', async () => {
        if (!LocalStorage.DistroDownvotes.has(cleanedHistoryLink)) {
            downvoteCount.innerText = await downvote(cleanedHistoryLink)
            LocalStorage.DistroDownvotes.add(cleanedHistoryLink)
        }
    })
}

const cardBuilder = new ComponentBuilder('card-small-image-distro', cardCode)
cardBuilder.setOnMount(onMount)
cardBuilder.build()
