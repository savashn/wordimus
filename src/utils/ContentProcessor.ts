import { Messages, Post } from "@/types/interfaces";

export default class ContentProcessor {
    static getAbstract(content: string): string {
        const words = content.split(/\s+/);
        let abstract: string;

        if (words.length > 30) {
            abstract = words.slice(0, 30).join(' ') + '...';
        } else {
            abstract = words.slice(0, 30).join(' ');
        }

        return abstract;
    }

    static processPosts(posts: Post[]): Post[] {
        return posts.map(item => ({
            ...item,
            content: ContentProcessor.getAbstract(item.content),
        }));
    }

    static processMessages(messages: Messages[]): Messages[] {
        return messages.map(item => ({
            ...item,
            message: ContentProcessor.getAbstract(item.message)
        }));
    }
}