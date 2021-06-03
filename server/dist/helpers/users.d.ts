export declare const chatHelper: {
    addUser: ({ id, name, room }: {
        id: any;
        name: any;
        room: any;
    }) => {
        error: string;
        user?: undefined;
    } | {
        user: {
            id: any;
            name: any;
            room: any;
        };
        error?: undefined;
    };
    removeUser: (id: any) => any;
    getUser: (id: any) => any;
    getUsersInRoom: (room: any) => any[];
};
