import { IReplay } from './ireplay';

export interface IComment {
    likeDislikeCommentId?: any;
    referanceId?: any;
    commenterId?: any;
    commenterProfileImgUrl?: any;
    likeDislike?: any;
    comment?: any;
    _DateTime?: any;
    number?: string;
    _replay?:IReplay[];
}
