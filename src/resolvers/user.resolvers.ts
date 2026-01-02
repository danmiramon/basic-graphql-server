import pubsub from "../utils/pubsub.ts";
import prisma from "../utils/prisma.ts";

const resolvers = {
  Query: {
    user: (_: any, args: { id: string; }) => prisma.user.findUnique({
      where: {
        id: args.id
      }
    }),
    users: () => {
      // Just an example to check if caching is working
      console.log(`Fetched at ${new Date().toISOString()}`);
      return prisma.user.findMany();
    }
  },

  Mutation: {
    createUser: async (_: any, { input }: any) => {
      const newUser = await prisma.user.create({
        data: input
      });
      pubsub.publish("USER_CREATED", { userCreated: newUser })

      return newUser;
    },
    updateUser: async (_: any, { input }: any) => {
      const { id, name, lastname } = input;
      try {
        const updatedUser = await prisma.user.update({
          where: {
            id: id
          },
          data: {
            name,
            lastname
          }
        });
        
        return updatedUser;
      } catch (e) {
        return null
      }
    },
    deleteUser: async (_: any, { id }: { id: string;}) => {
      try {
        const deletedUser = await prisma.user.delete({
          where: {
            id: id
          }
        });
        return !!deletedUser;
      } catch (e) {
        throw new Error("Element not found");
      }
    }
  },

  Subscription: {
    userCreated: {
      subscribe: () => pubsub.asyncIterableIterator("USER_CREATED")
    }
  }
}

export default resolvers;