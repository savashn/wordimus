export interface Post {
    id?: number;
    slug: string;
    header: string;
    content: string;
    readingTime: number;
    createdAt: Date;
    updatedAt?: Date;
    author: string;
    isHidden?: boolean;
    isPrivate?: boolean;
    userId?: number;
    username?: string;
    authorImg?: string;
}

export interface PostsByCategory {
    slug: string;
    header: string;
    readingTime: number;
    createdAt: Date;
}

export interface Category {
    id?: number;
    category: string;
    slug: string;
    postsCount?: number;
    isHidden: boolean;
    isPrivate?: boolean;
    userId?: number;
}

export interface Profile {
    name: string;
    username: string;
    about: string | null;
    email?: string;
    joined?: Date;
    header: string;
    content: string;
    readingTime: number;
    createdAt: Date;
    updatedAt?: Date;
    author: string;
    isHidden?: boolean;
}

export interface User {
    name: string;
    username: string;
    about: string | null;
    email?: string;
    joinedAt: Date;
    image?: string;
}

export interface Messages {
    id: number;
    sender: string;
    senderSlug: string;
    senderImg: string;
    senderId: number;
    receiver: string;
    receiverSlug: string;
    receiverImg: string;
    receiverId: number;
    message: string;
    sentAt: Date;
    isSeen: boolean
}

export interface CategoriesProps {
    userSlug: string;
    data: Category[];
}