import { prisma } from '..';

export const getAllColors = () => {
  return prisma.color.findMany();
};

export const getColorById = async (id: number) => {
  try {
    const response = await prisma.color.findUnique({
      where: {
        id,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const createColor = async (body) => {
  const { name, primary, secondary, secondaryText, events } = body;
  try {
    const response = await prisma.color.create({
      data: {
        name,
        primary,
        secondary,
        secondaryText,
        events,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateColor = async (id, body) => {
  const { name, primary, secondary, secondaryText, events } = body;
  try {
    const response = await prisma.color.update({
      where: {
        id,
      },
      data: {
        name,
        primary,
        secondary,
        secondaryText,
        events,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteColor = async (id: number) => {
  try {
    const response = await prisma.color.delete({
      where: {
        id,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
