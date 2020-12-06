/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins: [
    {
      // The name of the plugin
      resolve: 'gatsby-source-mongodb',
      options: {
          // Name of the database and collection where are books reside
          dbName: 'gatsby',
          collection: 'books',
          server: {
              address: 'main-shard-00-01-zxsxp.mongodb.net',
              port: 27017
          },
          auth: {
              user: 'user',
              password: 'hinevas2'
          },
          extraParams: {
              replicaSet: 'Main-shard-0',
              ssl: true,
              authSource: 'admin',
              retryWrites: true
          }
      }
  },
  ],
}
