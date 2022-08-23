export const aggregatePaginatePLugin = function (schema: any) {
  schema.statics.aggregatePaginate = async function (query: any, options: any) {
    const page = options.page || 1;
    const limit = options.limit || 20;
    const skip = (page - 1) * limit;
    const sort = options.sort;
    const allowDiskUse = options.allowDiskUse || false;

    const q = this.aggregate(query._pipeline);
    const data = this.aggregate().skip(skip).limit(limit);

    if (sort) {
      q.sort(sort);
    }

    if (allowDiskUse) {
      q.allowDiskUse(true);
    }

    const [{ items, count }] = await q.facet({
      items: data._pipeline,
      count: [{ $count: 'count' }],
    });

    const totalCount = count[0] ? count[0].count : 0;
    const totalPages = Math.ceil(totalCount / limit) || 1;
    return {
      items,
      totalCount,
      totalPages,
    };
  };
};
