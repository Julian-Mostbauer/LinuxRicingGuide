import ComponentBuilder from './component-builder.js'
import LocalStorage from '../utils/local-storage-util.js'
import { GlobalBackendInstance } from '../utils/backend-client.js'

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
        <div id="||component-unique-id||-votes-section" class="votes-section">
            <button class="btn btn-success" id="||component-unique-id||-upvote">
                <i class="fa-solid fa-thumbs-up"></i> 
                <span id="||component-unique-id||-upvote-count">x</span>
            </button>
            <button class="btn btn-danger" id="||component-unique-id||-downvote">
                <i class="fa-solid fa-thumbs-down"></i> 
                <span id="||component-unique-id||-downvote-count">x</span>
            </button>
        </div>
    </div>
</div>
`

const onMount = async (props) => {
    await GlobalBackendInstance.initialized

    if (!GlobalBackendInstance.isActive) {
        document.getElementById(props['component-unique-id'] + '-votes-section').style.display = 'none'
        return
    }

    // prepare the upvote and downvote buttons
    const upvoteButton = document.getElementById(
        props['component-unique-id'] + '-upvote'
    )
    const downvoteButton = document.getElementById(
        props['component-unique-id'] + '-downvote'
    )

    const cleanedHistoryLink = props['history-link']
        .replace('-history.html', '')
        .replace('distros-history/', '')

    const data = await GlobalBackendInstance.getDistroData(cleanedHistoryLink)

    const upvoteCount = document.getElementById(
        props['component-unique-id'] + '-upvote-count'
    )
    const downvoteCount = document.getElementById(
        props['component-unique-id'] + '-downvote-count'
    )

    // Dynamically set content and styles of the elements
    upvoteCount.innerText = data['up-votes']
    downvoteCount.innerText = data['down-votes']

    if (LocalStorage.DistroUpvotes.has(cleanedHistoryLink)) {
        upvoteButton.style.color = 'green'
        upvoteButton.style.textShadow = '1px 1px 4px black'
    }

    if (LocalStorage.DistroDownvotes.has(cleanedHistoryLink)) {
        downvoteButton.style.color = 'red'
        downvoteButton.style.textShadow = '1px 1px 4px black'
    }

    // Event listeners for the upvote and downvote buttons
    upvoteButton.addEventListener('click', async () => {
        if (LocalStorage.DistroUpvotes.has(cleanedHistoryLink)) {
            // If the user has already upvoted the distribution, remove the upvote
            LocalStorage.DistroUpvotes.remove(cleanedHistoryLink)
            GlobalBackendInstance.upvote(cleanedHistoryLink, true)
        } else {
            // add the upvote and remove the downvote if it exists
            LocalStorage.DistroUpvotes.add(cleanedHistoryLink)
            GlobalBackendInstance.upvote(cleanedHistoryLink)

            // remove the downvote if it exists
            if (LocalStorage.DistroDownvotes.has(cleanedHistoryLink)) {
                LocalStorage.DistroDownvotes.remove(cleanedHistoryLink)
                GlobalBackendInstance.downvote(cleanedHistoryLink, true)
            }
        }
    })

    downvoteButton.addEventListener('click', async () => {
        if (LocalStorage.DistroDownvotes.has(cleanedHistoryLink)) {
            // If the user has already downvoted the distribution, remove the downvote
            LocalStorage.DistroDownvotes.remove(cleanedHistoryLink)
            GlobalBackendInstance.downvote(cleanedHistoryLink, true)
        } else {
            LocalStorage.DistroDownvotes.add(cleanedHistoryLink)
            GlobalBackendInstance.downvote(cleanedHistoryLink)

            // remove the upvote if it exists
            if (LocalStorage.DistroUpvotes.has(cleanedHistoryLink)) {
                LocalStorage.DistroUpvotes.remove(cleanedHistoryLink)
                GlobalBackendInstance.upvote(cleanedHistoryLink, true)
            }
        }
    })
}

const cardBuilder = new ComponentBuilder('card-small-image-distro', cardCode)
cardBuilder.setOnMount(onMount)
cardBuilder.build()
