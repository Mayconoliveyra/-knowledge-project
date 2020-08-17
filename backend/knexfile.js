const { postgresConect } = require("./.env")

module.exports = {
	client: 'postgresql',
	connection: postgresConect,
	pool: {
		min: 2,
		max: 10
	},
	migrations: {
		tableName: 'knex_migrations'
	}

};
