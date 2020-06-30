const { Config } = require('@foal/core');

module.exports = {
  type: "mysql",

  host: Config.get2('database.host', 'string'),
  port: Config.get2('database.port', 'number'),
  username: Config.get2('database.username', 'string'),
  password: Config.get2('database.password', 'string'),
  database: Config.get2('database.database', 'string'),

  dropSchema: Config.get2('database.dropSchema', 'boolean', false),

  entities: ["build/app/**/*.entity.js"],
  migrations: ["build/migrations/*.js"],
  cli: {
    migrationsDir: "src/migrations"
  },
  synchronize: Config.get2('database.synchronize', 'boolean', false)
}
