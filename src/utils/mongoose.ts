import { IAggregateOption } from '$base/base.interface';
import { Aggregate, Schema, Types } from 'mongoose';

export const aggregatePaginatePLugin = function (schema: Schema) {
  schema.statics.aggregatePaginate = async function (
    query: Aggregate<Array<any>>,
    options: IAggregateOption,
  ) {
    const page = Number(options.page) || 1;
    const perPage = Number(options.perPage) || 20;
    const skip = (page - 1) * perPage;
    const allowDiskUse = options.allowDiskUse || false;

    const aggregate = this.aggregate(query.pipeline());

    if (allowDiskUse) {
      aggregate.allowDiskUse(true);
    }

    const [{ items, count }] = await aggregate.facet({
      items: [{ $skip: skip }, { $limit: perPage }],
      count: [{ $count: 'count' }],
    });

    const totalCount = count[0] ? count[0].count : 0;
    const pageCount = Math.ceil(totalCount / perPage) || 1;
    return {
      items,
      totalCount,
      pageCount,
    };
  };
};

export const ObjectId = (field: string) => {
  return new Types.ObjectId(field);
};
