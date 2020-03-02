
exports.up = function(knex) {
  return knex.schema
    .table("workers", tbl => {
        tbl.boolean("approved").defaultTo(false);
    })
    .table("user_airport_worker", tbl => {
        tbl.boolean("approved").defaultTo(false);
    })
};

exports.down = function(knex) {
    return (knex.schema
        .table("user_airport_worker", tbl => {
            tbl.dropColumn("approved");
        })
        .table("workers", tbl => {
            tbl.dropColumn("approved");
        })
    )};
