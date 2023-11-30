import { t } from 'elysia'
import { TSchema } from '../../node_modules/elysia/node_modules/@sinclair/typebox'

export class Entity {
    static readonly schema: TSchema = t.Object({
        id: t.String(),
        createdAt: t.Date(),
        updatedAt: t.Date(),
    })
    constructor(
        readonly id: string,
        readonly createdAt: Date,
        readonly updatedAt: Date,
    ) {}
}

export type IEntity = InstanceType<typeof Entity>
