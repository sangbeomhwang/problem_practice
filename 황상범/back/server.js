// app.js를 require해 옴!
const app = require("./app");
const { sequelize } = require("./models");
const config = require("./config");
const PORT = config.port;

// 여기에 app.listen을 구현함!
app.listen(PORT, async () => {
  await sequelize.sync({ force: false });
  console.log(`Database Connected...`);
  console.log(`Running on http://localhost:${PORT}`);
});
