const { prisma } = require('../../db/prisma');
const { addTestUser } = require('../testData/testModel.data');

global.loadUser = async (user) => {
  await addTestUser(user, (err) => {
    if (err) throw err;
  });
};

global.removeUser = async (email) => {
  const user = await prisma.users.findFirst({
    where: {
      email,
    },
  });

  await prisma.users.delete({
    where: {
      id: user.id,
    },
  });

  // close connection to prisma
  await prisma.$disconnect();
};
