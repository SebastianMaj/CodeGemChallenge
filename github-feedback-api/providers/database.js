class DatabaseFactory {
    static getDatabaseProvider() {
        return new KnexProvider();
    }
}

class DatabaseProvider {
    single(table, id) {
        throw Error("Not implemented");
    }

    add(table, entity) {
        throw Error("Not implemented");
    }
}

class KnexProvider extends DatabaseProvider {
    constructor() {
        super();
        this.client = require("../connections/db_knex");
    }

    single(table, id) {
        throw Error("Not implemented");
    }

    all(table) {
        return this.client(table).select("*");
    }

    fetchFeedback() {
        return this.client.select("*").from("feedback").join("mood", "feedback.id", "mood.feedback_id").join("tag", "feedback.id", "tag.feedback_id");
    }

    add(table, entity) {
        return this.client(table).returning("id").insert(entity);
    }

    addMany(table, entities) {
        return this.client.insert(entities, ["id"]).into(table);
    }
}

module.exports = DatabaseFactory;