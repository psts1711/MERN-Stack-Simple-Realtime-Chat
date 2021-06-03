"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatHelper = void 0;
const users = [];
const addUser = ({ id, name, room }) => {
    // oneword = Ravi Kumar => ravikumar
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();
    // check user and room already exist
    const existingUser = users.find((user) => user.room === room && user.name === name);
    if (existingUser) {
        return { error: 'Username is already taken' };
    }
    // create new user and room
    const user = { id, name, room };
    users.push(user);
    return { user };
};
const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
    console.log(index);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
};
const getUser = (id) => users.find((user) => user.id === id);
const getUsersInRoom = (room) => users.filter((user) => user.room === room);
exports.chatHelper = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
};
// module.exports = {
//     addUser,
//     removeUser,
//     getUser, 
//     getUsersInRoom
//   };
