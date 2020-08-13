import { IReplay } from './ireplay';

export interface IComment {
    commentId:any;
    likeDislikeCommentId?: any;
    referanceId?: any;
    commenterId?: any;
    _commenterProfileImageURL?: any;
    likeDislike?: any;
    _Comment?: any;
    _DateTime?: any;
    number?: string;
    _replay?:IReplay[];
}
