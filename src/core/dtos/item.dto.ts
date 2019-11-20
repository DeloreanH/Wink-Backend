export class itemDTO {
    readonly user_id: string;
    readonly itemtype: string;
    readonly value?: string;
    readonly position: number;
    readonly basic: boolean;
    readonly custom: string;
    readonly section: {
        name: string;
        key: number;
    };
}
