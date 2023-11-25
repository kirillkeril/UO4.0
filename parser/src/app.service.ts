import {Inject, Injectable} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {firstValueFrom} from "rxjs";
import {ClientProxy} from "@nestjs/microservices";
import * as process from "process";

interface GroupResponse {
    response: {
        object_id: number;
    }
}

interface WallResponse {
    response: {
        items: Post[]
    }
}

interface CommentsResponse {
    response: {
        items: Comment[]
    }
}

interface Post {
    id: number;
}

interface Comment {
    text: string;
    date: number;
}


@Injectable()
export class AppService {
    constructor(private readonly httpService: HttpService, @Inject("parser") private readonly parserService: ClientProxy) {
    }

    async handle(link: string) {
        const group = await this.getGroupIdByLink(link);
        const posts = await this.getWallByGroupId(`${group}`);

        posts.map((p, ind) => {
            setTimeout(async () => {
                const res = await this.getComments(`${group}`, `${p.id}`);
                let comments: Comment[];
                comments = res.response.items;
                comments.map(comment => {
                    if (!comment.text) return;
                    this.httpService.post(process.env.APPEAL_CREATED_SERVICE, {body: comment.text}).subscribe(val => {
                        // console.log(comment.text)
                    });
                });
            }, 500 * ind);
        });

    }

    private async getGroupIdByLink(link: string): Promise<number> {
        const prepLink = link.replace("https://vk.com/", "");
        const formData = new FormData();
        formData.append("access_token", '41ac92e041ac92e041ac92e0e042bafa6a441ac41ac92e024f353fccdbc454ef38a5cdb');
        formData.append("screen_name", prepLink);
        formData.append("v", '5.1999');
        const {data, status} = await firstValueFrom(this.httpService.post<GroupResponse>(
            'https://api.vk.com/method/utils.resolveScreenName',
            formData
        ));
        return data.response.object_id;
    }

    private async getWallByGroupId(groupId: string) {
        const formData = new FormData();
        formData.append("access_token", "41ac92e041ac92e041ac92e0e042bafa6a441ac41ac92e024f353fccdbc454ef38a5cdb");
        formData.append("owner_id", `-${groupId}`);
        formData.append("v", '5.1999');
        const {data} = await firstValueFrom(this.httpService.post<WallResponse>(
            'https://api.vk.com/method/wall.get',
            formData
        ));
        return data.response.items;
    }

    private async getComments(groupId: string, postId: string) {
        const formData = new FormData();
        formData.append("access_token", "41ac92e041ac92e041ac92e0e042bafa6a441ac41ac92e024f353fccdbc454ef38a5cdb");
        formData.append("owner_id", `-${groupId}`);
        formData.append("v", '5.1999');
        formData.append("post_id", postId);
        const {data} = await firstValueFrom(this.httpService.post<CommentsResponse>(
            'https://api.vk.com/method/wall.getComments',
            formData
        ));
        return data;
    }
}
