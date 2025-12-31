import pubsub from "../utils/pubsub.ts"

const users = [
  { id: "1", name: "D", lastname: "M" },
  { id: "2", name: "P", lastname: "R" },
  { id: "3", name: "E", lastname: "J" }
];

const resolvers = {
  Query: {
    user: (_: any, args: { id: string; }) => users.find((u) => u.id === args.id),
    users: () => users
  },

  Mutation: {
    createUser: (_: any, { input }: any) => {
      const newUser = input;
      users.push(newUser);
      pubsub.publish("USER_CREATED", { userCreated: newUser })

      return newUser;
    },
    updateUser: (_: any, { input }: any) => {
      const { id, name, lastname } = input;
      try {
        const userIndex = users.findIndex((u) => u.id === id);
        if (userIndex > 0) {
          users[userIndex] = {
            id,
            name,
            lastname
          };
        }
        return users[userIndex]
      } catch (e) {
        return null
      }
    },
    deleteUser: (_: any, { id }: { id: string;}) => {
      const index = users.findIndex((u) => u.id === id);
      if (index > 0) {
        users.splice(index, 1);
        return true;
      }
      throw new Error("Element not found");
    }
  },

  Subscription: {
    userCreated: {
      subscribe: () => pubsub.asyncIterableIterator("USER_CREATED")
    }
  }
}

export default resolvers;