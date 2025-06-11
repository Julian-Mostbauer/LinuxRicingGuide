export interface IVoteInfo {
    upvote_count: number
    downvote_count: number
    your_vote: 'Up' | 'Down' | 'None'
}

export type Comment = IVoteInfo & {
    id: number
    content: string
    timestamp_epoch: number
}

export type CommentWithParsedDate = Comment & {
    date: string
}

export type DistroInfo = IVoteInfo &{
    name: string
}

export type DistroWithComments = DistroInfo & {
    comments: CommentWithParsedDate[]
}
