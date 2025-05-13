import { toBackendCase } from './caseUtils'

class BackendWrapper {
    private auth0Id: string
    private distroName: string

    constructor(auth0Id: string, distroName: string) {
        this.auth0Id = auth0Id
        this.distroName = toBackendCase(distroName)
    }

    public async upvote(setResCallback: (res: any) => void): Promise<boolean> {
        const res = (await $fetch('/api/dbWrapper/distros/upvote', {
            method: 'POST',
            body: {
                name: this.distroName, //toBackendCase(jsonObject.name),
                id: this.auth0Id,
            },
        })) as any

        setResCallback(res)
        return true
        /*
  if (res.data) {
    dynamicData.value = res.data
  }
  */
    }

    public async downvote(
        setResCallback: (res: any) => void
    ): Promise<boolean> {
        const res = (await $fetch(`/api/dbWrapper/distros/downvote`, {
            method: 'POST',
            body: {
                name: this.distroName, //toBackendCase(jsonObject.name),
                id: this.auth0Id,
            },
        })) as any

        setResCallback(res)
        return true
        /*
  if (res.data) {
    dynamicData.value = res.data
  }
  */
    }

    public async postComment(content: string): Promise<boolean> {
        console.log('Posting comment:', content)
        return false
        const res = (await $fetch(`/api/dbWrapper/distros/postComment`, {
            method: 'POST',
            body: {
                name: this.distroName, //toBackendCase(jsonObject.name),
                id: this.auth0Id,
                comment: content,
            },
        })) as any
        return true
        /*
    if (res.data) {
      dynamicData.value = res.data
    }
  */
    }
}

class DisabledBackendWrapper extends BackendWrapper {
    constructor() {
        super('disabled', 'disabled')
    }
    public override async upvote(): Promise<boolean> {
        console.log('upvote disabled')
        return false
    }
    public override async downvote(): Promise<boolean> {
        console.log('downvote disabled')
        return false
    }
    public override async postComment(): Promise<boolean> {
        console.log('postComment disabled')
        return false
    }
}

class BackendWrapperFactory {
    public static create(
        auth0Id: string,
        distroName: string
    ): BackendWrapper | DisabledBackendWrapper {
        if (auth0Id === null || auth0Id === undefined) {
            console.error('auth0Id is null or undefined')
            return new DisabledBackendWrapper()
        }
        if (distroName === null || distroName === undefined) {
            console.error('distroName is null or undefined')
            return new DisabledBackendWrapper()
        }
        return new BackendWrapper(auth0Id, distroName)
    }
}

export { BackendWrapper, DisabledBackendWrapper, BackendWrapperFactory }
