import { prisma } from '..';

export const getAllSections = () => {
  return prisma?.section.findMany();
};
export const getSectionById = async (id: number) => {
  try {
    const response = await prisma.section.findUnique({
      where: {
        id,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const createSection = async (body) => {
  const { name, order, events } = body;
  try {
    const response = await prisma.section.create({
      data: {
        name,
        order,
        events,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateSection = async (id, body) => {
  const { name, order, events } = body;
  try {
    const response = await prisma.section.update({
      where: {
        id,
      },
      data: {
        name,
        order,
        events,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteSection = async (id: number) => {
  try {
    const response = await prisma.section.delete({
      where: {
        id,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
