const prisma = require("../config/prisma");

const USER_MODELS = {
  getAllUser: async (where) => {
    const result = await prisma.users.findMany({
      // tanpa data password
      where,
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return result;
  },

  getDetailUser: async (id) => {
    const result = await prisma.users.findUnique({
      where: { id },
      include: {
        profile: {
          include: {
            address: true,
            job: true,
          },
        },
      },
    });
    return result;
  },

  createUser: async (data) => {
    const { name, email, password, identity_type, identity_number, street, city, state, postal_code, country, company_name, position } = data;

    const result = await prisma.users.create({
      data: {
        name,
        email,
        password,
        profile: {
          create: {
            identity_type,
            identity_number,
            address: {
              create: {
                street,
                city,
                state,
                postal_code,
                country,
              },
            },
            job: {
              create: {
                company_name,
                position,
              },
            },
          },
        },
      },
      include: {
        profile: {
          include: {
            address: true,
            job: true,
          },
        },
      },
    });
    return result;
  },

  updateUser: async (id, data) => {
    const { name, email, password, identity_type, identity_number, street, city, state, postal_code, country, company_name, position } = data;
    const result = await prisma.users.update({
      where: { id },
      data: {
        name,
        email,
        password,
        profile: {
          update: {
            identity_type,
            identity_number,
            address: {
              update: {
                street,
                city,
                state,
                postal_code,
                country,
              },
            },
            job: {
              update: {
                company_name,
                position,
              },
            },
          },
        },
      },
      include: {
        profile: {
          include: {
            address: true,
            job: true,
          },
        },
      },
    });
    return result;
  },

  deleteUser: async (id) => {
    const result = await prisma.users.delete({
      where: { id },
      include: {
        profile: {
          include: {
            address: true,
            job: true,
          },
        },
      },
    });
    return result;
  },
};

module.exports = USER_MODELS;
