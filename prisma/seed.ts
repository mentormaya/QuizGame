import { PrismaClient } from "@prisma/client";
import type { Prisma } from "@prisma/client";

import questionsFile from "../private/questions.json";

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
                    isLeader: true,
                },
                {
                    full_name: "Ajay Singh",
                    isLeader: false,
                },
                {
                    full_name: "Prabin Kumar Mahato",
                    isLeader: false,
                },
            ],
        },
    },
    {
        name: "सगरमाथा",
        score: 0,
        turn: false,
        members: {
            create: [
                {
                    full_name: "Priyanka Thakur",
                    isLeader: true,
                },
                {
                    full_name: "Ajay Singh",
                    isLeader: false,
                },
                {
                    full_name: "Prabin Kumar Mahato",
                    isLeader: false,
                },
            ],
        },
    },
    {
        name: "धाैलागिरी",
        score: 0,
        turn: false,
        members: {
            create: [
                {
                    full_name: "Priyanka Thakur",
                    isLeader: true,
                },
                {
                    full_name: "Ajay Singh",
                    isLeader: false,
                },
                {
                    full_name: "Prabin Kumar Mahato",
                    isLeader: false,
                },
            ],
        },
    },
    {
        name: "अन्नपूर्ण",
        score: 0,
        turn: false,
        members: {
            create: [
                {
                    full_name: "Priyanka Thakur",
                    isLeader: true,
                },
                {
                    full_name: "Ajay Singh",
                    isLeader: false,
                },
                {
                    full_name: "Prabin Kumar Mahato",
                    isLeader: false,
                },
            ],
        },
    },
    {
        name: "गणेश",
        score: 0,
        turn: false,
        members: {
            create: [
                {
                    full_name: "Priyanka Thakur",
                    isLeader: true,
                },
                {
                    full_name: "Ajay Singh",
                    isLeader: false,
                },
                {
                    full_name: "Prabin Kumar Mahato",
                    isLeader: false,
                },
            ],
        },
    },
    {
        name: "कन्चनजङ्घा",
        score: 0,
        turn: false,
        members: {
            create: [
                {
                    full_name: "Priyanka Thakur",
                    isLeader: true,
                },
                {
                    full_name: "Ajay Singh",
                    isLeader: false,
                },
                {
                    full_name: "Prabin Kumar Mahato",
                    isLeader: false,
                },
            ],
        },
    },
    {
        name: "बरूण",
        score: 0,
        turn: false,
        members: {
            create: [
                {
                    full_name: "Priyanka Thakur",
                    isLeader: true,
                },
                {
                    full_name: "Ajay Singh",
                    isLeader: false,
                },
                {
                    full_name: "Prabin Kumar Mahato",
                    isLeader: false,
                },
            ],
        },
    },
    {
        name: "नीलगिरी",
        score: 0,
        turn: false,
        members: {
            create: [
                {
                    full_name: "Priyanka Thakur",
                    isLeader: true,
                },
                {
                    full_name: "Ajay Singh",
                    isLeader: false,
                },
                {
                    full_name: "Prabin Kumar Mahato",
                    isLeader: false,
                },
            ],
        },
    },
];

function makeQuestions() {
    const questionData = questionsFile.map((question) => {
        return {
            body: question.body,
            type: question.type,
            correct_option: question.correct_option,
            published: question.published,
            shifted: question.shifted,
            options: {
                create: {
                    a: question.options.a,
                    b: question.options.b,
                    c: question.options.c,
                    d: question.options.d,
                },
            },
            extra: {
                create: {
                    type: question.extra ? question.extra.type : "",
                    resource: question.extra ? question.extra.resource : "",
                },
            },
        };
    });
    return questionData;
}

const questionData: Prisma.QuestionCreateInput[] = makeQuestions()

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

async function seedQuestions() {
    for (const q of questionData) {
        const question = await prisma.question.create({
            data: q,
        });
        console.log(`Created Question: ${question.id}`);
    }
}

async function main() {
    console.log(`Start seeding ...`);
    await seedUsers();
    await seedGroups();
    await seedQuestions();
    console.log(`Seeding finished!`);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
