import type { C } from "vitest/dist/chunks/environment.d8YfPkTm.js"

export type Comment = {
    id: number
    content: string
    timestamp_epoch: number
    upvote_count: number
    downvote_count: number
    your_vote: string
}
export type CommentWithParsedDate = Comment & {
    date: string
}

export type DistroInfo = {
    name: string
    upvote_count: number
    downvote_count: number
    your_vote: string
}

export type DistroWithComments = DistroInfo & {
    comments: CommentWithParsedDate[]
}
