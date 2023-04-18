import { PrismaClient } from "@prisma/client";
import type { Prisma } from "@prisma/client";

import settingsFile from "../private/settings.json";
import questionsFile from "../private/questions.json";
import usersFile from "../private/users.json";
import groupsFile from "../private/groups.json";

const prisma = new PrismaClient();

function makeUsers() {
    return usersFile.map((user) => {
        return {
            username: user.username,
            password: user.secret,
            full_name: user.full_name,
        };
    });
}

const userData: Prisma.UserCreateInput[] = makeUsers()

function makeGroups() {
    return groupsFile.map((group) => {
        const members = group.members.map(member => {
            return {
                full_name: member.full_name,
                isLeader: member.isLeader
            }
        })
        return {
            name: group.group_name,
            score: group.score,
            turn: group.turn,
            members: {
                create: members,
            },
        };
    });
}

const groupsData: Prisma.GroupCreateInput[] = makeGroups()

function makeQuestions() {
    return questionsFile.map((question) => {
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
}

const questionData: Prisma.QuestionCreateInput[] = makeQuestions();


function makeSettings() {
    let settings = Object.keys(settingsFile).map(setting => {
        return {
            key: setting,
            value: settingsFile[setting as keyof typeof settingsFile]
        }
    })
    return settings
}

const settingsData: Prisma.SettingCreateInput[] = makeSettings();

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

async function seedSettings(){
    for (const s of settingsData) {
        const setting = await prisma.setting.create({
            data: s,
        });
        console.log(`Created Question: ${setting.key}`);
    }
}

async function main() {
    console.log(`Start seeding ...`);
    await seedSettings();
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
