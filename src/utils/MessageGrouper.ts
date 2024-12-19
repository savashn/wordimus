import { Messages } from "@/types/interfaces";

interface GroupedMessages {
    [date: string]: Messages[];
}

function messageGrouper(messages: Messages[]): GroupedMessages {
    return messages.reduce((groups: GroupedMessages, message: Messages) => {
        const date = new Date(message.sentAt).toLocaleDateString('en-GB');
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(message);
        return groups;
    }, {} as GroupedMessages);
}

export default messageGrouper;