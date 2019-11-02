const connection = require('./connection');
const commands = require('./commands');

function main() {
  const params = process.argv.slice(2);
  const unqfy = connection.getUNQfy('database');
  
  commands.execute(params, unqfy).then((data) => {
    connection.saveUNQfy(unqfy,'database');
  });
}

main();
