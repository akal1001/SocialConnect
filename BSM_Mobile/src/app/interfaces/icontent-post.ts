import { IComment } from './icomment';

export interface IContentPost {
    contentPostId?: any;
    posterReferanceId?: any;
    imageRefreanceId?: any;
    articleOrDescription?: any;
    articleHeader?:any;
    _DateTime?: string;
    _posterProfileImageUrl?:any;
    _posterName?:string;
    _countContentPosterFollowrs?:number;
    _countContentLikes?:number;
    //not maped
    _conmentLenght?:number;
    //not maped
    _comments?:IComment[];
}
