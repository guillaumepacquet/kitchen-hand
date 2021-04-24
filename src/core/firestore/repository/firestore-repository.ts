import { QueryBuilder } from '../query-builder';
import { FirestoreData } from '../type';

export default class FirestoreRepository<T> {
    private model: FirestoreData<T>;

    constructor(model: FirestoreData<T>) {
        this.model = model;
    }

    getQueryBuilder(): QueryBuilder<T> {
        return new QueryBuilder(this.model);
    }
}
