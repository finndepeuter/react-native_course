async function countries(parent, args, context, info) {
    const where = args.filter
    ? {
            OR: [
                { name: { contains: args.filter } },

            ]
    }
    : {};

    const list = await context.prisma.link.findMany({
        where,
        skip: args.skip,
        take: args.take,
        orderBy: args.orderBy
    });

    const count = await context.prisma.link.count({ where });

  return {
    id: 'countries',
    links,
    count
  };
}

module.exports = {
    countries
  };