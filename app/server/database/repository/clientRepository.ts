import { prisma } from '..';

export const getAllClients = () => {
  return prisma.client.findMany();
};

export const getClientById = async (id: number) => {
  try {
    const response = await prisma.client.findUnique({
      where: {
        id,
      },
      include: { events: true },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const createClient = async (body) => {
  const { name, lastName, email, phone, notes, events } = body;
  try {
    const client = await prisma.client.create({
      data: {
        name,
        lastName,
        email,
        phone,
        notes,
        events,
      },
    });
    return client;
  } catch (error) {
    console.log(error);
  }
};

export const updateClient = async (id, body) => {
  const { name, lastName, email, phone, notes, events } = body;
  try {
    const client = await prisma.client.update({
      where: {
        id,
      },
      data: {
        name,
        lastName,
        email,
        phone,
        notes,
        events,
      },
    });
    return client;
  } catch (error) {
    console.log(error);
  }
};

export const deleteClient = async (id: number) => {
  try {
    const client = await prisma.client.delete({
      where: {
        id,
      },
    });
    return client;
  } catch (error) {
    console.log(error);
  }
};
