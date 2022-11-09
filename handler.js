require("dotenv").config({ path: './variables.env' });
const connectToDatabase = require("./db");
const TodoItem = require("./todo.model.js");

module.exports.create = (event, context, callback) => {
  connectToDatabase();
  console.log("create function is called");
  console.log(event.body);
  const data = JSON.parse(event.body)
  let user = new TodoItem({
    title: data.title,
    description: data.description
  });
  console.log(user);
  user.save()
    .then((res) => {
      console.log("todo saved");
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          message: "sent successfully",
          data: res,
        }),
      });
    })
    .catch((err) => {
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          message: "error occured",
        }),
      });
    });
};

module.exports.getOne = async (event, context, callback) => {
  console.log(event);
  connectToDatabase();
  const item = await TodoItem.findOne({ _id: event.pathParameters.id });
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      message: "get data successfully",
      data: item

    }),
  })
}

module.exports.getAll = (event, context, callback) => {
  connectToDatabase();
  TodoItem.find()
    .then(todoItem =>
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(todoItem)
      }))
    .catch(err => {
      callback(null, {
        statusCode: 500,
        body: "could not find the todo item"
      });
    });

};

module.exports.update = (event, context, callback) => {

  connectToDatabase()
  TodoItem.findByIdAndUpdate(event.pathParameters.id, JSON.parse(event.body), { new: true })
    .then(todoItem =>
      callback(null, {
        statusCode: 200,
        message: "updated successfully",
        body: JSON.stringify(todoItem)
      }))
    .catch(err => {
      callback(null, {
        statusCode: 500,
        body: "could not update the item"
      });
    });
};

module.exports.delete = (event, context, callback) => {
  connectToDatabase()
  TodoItem.findByIdAndRemove(event.pathParameters.id)
    .then(todoItem =>
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(todoItem)
      }))
    .catch(err => {
      callback(null, {
        statusCode: 500,
        body: "could not delete the item"
      });
    });

};