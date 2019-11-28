import moment = require('moment');

export const usersSeed = [
    {
        firstName: 'John',
        lastName: 'Doe',
        phone: {
            phoneCode: 424,
            phoneNumber: 5529897,
        },
        gender: 'masculino',
        emptyProfile: false,
        visibility: 'all',
        avatarUrl: 'https://image.flaticon.com/icons/png/512/206/206853.png',
        email: 'john@doe.com',
        birthday: new Date('1993-07-26'),
        username: 'johndoe123',
        lastActivity: moment(),
        location: {
            type: 'Point',
            coordinates: [-63.2033518 , 9.8000694],
        },
    },
    {
        firstName: 'Maria',
        lastName: 'Lopez',
        phone: {
            phoneCode: 412,
            phoneNumber: 2224546,
        },
        gender: 'femenino',
        emptyProfile: false,
        visibility: 'all',
        avatarUrl: 'https://icstravelgroup.com/wp-content/uploads/2017/07/icstravelgroup_clients_icons00002.png',
        email: 'maria@lopez.com',
        birthday: new Date('1990-12-03'),
        lastActivity: moment().subtract({ days: 10 }).toDate(),
        username: 'marialopez5656',
        location: {
            type: 'Point',
            coordinates:  [-63.208184 , 9.8024069],
        },
    },
    {
        firstName: 'Eric',
        lastName: 'Cartman',
        phone: {
            phoneCode: 412,
            phoneNumber: 6626667,
        },
        gender: 'masculino',
        emptyProfile: false,
        visibility: 'all',
        avatarUrl: 'https://i.pinimg.com/originals/8f/22/d3/8f22d32f54c8d0dd4087b1007af00353.jpg',
        email: 'eric@cartman.com',
        birthday: new Date('1998-03-16'),
        username: 'eric1414',
        lastActivity: moment().subtract({ days: 1 }).toDate(),
        location: {
            type: 'Point',
            coordinates: [-63.1991684 , 9.7842392],
        },
    },
];
