import { IComment } from './icomment';

export interface IContentPost {
    contentPostId?: any;
    posterReferanceId?: any;
    imageRefreanceId?: any;
    articleOrDescription?: any;
    articleHeader?:any;
    _UserProfileImageUrl?:any;
    _DateTime?: string;
    _posterProfileImageUrl?:any;
    _Username?:string;
    _ContentType?:string;
    _ContentImageURLs?:string[];
    //_ContentImageURL?:string;
    _countContentPosterFollowrs?:any;
    _countContentLikes?:any;
    //not maped
    _conmentLenght?:any;
    //not maped
    _comments?:IComment[];

    _countComments:any;
}
