export class itemDTO {
    user_id: string;
    itemtype: string;
    value?: string;
    position: number;
    basic: boolean;
    custom: string;
    section: {
        name: string;
        key: number;
    };
}
