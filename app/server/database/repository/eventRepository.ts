import { prisma } from '..';

export const getAllEvents = async () => {
  const events = await prisma.event.findMany({
    include: { color: true, section: true },
  });
  return events;
};

export const getEventById = async (id: number) => {
  try {
    const response = await prisma.event.findUnique({
      where: {
        id,
      },

      include: { color: true, section: true, client: true },
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const createEvent = async (body) => {
  const {
    title,
    start,
    end,
    colorId,
    sectionId,
    clientId,
    notes,
    draggable,
    beforeStart,
    afterEnd,
  } = body;
  try {
    const response = await prisma.event.create({
      data: {
        title,
        start,
        end,
        color: { connect: { id: colorId } },
        section: { connect: { id: sectionId } },
        client: { connect: { id: clientId } },
        notes,
        draggable,
        beforeStart,
        afterEnd,
      },
      include: { color: true, section: true },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateEvent = async (id, body) => {
  const {
    title,
    start,
    end,
    colorId,
    sectionId,
    clientId,
    notes,
    draggable,
    beforeStart,
    afterEnd,
    started,
  } = body;
  try {
    const response = await prisma.event.update({
      where: {
        id,
      },
      data: {
        title,
        start,
        end,
        color: { connect: { id: colorId } },
        section: { connect: { id: sectionId } },
        client: { connect: { id: clientId } },
        notes,
        draggable,
        beforeStart,
        afterEnd,
        started,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteEvent = async (id: number) => {
  try {
    const response = await prisma.event.delete({
      where: {
        id,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
