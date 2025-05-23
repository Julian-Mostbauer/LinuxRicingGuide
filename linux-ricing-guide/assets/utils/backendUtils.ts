import { toBackendCase } from './caseUtils'
import { isValidID } from './idUtils'

type SetResCallback = (res: any) => void

interface IDistroVoter {
    upvote(setResCallback: SetResCallback): Promise<boolean>
    downvote(setResCallback: SetResCallback): Promise<boolean>
}

interface ICommentVoter {
    upvoteComment(
        commentId: number,
        setResCallback: SetResCallback
    ): Promise<boolean>
    downvoteComment(
        commentId: number,
        setResCallback: SetResCallback
    ): Promise<boolean>
}
interface ICommentGetter {
    getComments(setResCallback: SetResCallback): Promise<boolean>
    getComment(
        commentId: number,
        setResCallback: SetResCallback
    ): Promise<boolean>
}
interface ICommentDeleter {
    deleteComment(
        commentId: number,
        setResCallback: SetResCallback
    ): Promise<boolean>
}

interface ICommentPoster {
    postComment(
        content: string,
        serResCallback: SetResCallback
    ): Promise<boolean>
}

interface ICommentHandler
    extends ICommentVoter,
        ICommentDeleter,
        ICommentPoster,
        ICommentGetter {}

interface IBackendWrapper extends ICommentVoter, IDistroVoter, ICommentHandler {
    distroInfo(setResCallback: SetResCallback): Promise<boolean>
}

class BackendWrapper implements IBackendWrapper {
    private auth0Id: string
    private distroName: string

    constructor(auth0Id: string, distroName: string) {
        this.auth0Id = auth0Id
        this.distroName = toBackendCase(distroName)
    }
    public async getComment(
        commentId: number,
        setResCallback: SetResCallback
    ): Promise<boolean> {
        const res = (await $fetch('/api/dbWrapper/comments/getComment', {
            method: 'POST',
            body: {
                id: this.auth0Id,
                commentId,
            },
        })) as any
        
        setResCallback(res)
        return true
    }

    public async deleteComment(
        commentId: number,
        setResCallback: SetResCallback
    ): Promise<boolean> {
        const res = (await $fetch('/api/dbWrapper/comments/delete', {
            method: 'DELETE',
            body: {
                id: this.auth0Id,
                commentId,
            },
        })) as any

        setResCallback(res)
        return true
    }

    public async upvoteComment(
        commentId: number,
        setResCallback: SetResCallback
    ): Promise<boolean> {
        const res = (await $fetch('/api/dbWrapper/comments/upvote', {
            method: 'POST',
            body: {
                id: this.auth0Id,
                commentId,
            },
        })) as any

        setResCallback(res)
        return true
    }
    public async downvoteComment(
        commentId: number,
        setResCallback: SetResCallback
    ): Promise<boolean> {
        const res = (await $fetch('/api/dbWrapper/comments/downvote', {
            method: 'POST',
            body: {
                id: this.auth0Id,
                commentId,
            },
        })) as any

        setResCallback(res)
        return true
    }

    public async getComments(setResCallback: SetResCallback): Promise<boolean> {
        const res = (await $fetch('/api/dbWrapper/distros/getComments', {
            method: 'POST',
            body: {
                name: this.distroName, //toBackendCase(jsonObject.name),
                id: this.auth0Id,
            },
        })) as any

        setResCallback(res)
        return true
    }

    public async upvote(setResCallback: SetResCallback): Promise<boolean> {
        const res = (await $fetch('/api/dbWrapper/distros/upvote', {
            method: 'POST',
            body: {
                name: this.distroName, //toBackendCase(jsonObject.name),
                id: this.auth0Id,
            },
        })) as any

        setResCallback(res)
        return true
    }

    public async downvote(setResCallback: SetResCallback): Promise<boolean> {
        const res = (await $fetch('/api/dbWrapper/distros/downvote', {
            method: 'POST',
            body: {
                name: this.distroName, //toBackendCase(jsonObject.name),
                id: this.auth0Id,
            },
        })) as any

        setResCallback(res)
        return true
    }

    public async postComment(
        content: string,
        setResCallback: SetResCallback
    ): Promise<boolean> {
        const res = (await $fetch('/api/dbWrapper/comments/post', {
            method: 'POST',
            body: {
                name: this.distroName, //toBackendCase(jsonObject.name),
                id: this.auth0Id,
                content,
            },
        })) as any
        setResCallback(res)
        return true
    }

    public async distroInfo(setResCallback: SetResCallback): Promise<boolean> {
        const res = (await $fetch('/api/dbWrapper/distros/distroInfo', {
            method: 'POST',
            body: {
                name: this.distroName,
                id: this.auth0Id,
            },
        })) as any

        setResCallback(res)
        return true
    }
}

class DisabledBackendWrapper implements IBackendWrapper {
    constructor() {}

    public async getComment(): Promise<boolean> {
        console.log('getComment disabled')
        return false
    }

    public async deleteComment(): Promise<boolean> {
        console.log('deleteComment disabled')
        return false
    }
    public async upvoteComment(): Promise<boolean> {
        console.log('upvoteComment disabled')
        return false
    }
    public async downvoteComment(): Promise<boolean> {
        console.log('downvoteComment disabled')
        return false
    }

    public async getComments(): Promise<boolean> {
        console.log('getComments disabled')
        return false
    }

    public async upvote(): Promise<boolean> {
        console.log('upvote disabled')
        return false
    }

    public async downvote(): Promise<boolean> {
        console.log('downvote disabled')
        return false
    }

    public async postComment(): Promise<boolean> {
        console.log('postComment disabled')
        return false
    }

    public async distroInfo(): Promise<boolean> {
        console.log('distroInfo disabled')
        return false
    }
}

class BackendWrapperFactory {
    public static create(auth0Id: string, distroName: string): IBackendWrapper {
        if (!isValidID(auth0Id)) {
            console.error('auth0Id is null or undefined')
            return new DisabledBackendWrapper()
        }

        if (distroName === null || distroName === undefined) {
            console.error('distroName is null or undefined')
            return new DisabledBackendWrapper()
        }

        return new BackendWrapper(auth0Id, distroName)
    }

    public static createDisabled(): IBackendWrapper {
        return new DisabledBackendWrapper()
    }
}

export {
    type IBackendWrapper,
    type ICommentVoter,
    type ICommentDeleter,
    type ICommentPoster,
    type ICommentGetter,
    type ICommentHandler,
    BackendWrapperFactory,
}
