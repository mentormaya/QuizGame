import { PrismaClient } from "@prisma/client";
import { type Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
    {
        username: "ajay",
        password: "loveMe",
        full_name: "Ajay Singh",
    },
];

const groupsData: Prisma.GroupCreateInput[] = [
    {
        name: "मकालु",
        score: 0,
        turn: true,
        members: {
            create: [
                {
                    full_name: "Priyanka Thakur",
                    isLeader: true
                },
                {
                    full_name: "Ajay Singh",
                    isLeader: false
                },
                {
                    full_name: "Prabin Kumar Mahato",
                    isLeader: false
                },
            ]
        }
    },
    {
        name: "सगरमाथा",
        score: 0,
        turn: false,
        members: {
            create: [
                {
                    full_name: "Priyanka Thakur",
                    isLeader: true
                },
                {
                    full_name: "Ajay Singh",
                    isLeader: false
                },
                {
                    full_name: "Prabin Kumar Mahato",
                    isLeader: false
                },
            ]
        }
    },
    {
        name: "धाैलागिरी",
        score: 0,
        turn: false,
        members: {
            create: [
                {
                    full_name: "Priyanka Thakur",
                    isLeader: true
                },
                {
                    full_name: "Ajay Singh",
                    isLeader: false
                },
                {
                    full_name: "Prabin Kumar Mahato",
                    isLeader: false
                },
            ]
        }
    },
    {
        name: "अन्नपूर्ण",
        score: 0,
        turn: false,
        members: {
            create: [
                {
                    full_name: "Priyanka Thakur",
                    isLeader: true
                },
                {
                    full_name: "Ajay Singh",
                    isLeader: false
                },
                {
                    full_name: "Prabin Kumar Mahato",
                    isLeader: false
                },
            ]
        }
    },
    {
        name: "गणेश",
        score: 0,
        turn: false,
        members: {
            create: [
                {
                    full_name: "Priyanka Thakur",
                    isLeader: true
                },
                {
                    full_name: "Ajay Singh",
                    isLeader: false
                },
                {
                    full_name: "Prabin Kumar Mahato",
                    isLeader: false
                },
            ]
        }
    },
    {
        name: "कन्चनजङ्घा",
        score: 0,
        turn: false,
        members: {
            create: [
                {
                    full_name: "Priyanka Thakur",
                    isLeader: true
                },
                {
                    full_name: "Ajay Singh",
                    isLeader: false
                },
                {
                    full_name: "Prabin Kumar Mahato",
                    isLeader: false
                },
            ]
        }
    },
    {
        name: "बरूण",
        score: 0,
        turn: false,
        members: {
            create: [
                {
                    full_name: "Priyanka Thakur",
                    isLeader: true
                },
                {
                    full_name: "Ajay Singh",
                    isLeader: false
                },
                {
                    full_name: "Prabin Kumar Mahato",
                    isLeader: false
                },
            ]
        }
    },
    {
        name: "नीलगिरी",
        score: 0,
        turn: false,
        members: {
            create: [
                {
                    full_name: "Priyanka Thakur",
                    isLeader: true
                },
                {
                    full_name: "Ajay Singh",
                    isLeader: false
                },
                {
                    full_name: "Prabin Kumar Mahato",
                    isLeader: false
                },
            ]
        }
    }
];

async function seedUsers() {
    for (const u of userData) {
        const user = await prisma.user.create({
            data: u,
        });
        console.log(`Created user: ${user.full_name}`);
    }
}

async function seedGroups() {
    for (const g of groupsData) {
        const group = await prisma.group.create({
            data: g,
        });
        console.log(`Created Group: ${group.name}`);
    }
}

async function main() {
    console.log(`Start seeding ...`);
    await seedUsers();
    await seedGroups();
    console.log(`Seeding finished!`);
}


main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })