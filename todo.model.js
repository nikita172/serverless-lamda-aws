const mongoose = require("mongoose");

const todoItemschema = new mongoose.Schema({
    title: {
        type: mongoose.Schema.Types.String
    },
    description: {
        type: mongoose.Schema.Types.String
    }
}, {
    collection: "TodoItem"
})
    ;

const TodoItem = mongoose.model("TodoItem", todoItemschema);
module.exports = TodoItem;