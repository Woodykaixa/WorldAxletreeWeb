export const createBrief = (content: string) => content.split('---')[2].trim().split('\n')[0];
