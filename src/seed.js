import 'dotenv/config';
import mongoose from 'mongoose';
import faker from 'faker';
import User from './models/user.js';
import Thought from './models/thought.js';
import db from './config/connections.js';

const NUM_USERS = 10;
const NUM_THOUGHTS = 20;
const NUM_REACTIONS = 50;

const seedDatabase = async () => {
  await db();

  // Clear existing data
  await User.deleteMany({});
  await Thought.deleteMany({});

  // Create users
  const users = [];
  for (let i = 0; i < NUM_USERS; i++) {
    const user = new User({
      name: faker.name.findName(),
      email: faker.internet.email(),
    });
    users.push(user);
  }
  await User.insertMany(users);

  // Create thoughts
  const thoughts = [];
  for (let i = 0; i < NUM_THOUGHTS; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const thought = new Thought({
      thoughtText: faker.lorem.sentence(),
      username: randomUser.name,
    });
    thoughts.push(thought);
    randomUser.thoughts.push(thought._id);
  }
  await Thought.insertMany(thoughts);

  // Update users with thoughts
  for (const user of users) {
    await user.save();
  }

  // Create reactions
  for (let i = 0; i < NUM_REACTIONS; i++) {
    const randomThought = thoughts[Math.floor(Math.random() * thoughts.length)];
    const reaction = {
      reactionBody: faker.lorem.sentence(),
      username: faker.name.findName(),
    };
    randomThought.reactions.push(reaction);
    await randomThought.save();
  }

  // Create friends
  for (const user of users) {
    const numFriends = Math.floor(Math.random() * NUM_USERS);
    for (let i = 0; i < numFriends; i++) {
      const randomFriend = users[Math.floor(Math.random() * users.length)];
      if (!user.friends.includes(randomFriend._id) && user._id !== randomFriend._id) {
        user.friends.push(randomFriend._id);
      }
    }
    await user.save();
  }

  console.log('Database seeded!');
  mongoose.connection.close();
};

seedDatabase().catch((error) => {
  console.error('Error seeding database:', error);
  mongoose.connection.close();
});